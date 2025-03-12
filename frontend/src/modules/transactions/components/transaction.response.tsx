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
} from '@mui/material'

import dayjs from 'dayjs'

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

  return (
    <Stack spacing={0}>
      <Stack spacing={0}>
        <Typography variant='body1' align='center'>
          {dayjs(date).format('DD MMM, YYYY')}
        </Typography>

        <Typography variant='body1' align='center'>
          {description}
        </Typography>
      </Stack>

      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <Table sx={{ mt: 3 }} size='small'>
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
  )
}

export default TransactionResponse
