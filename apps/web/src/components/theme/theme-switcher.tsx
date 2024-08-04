'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '../ui/button'
import DropdownMenu from '../ui/dropdown-menu'

function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="size-4 dark:invisible dark:size-0" />
          <Moon className="invisible size-0 dark:visible dark:size-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => setTheme('light')}>
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')}>
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default ThemeSwitcher
