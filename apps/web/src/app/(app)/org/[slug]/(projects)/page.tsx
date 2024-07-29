import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ability, getCurrentOrganizationSlug } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { RoutesPath } from '@/enums/routes-path'

import ProjectList from './project-list'

async function OrganizationPage() {
  const orgSlug = getCurrentOrganizationSlug()
  const permissions = await ability()

  const canCreateProject = permissions?.can('create', 'Project')
  const canListProjects = permissions?.can('get', 'Project')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {canCreateProject && (
          <Button size="sm" asChild>
            <Link href={`/org/${orgSlug}/${RoutesPath.CREATE_PROJECT}`}>
              <Plus className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      {canListProjects ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          You don't have permission to view projects
        </p>
      )}
    </div>
  )
}

export default OrganizationPage
