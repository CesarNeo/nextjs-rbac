import Sheet from '@/components/ui/sheet'

import CreateOrganizationSheetContent from './components/create-organization-sheet-content'

function CreateOrganizationParallelPage() {
  return (
    <Sheet.Root defaultOpen>
      <CreateOrganizationSheetContent />
    </Sheet.Root>
  )
}

export default CreateOrganizationParallelPage
