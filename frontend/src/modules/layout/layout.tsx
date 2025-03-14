import { Box, Stack } from '@mui/material'
import ApplicationBar from './application-bar'
import { Toaster } from 'react-hot-toast'
interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Toaster />

      <Stack sx={{ height: '100vh', maxWidth: '100vw', overflow: 'hidden' }}>
        <ApplicationBar />
        <Box flexGrow={1} p={2}>
          {children}
        </Box>
      </Stack>
    </>
  )
}

export default Layout
