import { Skeleton } from '@/components/ui/skeleton'

function InvitesSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />

      <div className="flex gap-1">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}

export default InvitesSkeleton
