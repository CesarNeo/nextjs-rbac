'use client'

import OrganizationForm from '@/app/(app)/create-organization/organization-form'
import Sheet from '@/components/ui/sheet'
import useSheetCloseParallelRoute from '@/hooks/use-sheet-close-parallel-route'

function CreateOrganizationSheetContent() {
  const { onClosing } = useSheetCloseParallelRoute()

  return (
    <Sheet.Content
      onEscapeKeyDown={onClosing}
      onPointerDownOutside={onClosing}
      onClose={onClosing}
    >
      <Sheet.Header>
        <Sheet.Title>Create organization</Sheet.Title>
      </Sheet.Header>

      <div className="py-4">
        <OrganizationForm />
      </div>
    </Sheet.Content>
  )
}

export default CreateOrganizationSheetContent
