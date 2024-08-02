'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'

import { getPendingInvites } from '@/http/get-pending-invites'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Skeleton } from '../ui/skeleton'
import { acceptInviteAction, rejectInviteAction } from './actions'

dayjs.extend(relativeTime)

function PendingInvites() {
  const [isOpenState, setIsOpenState] = useState(false)

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpenState,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpenState} onOpenChange={setIsOpenState}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({data?.invites.length ?? 0})
        </span>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />

            <div className="flex gap-1">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
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
                    onClick={() => handleAcceptInvite(invite.id)}
                  >
                    <Check className="mr-1.5 size-3" />
                    Accept
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() => handleRejectInvite(invite.id)}
                  >
                    <X className="mr-1.5 size-3" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default PendingInvites
