import AddIcon from '@mui/icons-material/Add'
import {
  DialogContent,
  DialogTitle,
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
        <DialogTitle>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h6'>Create Transaction</Typography>

            <IconButton
              disableRipple
              size='small'
              onClick={portalProps.onClose}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <TransactionView handleCloseDialog={portalProps.onClose} />
        </DialogContent>
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
