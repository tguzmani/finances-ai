import {
  Box,
  Stack,
  SwipeableDrawer,
  SwipeableDrawerProps,
  Typography,
} from '@mui/material'

export interface BottomDrawerProps extends SwipeableDrawerProps {
  title: string
  children?: React.ReactNode
}

const BottomDrawer = ({ title, children, ...props }: BottomDrawerProps) => {
  return (
    <SwipeableDrawer
      anchor='bottom'
      keepMounted
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        },
      }}
      {...props}
    >
      <Stack p={1.5} pt={2} spacing={3}>
        <Box>
          <Typography variant='body1' fontWeight={600} align='center'>
            {title}
          </Typography>
        </Box>

        {children}
      </Stack>
    </SwipeableDrawer>
  )
}

export default BottomDrawer
