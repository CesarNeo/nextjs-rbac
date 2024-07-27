'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganizationSlug } from '@/auth/auth'
import { NextTags } from '@/enums/next-tags'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

const organizationSchema = z
  .object({
    name: z.string().min(4, { message: 'Organization name is too short' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
            return domainRegex.test(value)
          }

          return true
        },
        {
          message:
            'Invalid domain. Please enter a valid domain name, e.g. "example.com"',
        },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    ({ shouldAttachUsersByDomain, domain }) => {
      if (shouldAttachUsersByDomain === true && !domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

export type OrganizationSchemaType = z.infer<typeof organizationSchema>

export async function createOrganizationAction(data: FormData) {
  const schemaValidate = organizationSchema.safeParse(Object.fromEntries(data))

  if (!schemaValidate.success) {
    const errors = schemaValidate.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = schemaValidate.data

  try {
    await createOrganization({ name, domain, shouldAttachUsersByDomain })

    revalidateTag(NextTags.ORGANIZATIONS)
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

export async function updateOrganizationAction(data: FormData) {
  const currentOrganizationSlug = getCurrentOrganizationSlug()
  const schemaValidate = organizationSchema.safeParse(Object.fromEntries(data))

  if (!schemaValidate.success) {
    const errors = schemaValidate.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = schemaValidate.data

  try {
    await updateOrganization({
      slug: currentOrganizationSlug!,
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag(NextTags.ORGANIZATIONS)
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
