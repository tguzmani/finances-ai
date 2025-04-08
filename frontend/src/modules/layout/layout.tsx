import { Box, Stack } from '@mui/material'
import ApplicationBar from './application-bar'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Toaster containerClassName='toaster' />

      <Stack
        sx={{
          maxWidth: '100vw',
        }}
      >
        <ApplicationBar />
        <Box flexGrow={1} p={2}>
          {children}
        </Box>
      </Stack>
    </>
  )
}

export default Layout
