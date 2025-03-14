import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Stack, SwipeableDrawer, Typography } from '@mui/material'
import usePortal from '../../hooks/use-portal'
import { TransactionView } from './transaction.view'

const CreateTransactionDialog = () => {
  const portalProps = usePortal()

  return (
    <>
      <SwipeableDrawer
        anchor='bottom'
        keepMounted
        slotProps={{
          paper: {
            sx: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
          },
        }}
        {...portalProps}
      >
        <Stack p={1.5} pt={2} spacing={3}>
          <Box>
            <Typography variant='body1' fontWeight={600} align='center'>
              Create Transaction
            </Typography>
          </Box>

          <TransactionView handleCloseDialog={portalProps.onClose} />
        </Stack>
      </SwipeableDrawer>

      <Fab
        sx={{ position: 'absolute', bottom: 16, right: 16, borderRadius: 3 }}
        size='small'
        color='primary'
        aria-label='add'
        onClick={portalProps.onOpen}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default CreateTransactionDialog
