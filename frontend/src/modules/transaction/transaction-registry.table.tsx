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
} from '@mui/material'

import dayjs from 'dayjs'
import { useSaveTransactionData } from './transaction.service'
import { useQueryClient } from '@tanstack/react-query'
import ExpenseQueryKeys from '../expense/expense.query-keys'
import AccountQueryKeys from '../account/account.query-keys'

interface AccountEntry {
  account: string
  amount: number
}

export interface TransactionData {
  date: string
  description: string
  debit_accounts: AccountEntry[]
  credit_accounts: AccountEntry[]
  total_amount: number
  category?: string
  subcategory?: string
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
    `$${data.total_amount}`,
    '',
    data.category || '',
    data.subcategory || '',
  ])

  // Remaining debit accounts (if more than 1)
  data.debit_accounts.slice(1).forEach(debit => {
    sheetRows.push([
      data.date,
      '',
      debit.account,
      '',
      `$${debit.amount}`,
      '',
      '',
      '',
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
      `$${credit.amount}`,
      '',
      '',
    ])
  })

  const date = sheetRows[0][0]
  const description = sheetRows[0][1]

  const handleSave = () => {
    saveTransactionData(data, {
      onSuccess: () => {
        for (const key of [
          ExpenseQueryKeys.CURRENT_TOTAL_EXPENSE,
          ExpenseQueryKeys.TODAY_EXPENSE,
          ExpenseQueryKeys.EXPENSE_STATUS,
          AccountQueryKeys.ACCOUNTS_OVERVIEW,
        ]) {
          queryClient.invalidateQueries({ queryKey: [key] })
        }

        handleCloseDialog()
      },
    })
  }

  return (
    <Stack spacing={2} justifyContent='space-between' height='100%'>
      <Stack spacing={2}>
        <Stack spacing={0}>
          <Typography variant='body1' align='center'>
            {dayjs(date).format('DD MMM, YYYY')}
          </Typography>

          <Typography variant='body1' align='center'>
            {description}
          </Typography>
        </Stack>

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow
                sx={{
                  '& .MuiTableCell-root': {
                    p: 0,
                    border: 0,
                    fontSize: 11,
                    color: 'grey.600',
                  },
                }}
              >
                <TableCell>Debit</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
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

      {data && (
        <Button
          variant='contained'
          disabled={isPendingSave}
          loading={isPendingSave}
          onClick={handleSave}
        >
          Save
        </Button>
      )}
    </Stack>
  )
}

export default TransactionRegistryTable
