import {
  Box,
  Divider,
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
import BanescoOverview from './banesco-overview'

const AccountsOverview = () => {
  const { data: accountOverviewAccounts } = useGetAccountsOverview()

  if (!accountOverviewAccounts)
    return (
      <Stack>
        <Skeleton variant='rounded' animation='wave' height={150} />
      </Stack>
    )
  return (
    <Stack spacing={3}>
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
              {/* <TableCell align='right'>Initial</TableCell> */}
              <TableCell align='right'>In</TableCell>
              <TableCell align='right'>Out</TableCell>
              <TableCell align='right'>Balance</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {accountOverviewAccounts.map(row => (
              <TableRow
                key={row.id}
                sx={{
                  '& .MuiTableCell-root': {
                    px: 0,
                    py: 1,
                    border: 0,
                    verticalAlign: 'top',
                  },
                  '& td, & th': { border: 0 },
                }}
              >
                <TableCell sx={{ flexGrow: 1 }} component='th' scope='row'>
                  <Typography variant='body2'>{row.label}</Typography>
                </TableCell>

                <TableCell sx={{ width: '25%' }} align='right'>
                  <Amount currency={row.currency} variant='caption'>
                    {row.in}
                  </Amount>
                </TableCell>
                <TableCell sx={{ width: '25%' }} align='right'>
                  <Amount currency={row.currency} variant='caption'>
                    {row.out}
                  </Amount>
                </TableCell>
                <TableCell sx={{ width: '25%' }} align='right'>
                  <Amount
                    currency={row.currency}
                    variant='caption'
                    fontWeight={600}
                  >
                    {row.balance}
                  </Amount>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />
      <BanescoOverview />
    </Stack>
  )
}

export default AccountsOverview
