import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { getCurrentOrganizationSlugCookies } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getOrganizations } from '@/http/get-organizations'

const OrganizationSwitcher = async () => {
  const { organizations } = await getOrganizations()

  const currentOrganizationSlug = getCurrentOrganizationSlugCookies()
  const currentOrganization = organizations.find(
    (organization) => organization.slug === currentOrganizationSlug,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[10.5rem] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatarUrl ? (
                <AvatarImage src={currentOrganization.avatarUrl} />
              ) : null}
              <AvatarFallback />
            </Avatar>

            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[12.5rem]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>

          {organizations.map((organization) => (
            <DropdownMenuItem key={organization.id} asChild>
              <Link href={'/org/'.concat(organization.slug)}>
                <Avatar className="mr-2 size-4">
                  {organization.avatarUrl ? (
                    <AvatarImage src={organization.avatarUrl} />
                  ) : null}
                  <AvatarFallback />
                </Avatar>

                <span className="line-clamp-1">{organization.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a href="/create-organization">
            <PlusCircle className="mr-2 size-4" />
            Create organization
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrganizationSwitcher
