import { roleSchema } from '@neo-saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['Invite'],
          summary: 'Create a new invite',
          security: [{ bearerAuth: [] }],
          body: z.object({ email: z.string().email(), role: roleSchema }),
          params: z.object({ slug: z.string() }),
          response: { 201: z.object({ inviteId: z.string().uuid() }) },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Invite')) {
          throw new UnauthorizedError('You are not allowed to create invites.')
        }

        const { email, role } = request.body

        const [, domain] = email.split('@')

        if (
          organization.shouldAttachUsersByDomain &&
          organization.domain === domain
        ) {
          throw new BadRequestError(
            `Users with ${domain} domain will join your organization automatically on login.`,
          )
        }

        const inviteWithSameEmail = await prisma.invite.findUnique({
          where: {
            email_organizationId: { email, organizationId: organization.id },
          },
        })

        if (inviteWithSameEmail) {
          throw new BadRequestError(
            'Another invite with the same email already exists.',
          )
        }

        const memberWithSameEmail = await prisma.member.findFirst({
          where: { user: { email }, organizationId: organization.id },
        })

        if (memberWithSameEmail) {
          throw new BadRequestError(
            'A member with this email already belongs to the organization.',
          )
        }

        const invite = await prisma.invite.create({
          data: {
            email,
            role,
            organizationId: organization.id,
            authorId: userId,
          },
        })

        return reply.status(201).send({ inviteId: invite.id })
      },
    )
}
