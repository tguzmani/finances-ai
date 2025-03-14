import { Box, Stack } from '@mui/material'
import ApplicationBar from './application-bar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Stack sx={{ height: '100vh', maxWidth: '100vw', overflow: 'hidden' }}>
      <ApplicationBar />
      <Box flexGrow={1} p={2}>
        {children}
      </Box>
    </Stack>
  )
}

export default Layout
