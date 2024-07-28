import { organizationSchema } from '@neo-saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'

import { ability, getCurrentOrganizationSlug } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'

async function MemberList() {
  const orgSlug = getCurrentOrganizationSlug()

  const [{ membership }, { members }, { organization }, permissions] =
    await Promise.all([
      getMembership(orgSlug!),
      getMembers(orgSlug!),
      getOrganization(orgSlug!),
      ability(),
    ])
  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="py-2.5" style={{ width: 48 }}>
                  <Avatar className="size-8">
                    {member.avatarUrl && (
                      <AvatarImage
                        src={member.avatarUrl}
                        className="aspect-square size-full"
                      />
                    )}
                    <AvatarFallback />
                  </Avatar>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {member.name}
                      {member.userId === membership?.userId && ' (Me)'}
                      {organization.ownerId === member.userId && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Crown className="size-3" />
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can(
                      'transfer_ownership',
                      authOrganization,
                    ) && (
                      <Button size="sm" variant="secondary">
                        <ArrowLeftRight className="mr-2 size-4" />
                        Transfer Ownership
                      </Button>
                    )}
                    {permissions?.can('delete', 'User') && (
                      <form action={removeMemberAction.bind(null, member.id)}>
                        <Button
                          type="submit"
                          size="sm"
                          variant="destructive"
                          disabled={
                            member.userId === membership.userId ||
                            member.userId === organization.ownerId
                          }
                        >
                          <UserMinus className="mr-2 size-4" />
                          Remove
                        </Button>
                      </form>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MemberList
