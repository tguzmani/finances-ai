import {
  Box,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useGetAccountsOverview } from './account.query'
import Amount from '../layout/amount'

const AccountsOverview = () => {
  const { data: rows } = useGetAccountsOverview()

  console.log('rows:', rows)

  if (!rows)
    return (
      <Stack>
        <Skeleton variant='rectangular' height={50} />
        <Skeleton variant='rectangular' height={50} />
        <Skeleton variant='rectangular' height={50} />
      </Stack>
    )
  return (
    <TableContainer component={Box}>
      <Table size='small'>
        <TableHead>
          <TableRow
            sx={{
              '& .MuiTableCell-root': {
                p: 0,
                border: 0,
                fontSize: 12,
                color: 'grey.600',
              },
            }}
          >
            <TableCell>Account</TableCell>
            <TableCell align='right'>Initial</TableCell>
            <TableCell align='right'>In</TableCell>
            <TableCell align='right'>Out</TableCell>
            <TableCell align='right'>Balance</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '& .MuiTableCell-root': {
                  px: 0,
                  py: 1,
                  border: 0,
                },
                '& td, & th': { border: 0 },
              }}
            >
              <TableCell sx={{ flexGrow: 1 }} component='th' scope='row'>
                <Typography variant='body2'>{row.label}</Typography>
              </TableCell>
              <TableCell sx={{ width: '16%' }} align='right'>
                <Amount variant='caption'>{row.initialBalance}</Amount>
              </TableCell>
              <TableCell sx={{ width: '16%' }} align='right'>
                <Amount variant='caption'>{row.in}</Amount>
              </TableCell>
              <TableCell sx={{ width: '16%' }} align='right'>
                <Amount variant='caption'>{row.out}</Amount>
              </TableCell>
              <TableCell sx={{ width: '16%' }} align='right'>
                <Amount variant='caption'>{row.balance}</Amount>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AccountsOverview
