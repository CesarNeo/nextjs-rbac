import Image from 'next/image'
import Link from 'next/link'

import githubLogoIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const SignUpPageTemplate = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" name="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          id="password_confirmation"
          type="password"
          name="password_confirmation"
        />
      </div>

      <Button className="w-full" type="submit">
        Create account
      </Button>

      <Button className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-in">Already registered? Sign in</Link>
      </Button>

      <Separator />

      <Button variant="outline" className="w-full">
        <Image
          src={githubLogoIcon}
          alt=""
          className="mr-2 size-4 dark:invert"
        />
        Sign up with Github
      </Button>
    </form>
  )
}

export default SignUpPageTemplate
