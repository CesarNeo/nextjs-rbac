import { Root, Trigger } from '@radix-ui/react-dialog'

import SheetClose from './close'
import SheetContent from './content'
import SheetDescription from './description'
import SheetFooter from './footer'
import SheetHeader from './header'
import SheetOverlay from './overlay'
import SheetTitle from './title'

const Sheet = {
  Root,
  Trigger,
  Overlay: SheetOverlay,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Content: SheetContent,
  Close: SheetClose,
  Footer: SheetFooter,
}

export default Sheet
