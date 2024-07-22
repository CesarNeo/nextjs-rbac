'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

import TextError from '@/components/text-error'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

function ProjectForm() {
  const { slug: organizationSlug } = useParams<{ slug: string }>()

  const {
    formState: { success, message, errors },
    handleSubmitAction,
    isPending,
  } = useFormState({
    action: createProjectAction,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [organizationSlug, 'projects'],
      }),
  })

  return (
    <form onSubmit={handleSubmitAction} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed!</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" />

        {errors?.name && <TextError>{errors.name[0]}</TextError>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />

        {errors?.description && <TextError>{errors.description[0]}</TextError>}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}

export default ProjectForm
