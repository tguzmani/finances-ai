import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import usePortal from '../../hooks/use-portal'
import { TransactionView } from './transaction.view'
import BottomDrawer from '../layout/bottom-drawer'

const CreateTransactionDrawer = () => {
  const portalProps = usePortal()

  return (
    <>
      <BottomDrawer title='Create Transaction' {...portalProps}>
        <TransactionView handleCloseDialog={portalProps.onClose} />
      </BottomDrawer>

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

export default CreateTransactionDrawer
