import Image from 'next/image'
import Link from 'next/link'

import githubLogoIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const SignInTemplate = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" name="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground transition-all hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button className="w-full" type="submit">
        Sign in with e-mail
      </Button>

      <Separator />

      <Button variant="outline" className="w-full">
        <Image
          src={githubLogoIcon}
          alt=""
          className="mr-2 size-4 dark:invert"
        />
        Sign in with Github
      </Button>
    </form>
  )
}

export default SignInTemplate
