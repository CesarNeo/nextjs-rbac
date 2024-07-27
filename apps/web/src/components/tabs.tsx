import { getCurrentOrganizationSlug } from '@/auth/auth'

import NavLink from './nav-link'
import { Button } from './ui/button'

async function Tabs() {
  const currentOrganizationSlug = getCurrentOrganizationSlug()

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[75rem] items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[active=true]:border-border data-[active=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrganizationSlug}`}>Projects</NavLink>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[active=true]:border-border data-[active=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrganizationSlug}/members`}>
            Members
          </NavLink>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[active=true]:border-border data-[active=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrganizationSlug}/settings`}>
            Settings & Billing
          </NavLink>
        </Button>
      </nav>
    </div>
  )
}

export default Tabs
