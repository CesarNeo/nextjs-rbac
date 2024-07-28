'use client'

import type { Role } from '@neo-saas/auth'
import type { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { updateMemberAction } from './actions'

interface IUpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

function UpdateMemberRoleSelect({
  memberId,
  ...props
}: IUpdateMemberRoleSelectProps) {
  async function handleUpdateMemberRole(role: Role) {
    await updateMemberAction(memberId, role)
  }

  return (
    <Select {...props} onValueChange={handleUpdateMemberRole}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
        <SelectItem value="BILLING">Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default UpdateMemberRoleSelect
