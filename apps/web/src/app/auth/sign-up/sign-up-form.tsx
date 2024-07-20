'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import TextError from '@/components/text-error'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RoutesPath } from '@/enums/routes-path'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

function SignUpForm() {
  const router = useRouter()

  const {
    formState: { success, message, errors },
    handleSubmitAction,
    isPending,
  } = useFormState({
    action: signUpAction,
    onSuccess: () => router.push(RoutesPath.SIGN_IN),
  })

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmitAction} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>

            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />

          {errors?.name && <TextError>{errors.name[0]}</TextError>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" name="email" />

          {errors?.email && <TextError>{errors.email[0]}</TextError>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />

          {errors?.password && <TextError>{errors.password[0]}</TextError>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
          />

          {errors?.password_confirmation && (
            <TextError>{errors.password_confirmation[0]}</TextError>
          )}
        </div>

        <Button className="w-full" type="submit">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button className="w-full" variant="link" asChild size="sm">
          <Link href={RoutesPath.SIGN_IN}>Already registered? Sign in</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button className="w-full" variant="outline" type="submit">
          <Image
            src={githubIcon}
            alt=""
            width={16}
            height={16}
            className="mr-2 size-4 dark:invert"
          />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
