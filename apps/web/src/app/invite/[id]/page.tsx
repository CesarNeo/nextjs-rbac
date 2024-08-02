import dayjs from 'dayjs'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RoutesPath } from '@/enums/routes-path'
import { acceptInvite } from '@/http/accept-invite'
import { getInvite } from '@/http/get-invite'

interface IInvitePageProps {
  params: {
    id: string
  }
}

async function InvitePage({ params: { id } }: IInvitePageProps) {
  const { invite } = await getInvite(id)

  const inviteDate = dayjs(invite.createdAt).fromNow()
  const isUserAuthenticated = isAuthenticated()
  let currentUserEmail = null

  if (isUserAuthenticated) {
    const { user } = await auth()

    currentUserEmail = user.email
  }

  const userIsAuthenticatedWithSameEmailFromInvite =
    currentUserEmail === invite.email

  async function handleSignInFromInvite() {
    'use server'

    cookies().set('inviteId', id)
    redirect(RoutesPath.SIGN_IN.concat(`?email=${invite.email}`))
  }

  async function handleAcceptInvite() {
    'use server'

    await acceptInvite(id)
    redirect(RoutesPath.HOME)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 antialiased">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>

          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>{' '}
            {inviteDate}
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={handleSignInFromInvite}>
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 size-4" />
              Sign in to accept the invitation
            </Button>
          </form>
        )}

        {userIsAuthenticatedWithSameEmailFromInvite && (
          <form action={handleAcceptInvite}>
            <Button type="submit" className="w-full">
              <CheckCircle className="mr-2 size-4" />
              Accept the invitation
            </Button>
          </form>
        )}

        {isUserAuthenticated && !userIsAuthenticatedWithSameEmailFromInvite && (
          <div className="space-y-4">
            <p className="text-balance text-center leading-relaxed text-muted-foreground">
              This invite was sent to{' '}
              <span className="font-medium text-foreground">
                {invite.email}
              </span>{' '}
              but you are signed in as{' '}
              <span className="font-medium text-foreground">
                {currentUserEmail}
              </span>
              .
            </p>

            <div className="space-y-2">
              <Button className="w-full" asChild>
                <a href={RoutesPath.API_SIGN_OUT}>
                  <LogOut className="mr-2 size-4" />
                  Sign out from {currentUserEmail}
                </a>
              </Button>

              <Button className="w-full" asChild variant="secondary">
                <Link href={RoutesPath.HOME}>Back to dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvitePage
