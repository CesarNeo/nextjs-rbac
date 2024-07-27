import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrganizationSlug } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { RoutesPath } from '@/enums/routes-path'
import { shutdownOrganization } from '@/http/shutdown-organization'

function ShutdownOrganizationButton() {
  async function handleShutdownOrganization() {
    'use server'

    const currentOrganizationSlug = getCurrentOrganizationSlug()

    if (!currentOrganizationSlug) return

    await shutdownOrganization({ organizationSlug: currentOrganizationSlug })
    redirect(RoutesPath.HOME)
  }

  return (
    <form action={handleShutdownOrganization}>
      <Button variant="destructive" className="w-56" type="submit">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}

export default ShutdownOrganizationButton
