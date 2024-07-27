import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'
import { RoutesPath } from '@/enums/routes-path'

import ProjectForm from './project-form'

async function CreateProjectPage() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    return redirect(RoutesPath.HOME)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create project</h1>

      <ProjectForm />
    </div>
  )
}

export default CreateProjectPage
