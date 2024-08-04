import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { getCurrentOrganizationSlug } from '@/auth/auth'
import { RoutesPath } from '@/enums/routes-path'
import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import DropdownMenu from './ui/dropdown-menu'

async function OrganizationSwitcher() {
  const { organizations } = await getOrganizations()

  const currentOrganizationSlug = getCurrentOrganizationSlug()
  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrganizationSlug,
  )

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex w-[10.5rem] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
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
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="end"
        alignOffset={-16}
        className="w-[12.5rem]"
      >
        <DropdownMenu.Group>
          <DropdownMenu.Label>Organizations</DropdownMenu.Label>
          {organizations.map((organization) => (
            <DropdownMenu.Item key={organization.id} asChild>
              <Link href={'/org/'.concat(organization.slug)}>
                <Avatar className="mr-2 size-4">
                  {organization.avatarUrl && (
                    <AvatarImage src={organization.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>

                <span className="line-clamp-1">{organization.name}</span>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>

        <DropdownMenu.Separator />

        <DropdownMenu.Item asChild>
          <Link href={RoutesPath.CREATE_ORGANIZATION}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default OrganizationSwitcher
