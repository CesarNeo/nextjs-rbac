import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@neo-saas/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import {
  authenticateWithGithub,
  authenticateWithPassword,
  createAccount,
  getProfile,
  requestPasswordRecover,
  resetPassword,
} from './routes/auth'
import { createInvite, getInvite } from './routes/invites'
import { getMembers, removeMember, updateMember } from './routes/members'
import {
  createOrganization,
  getMembership,
  getOrganization,
  getOrganizations,
  shutdownOrganization,
  transferOrganization,
  updateOrganization,
} from './routes/orgs'
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from './routes/projects'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS RBAC',
      description: 'Full-stack SaaS app with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})
app.register(fastifyJwt, { secret: env.JWT_SECRET })
app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.register(getProject)
app.register(getProjects)
app.register(createProject)
app.register(updateProject)
app.register(deleteProject)

app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

app.register(getInvite)
app.register(createInvite)

app
  .listen({ port: env.SERVER_PORT })
  .then(() => console.log('HTTP server running!!'))
