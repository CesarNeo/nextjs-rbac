import DropdownMenu from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

function ProjectSkeleton() {
  return (
    <DropdownMenu.Item>
      <Skeleton className="mr-2 size-4 shrink-0 rounded-full" />
      <Skeleton className="h-4 w-full rounded-md" />
    </DropdownMenu.Item>
  )
}

export default ProjectSkeleton
