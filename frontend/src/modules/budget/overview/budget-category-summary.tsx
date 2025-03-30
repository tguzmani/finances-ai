import { Stack, Typography, LinearProgress } from '@mui/material'
import Amount from '../../layout/amount'

interface BudgetCategorySummaryProps {
  category: string
  totalSpent: number
  totalCap: number
}

const BudgetCategorySummary = ({
  category,
  totalSpent,
  totalCap,
}: BudgetCategorySummaryProps) => {
  return (
    <Stack width='100%' spacing={1} pr={2}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='body2' sx={{ fontWeight: 'medium', fontSize: 12 }}>
          {category}
        </Typography>
        <Stack
          direction='row'
          spacing={0.5}
          sx={{
            '& .MuiTypography-root': {
              fontSize: 12,
              color: 'grey.500',
            },
          }}
        >
          <Amount>{totalSpent}</Amount>
          <Typography>/</Typography>
          <Amount>{totalCap}</Amount>
        </Stack>
      </Stack>
      <LinearProgress
        variant='determinate'
        value={(totalSpent / totalCap) * 100}
        sx={{
          height: 4,
          bgcolor: 'grey.200',
          '& .MuiLinearProgress-bar': {
            bgcolor: 'primary.main',
          },
        }}
      />
    </Stack>
  )
}

export default BudgetCategorySummary
