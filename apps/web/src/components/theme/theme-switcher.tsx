'use client'

import { useTheme } from 'next-themes'
import { useMemo } from 'react'

import { THEMES_ARRAY } from '@/constants/theme'

import Icon from '../icon'
import { Button } from '../ui/button'
import DropdownMenu from '../ui/dropdown-menu'

function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  const themeIconName = useMemo(() => {
    const isDark = resolvedTheme === 'dark'
    const isLight = resolvedTheme === 'light'

    if (isDark) return 'moon'

    if (isLight) return 'sun'

    return 'palette'
  }, [resolvedTheme])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name={themeIconName} />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        {THEMES_ARRAY.map((theme) => (
          <DropdownMenu.Item
            key={theme}
            onClick={() => setTheme(theme)}
            className="capitalize"
          >
            {theme}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default ThemeSwitcher
