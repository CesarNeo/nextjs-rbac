'use client'

import ProjectForm from '@/app/(app)/org/[slug]/create-project/project-form'
import Sheet from '@/components/ui/sheet'
import useSheetCloseParallelRoute from '@/hooks/use-sheet-close-parallel-route'

function CreateProjectSheetContent() {
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
        <ProjectForm />
      </div>
    </Sheet.Content>
  )
}

export default CreateProjectSheetContent
