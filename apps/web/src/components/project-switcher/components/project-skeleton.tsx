import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

function ProjectSkeleton() {
  return (
    <DropdownMenuItem>
      <Skeleton className="mr-2 size-4 shrink-0 rounded-full" />
      <Skeleton className="h-4 w-full rounded-md" />
    </DropdownMenuItem>
  )
}

export default ProjectSkeleton
