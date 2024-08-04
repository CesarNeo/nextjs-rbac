import {
  Group,
  Portal,
  RadioGroup,
  Root,
  Sub,
  Trigger,
} from '@radix-ui/react-dropdown-menu'

import DropdownMenuCheckboxItem from './checkbox-item'
import DropdownMenuContent from './content'
import DropdownMenuItem from './item'
import DropdownMenuLabel from './label'
import DropdownMenuRadioItem from './radio-item'
import DropdownMenuSeparator from './separator'
import DropdownMenuShortcut from './shortcut'
import DropdownMenuSubContent from './sub-content'
import DropdownSubTrigger from './sub-trigger'

const DropdownMenu = {
  Root,
  Trigger,
  Group,
  Portal,
  Sub,
  RadioGroup,
  Label: DropdownMenuLabel,
  Item: DropdownMenuItem,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownSubTrigger,
  Content: DropdownMenuContent,
  CheckboxItem: DropdownMenuCheckboxItem,
}

export default DropdownMenu
