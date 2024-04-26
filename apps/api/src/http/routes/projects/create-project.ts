import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['Project'],
          summary: 'Create a new project',
          security: [{ bearerAuth: [] }],
          params: z.object({ slug: z.string() }),
          body: z.object({ name: z.string(), description: z.string() }),
          response: { 201: z.object({ projectId: z.string().uuid() }) },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { name, description } = request.body

        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(
            'You are not allowed to create a project.',
          )
        }

        const project = await prisma.project.create({
          data: {
            slug: createSlug(name),
            name,
            description,
            organizationId: organization.id,
            ownerId: userId,
          },
        })

        return reply.status(201).send({ projectId: project.id })
      },
    )
}
