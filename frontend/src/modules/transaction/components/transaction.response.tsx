import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  Stack,
  Typography,
  Box,
  Button,
} from '@mui/material'

import dayjs from 'dayjs'
import { useSaveTransactionData } from '../transaction.service'
import { useQueryClient } from '@tanstack/react-query'
import ExpenseQueryKeys from '../../expense/expense.query-keys'
import AccountQueryKeys from '../../account/account.query-keys'

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
}

export const TransactionResponse = ({
  data,
  isSuccess,
  error,
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

        <Box
          sx={{
            width: '100%',
            overflow: 'auto',
            border: '1px solid',
            borderColor: 'grey.700',
            borderRadius: 1,
          }}
        >
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Debe</TableCell>
                <TableCell>Haber</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Subcategoría</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sheetRows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[4]}</TableCell>
                  <TableCell>{row[5]}</TableCell>
                  <TableCell>{row[6]}</TableCell>
                  <TableCell>{row[7]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
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

export default TransactionResponse
