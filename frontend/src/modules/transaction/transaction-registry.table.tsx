import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  Stack,
  Typography,
  Button,
  TableContainer,
  Divider,
} from '@mui/material'

import dayjs from 'dayjs'
import { useSaveTransactionData } from './transaction.command'
import { useQueryClient } from '@tanstack/react-query'
import ExpenseQueryKeys from '../expense/expense.query-keys'
import AccountQueryKeys from '../account/account.query-keys'
import BudgetQueryKeys from '../budget/budget.query-keys'
import toast from 'react-hot-toast'

interface AccountEntry {
  account: string
  amount: number
  category?: string
  subcategory?: string
}

export interface TransactionData {
  date: string
  description: string
  debit_accounts: AccountEntry[]
  credit_accounts: AccountEntry[]
}

interface TransactionResponseProps {
  data?: TransactionData
  isSuccess: boolean
  error: unknown
  handleCloseDialog: () => void
}

export const TransactionRegistryTable = ({
  data,
  isSuccess,
  error,
  handleCloseDialog,
}: TransactionResponseProps) => {
  const { mutate: saveTransactionData, isPending: isPendingSave } =
    useSaveTransactionData()

  const queryClient = useQueryClient()

  if (error)
    return <Alert severity='error'>Error: {(error as Error).message}</Alert>

  if (!isSuccess || !data) return null

  const sheetRows: Array<string | number>[] = []

  // First row (Expense or main debit)
  sheetRows.push([
    data.date,
    data.description,
    data.debit_accounts[0]?.account || '',
    '',
    `$${data.debit_accounts[0]?.amount.toFixed(2)}`,
    '',
    data.debit_accounts[0]?.category || '',
    data.debit_accounts[0]?.subcategory || '',
  ])

  // Remaining debit accounts (if more than 1)
  data.debit_accounts.slice(1).forEach(debit => {
    sheetRows.push([
      data.date,
      '',
      debit.account,
      '',
      `$${debit.amount.toFixed(2)}`,
      '',
      debit.category || '',
      debit.subcategory || '',
    ])
  })

  // Credit accounts (payment sources)
  data.credit_accounts.forEach(credit => {
    sheetRows.push([
      data.date,
      '',
      '',
      credit.account,
      '',
      `$${credit.amount.toFixed(2)}`,
      '',
      '',
    ])
  })

  const handleSave = () => {
    saveTransactionData(data, {
      onSuccess: () => {
        for (const key of [
          ExpenseQueryKeys.CURRENT_TOTAL_EXPENSE,
          ExpenseQueryKeys.TODAY_EXPENSE,
          ExpenseQueryKeys.EXPENSE_STATUS,
          AccountQueryKeys.ACCOUNTS_OVERVIEW,
          AccountQueryKeys.BANESCO_OVERVIEW,
          BudgetQueryKeys.BUDGETS_OVERVIEW,
        ]) {
          queryClient.invalidateQueries({ queryKey: [key] })
        }

        handleCloseDialog()

        toast.success('Transaction saved successfully')
      },
      onError: () => {
        toast.error('Failed to save transaction')
      },
    })
  }

  return (
    <Stack spacing={2} justifyContent='space-between' height='100%'>
      <Stack spacing={2}>
        <Stack spacing={0} direction='row' justifyContent='space-between'>
          <Typography variant='body2' align='center'>
            {data.description}
          </Typography>
          <Typography variant='body2' align='center' color='grey.400'>
            {dayjs(data.date).format('DD MMM, YYYY')}
          </Typography>
        </Stack>

        <Divider />

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow
                sx={{
                  '& .MuiTableCell-root': {
                    p: 0,
                    border: 0,
                    fontSize: 11,
                    color: 'grey.500',
                  },
                }}
              >
                <TableCell>Debit</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='right'>Category</TableCell>
                <TableCell align='right'>Subcategory</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sheetRows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{
                    '& .MuiTableCell-root': { fontSize: 12, px: 0 },
                    '& td, & th': { border: 0 },
                  }}
                >
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell align='right'>{row[4]}</TableCell>
                  <TableCell align='right'>{row[5]}</TableCell>
                  <TableCell align='right'>{row[6]}</TableCell>
                  <TableCell align='right'>{row[7]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Button
        variant='contained'
        disabled={isPendingSave}
        loading={isPendingSave}
        onClick={handleSave}
      >
        Save
      </Button>
    </Stack>
  )
}

export default TransactionRegistryTable
