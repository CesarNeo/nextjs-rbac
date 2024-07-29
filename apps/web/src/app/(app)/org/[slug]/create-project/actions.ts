'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrganizationSlug } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const projectSchema = z.object({
  name: z.string().min(4, { message: 'Project name is too short' }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const schemaValidate = projectSchema.safeParse(Object.fromEntries(data))

  if (!schemaValidate.success) {
    const errors = schemaValidate.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = schemaValidate.data

  try {
    const organizationSlug = getCurrentOrganizationSlug() ?? ''
    await createProject({ name, description, organizationSlug })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)

    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
