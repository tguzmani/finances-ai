import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Drawer,
  Fab,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import usePortal from '../../hooks/use-portal'
import React from 'react'
import { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'
import { TransactionView } from './transaction.view'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CreateTransactionDialog = () => {
  const { handleOpenPortal, ...portalProps } = usePortal()

  return (
    <>
      <Drawer
        {...portalProps}
        slots={{ transition: Transition }}
        anchor={'bottom'}
        keepMounted
        sx={{ height: '70%' }}
        slotProps={{
          paper: {
            sx: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
          },
          backdrop: { sx: { backdropFilter: 'blur(4px)' } },
        }}
      >
        <Stack p={2} spacing={3}>
          <Box>
            <Typography variant='body1' fontWeight={600} align='center'>
              Create Transaction
            </Typography>

            <IconButton
              sx={{ position: 'absolute', top: 12, left: 12 }}
              disableRipple
              size='small'
              onClick={portalProps.onClose}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <TransactionView handleCloseDialog={portalProps.onClose} />
        </Stack>
      </Drawer>

      <Fab
        sx={{ position: 'absolute', bottom: 16, right: 16, borderRadius: 3 }}
        size='small'
        color='primary'
        aria-label='add'
        onClick={handleOpenPortal}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default CreateTransactionDialog
