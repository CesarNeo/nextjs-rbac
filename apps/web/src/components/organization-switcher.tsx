import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { RoutesPath } from '@/enums/routes-path'

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

function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[10.5rem] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="text-muted-foreground">Select organization</span>
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[12.5rem]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuItem>
            <Avatar className="mr-2 size-4">
              <AvatarImage src="https://avatars.dicebear.com/api/avataaars/1.svg" />
              <AvatarFallback />
            </Avatar>

            <span className="line-clamp-1">Acme Corp</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={RoutesPath.CREATE_ORGANIZATION}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrganizationSwitcher
