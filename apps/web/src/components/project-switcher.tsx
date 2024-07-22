'use client'

import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { use } from 'react'

import { getProjects } from '@/http/get-projects'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

function ProjectSwitcher() {
  const { slug: organizationSlug } = useParams<{ slug: string }>()
  const projects = use(getProjects(organizationSlug))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[10.5rem] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {/* {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>

            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : ( */}
        <span className="text-muted-foreground">Select project</span>
        {/* )} */}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[12.5rem]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={'/org/'}>
              <Avatar className="mr-2 size-4">
                {/* {organization.avatarUrl && (
                  <AvatarImage src={organization.avatarUrl} />
                )} */}
                <AvatarFallback />
              </Avatar>

              <span className="line-clamp-1">project name</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={''}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProjectSwitcher
