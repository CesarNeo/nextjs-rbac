import NavLink, { type INavLinkProps } from '@/components/nav-link'
import { Button } from '@/components/ui/button'

interface IButtonTabProps extends INavLinkProps {}

function ButtonTab(props: IButtonTabProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="border border-transparent text-muted-foreground data-[active=true]:border-border data-[active=true]:text-foreground"
      asChild
    >
      <NavLink {...props} />
    </Button>
  )
}

export default ButtonTab
