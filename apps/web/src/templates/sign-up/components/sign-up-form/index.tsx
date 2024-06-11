'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { signInWithGithub } from '@/app/auth/actions'
import { signUpAction } from '@/app/auth/sign-up/actions'
import githubLogoIcon from '@/assets/github-icon.svg'
import ErrorText from '@/components/error-text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import useFormState from '@/hooks/use-form-state'

const SignUpForm = () => {
  const router = useRouter()

  const {
    formState: { errors, message, success },
    handleSubmitAction,
    isPending,
  } = useFormState(signUpAction, () => router.push('/auth/sign-in'))

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmitAction} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" />

          {errors?.name && <ErrorText>{errors.name[0]}</ErrorText>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" name="email" />

          {errors?.email && <ErrorText>{errors.email[0]}</ErrorText>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />

          {errors?.password && <ErrorText>{errors.password[0]}</ErrorText>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
          />

          {errors?.password_confirmation && (
            <ErrorText>{errors.password_confirmation[0]}</ErrorText>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" variant="outline" className="w-full">
          <Image
            src={githubLogoIcon}
            alt=""
            className="mr-2 size-4 dark:invert"
          />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
