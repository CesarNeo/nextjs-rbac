'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState } from 'react'

import { QueryKeysEnum } from '@/enums/query-keys'
import { getPendingInvites } from '@/http/get-pending-invites'

import Icon from '../icon'
import { Button } from '../ui/button'
import Popover from '../ui/popover'
import { acceptInviteOrRejectAction } from './actions'
import InvitesSkeleton from './components/invites-skeleton'
import { type IAcceptOrRejectInviteProps, InviteStatusEnum } from './types'

dayjs.extend(relativeTime)

function PendingInvites() {
  const [isOpenState, setIsOpenState] = useState(false)

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeysEnum.PENDING_INVITES],
    queryFn: getPendingInvites,
    enabled: isOpenState,
  })

  const totalPendingInvites = data?.invites.length ?? 0

  async function handleAcceptOrRejectInvite({
    inviteId,
    type,
  }: IAcceptOrRejectInviteProps) {
    await acceptInviteOrRejectAction({ inviteId, type })

    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.PENDING_INVITES] })
  }

  return (
    <Popover.Root open={isOpenState} onOpenChange={setIsOpenState}>
      <Popover.Trigger asChild>
        <Button size="icon" variant="ghost">
          <Icon name="user-plus" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </Popover.Trigger>

      <Popover.Content className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({totalPendingInvites})
        </span>

        {isLoading ? (
          <InvitesSkeleton />
        ) : (
          <>
            {data?.invites.map((invite) => (
              <div className="space-y-2" key={invite.id}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {invite.author?.name ?? 'Someone'}
                  </span>{' '}
                  invited you to join{' '}
                  <span className="font-medium text-foreground">
                    {invite.organization.name}
                  </span>{' '}
                  {dayjs(invite.createdAt).fromNow()}
                </p>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleAcceptOrRejectInvite({
                        inviteId: invite.id,
                        type: InviteStatusEnum.ACCEPT,
                      })
                    }
                  >
                    <Icon name="check" className="mr-1.5 size-3" />
                    Accept
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() =>
                      handleAcceptOrRejectInvite({
                        inviteId: invite.id,
                        type: InviteStatusEnum.REJECT,
                      })
                    }
                  >
                    <Icon name="x" className="mr-1.5 size-3" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </Popover.Content>
    </Popover.Root>
  )
}

export default PendingInvites
