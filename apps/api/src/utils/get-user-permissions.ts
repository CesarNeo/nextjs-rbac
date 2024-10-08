import { defineAbilityFor, type Role, userSchema } from '@neo-saas/auth'

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({ id: userId, role })

  return defineAbilityFor(authUser)
}
