import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

// !. Define faction colors so we can pass them like 'devoted.500'
const colors = {
  devoted: {
    500: '#afa331'
  },
  ghost: {
    500: '#9845a4'
  },
  imperial: {
    500: '#2f4fc7'
  },
  pirate: {
    500: '#b42f2f'
  },
  trader: {
    500: '#4aa547'
  },
  neutral: {
    500: '#cacaca'
  }
}

// 3. extend the theme
const theme = extendTheme({ config, colors })

export default theme