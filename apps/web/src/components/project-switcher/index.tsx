'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { QueryKeysEnum } from '@/enums/query-keys'
import { RoutesPath } from '@/enums/routes-path'
import { getProjects } from '@/http/get-projects'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'
import ProjectSkeleton from './components/project-skeleton'

function ProjectSwitcher() {
  const { slug: organizationSlug, projectSlug } = useParams<{
    slug: string
    projectSlug: string
  }>()
  const { data: projectsData, isLoading } = useQuery({
    queryKey: [organizationSlug, QueryKeysEnum.PROJECTS],
    queryFn: () => getProjects(organizationSlug),
    enabled: Boolean(organizationSlug),
  })

  const hasProjectsAndSlug = projectsData && projectSlug

  const currentProject = hasProjectsAndSlug
    ? projectsData.projects.find((project) => project.slug === projectSlug)
    : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[10.5rem] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {isLoading ? (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full rounded-md" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>

                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}

            <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[12.5rem]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>

          {isLoading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            <>
              {projectsData?.projects.map((project) => (
                <DropdownMenuItem key={project.id} asChild>
                  <Link
                    href={`/org/${organizationSlug}/project/${project.slug}`}
                  >
                    <Avatar className="mr-2 size-4">
                      {project.avatarUrl && (
                        <AvatarImage src={project.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>

                    <span className="line-clamp-1">{project.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={`/org/${organizationSlug.concat(RoutesPath.CREATE_PROJECT)}`}
          >
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProjectSwitcher
