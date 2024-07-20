'use client'

import { Separator } from '@radix-ui/react-separator'
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
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signWithEmailAndPassword } from './actions'

function SignInForm() {
  const router = useRouter()

  const {
    formState: { success, message, errors },
    handleSubmitAction,
    isPending,
  } = useFormState({
    action: signWithEmailAndPassword,
    onSuccess: () => router.push('/'),
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
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" name="email" />

          {errors?.email && <TextError>{errors.email[0]}</TextError>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />

          {errors?.password && <TextError>{errors.password[0]}</TextError>}

          <Button variant="link" size="sm" asChild className="pl-0">
            <Link href="/auth/forgot-password">Forgot our password?</Link>
          </Button>
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button className="w-full" variant="link" asChild size="sm">
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" className="w-full" variant="outline">
          <Image
            src={githubIcon}
            alt=""
            width={16}
            height={16}
            className="mr-2 size-4 dark:invert"
          />
          Sign in with Github
        </Button>
      </form>
    </div>
  )
}

export default SignInForm
