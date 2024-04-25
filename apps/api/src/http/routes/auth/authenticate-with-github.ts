import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with GitHub',
        body: z.object({ code: z.string() }),
        response: { 201: z.object({ token: z.string() }) },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )

      githubOAuthURL.searchParams.set('client_id', '1754f5db2e0d1813cfb7')
      githubOAuthURL.searchParams.set(
        'client_secret',
        'd8b5e15d7a52b389fd1407b17e8547d0d0643043',
      )
      githubOAuthURL.searchParams.set(
        'redirect_uri',
        'http://localhost:3000/api/auth/callback',
      )
      githubOAuthURL.searchParams.set('code', code)

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
      })
      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${githubAccessToken}` },
      })
      const githubUserData = await githubUserResponse.json()

      const {
        id: githubUserId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.string().url(),
          name: z.string().nullable(),
          email: z.string().email().nullable(),
        })
        .parse(githubUserData)

      if (email === null) {
        throw new BadRequestError('E-mail not provided by GitHub')
      }

      let user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        user = await prisma.user.create({ data: { name, email, avatarUrl } })
      }

      let account = await prisma.account.findUnique({
        where: { provider_userId: { userId: user.id, provider: 'GITHUB' } },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubUserId,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        { sub: user.id },
        { sign: { expiresIn: '7d' } },
      )

      return reply.status(201).send({ token })
    },
  )
}
