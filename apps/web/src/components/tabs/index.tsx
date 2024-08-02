import { ability, getCurrentOrganizationSlug } from '@/auth/auth'

import ButtonTab from './components/button-tab'

async function Tabs() {
  const orgSlug = getCurrentOrganizationSlug()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canGetMembers = permissions?.can('get', 'User')
  const canGetProjects = permissions?.can('get', 'Project')
  const canUpdateOrganizationOrGetBilling =
    canUpdateOrganization || canGetBilling

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[75rem] items-center gap-2">
        {canGetProjects && (
          <ButtonTab href={`/org/${orgSlug}`}>Projects</ButtonTab>
        )}
        {canGetMembers && (
          <ButtonTab href={`/org/${orgSlug}/members`}>Members</ButtonTab>
        )}
        {canUpdateOrganizationOrGetBilling && (
          <ButtonTab href={`/org/${orgSlug}/settings`}>
            Settings & Billing
          </ButtonTab>
        )}
      </nav>
    </div>
  )
}

export default Tabs
