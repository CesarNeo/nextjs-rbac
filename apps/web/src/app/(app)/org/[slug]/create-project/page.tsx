import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'
import Header from '@/components/header'
import { RoutesPath } from '@/enums/routes-path'

import ProjectForm from './project-form'

async function CreateProjectPage() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    return redirect(RoutesPath.HOME)
  }

  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[75rem] space-y-4">
        <h1 className="text-2xl font-bold">Create project</h1>

        <ProjectForm />
      </main>
    </div>
  )
}

export default CreateProjectPage
