import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RoutesPath } from '@/enums/routes-path'

function ForgotPasswordPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" name="email" />
      </div>

      <Button className="w-full" type="submit">
        Recover password
      </Button>

      <Button className="w-full" variant="link" asChild size="sm">
        <Link href={RoutesPath.SIGN_IN}>Sign in instead</Link>
      </Button>
    </form>
  )
}

export default ForgotPasswordPage
