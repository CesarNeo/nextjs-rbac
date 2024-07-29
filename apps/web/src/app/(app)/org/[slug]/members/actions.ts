'use server'

import { type Role, roleSchema } from '@neo-saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganizationSlug } from '@/auth/auth'
import { NextTags } from '@/enums/next-tags'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const orgSlug = getCurrentOrganizationSlug()

  await removeMember({
    organizationSlug: orgSlug!,
    memberId,
  })

  revalidateTag(`${orgSlug}/${NextTags.MEMBERS}`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const orgSlug = getCurrentOrganizationSlug()

  await updateMember({
    organizationSlug: orgSlug!,
    memberId,
    role,
  })

  revalidateTag(`${orgSlug}/${NextTags.MEMBERS}`)
}

export async function revokeInviteAction(inviteId: string) {
  const orgSlug = getCurrentOrganizationSlug()

  await revokeInvite({
    organizationSlug: orgSlug!,
    inviteId,
  })

  revalidateTag(`${orgSlug}/${NextTags.INVITES}`)
}

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  role: roleSchema,
})

export async function createInviteAction(data: FormData) {
  const schemaValidate = inviteSchema.safeParse(Object.fromEntries(data))

  if (!schemaValidate.success) {
    const errors = schemaValidate.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = schemaValidate.data

  try {
    const organizationSlug = getCurrentOrganizationSlug() ?? ''
    await createInvite({ organizationSlug, email, role })

    revalidateTag(`${organizationSlug}/${NextTags.INVITES}`)
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
