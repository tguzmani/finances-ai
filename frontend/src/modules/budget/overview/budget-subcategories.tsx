import { Grid2, Stack, Typography } from '@mui/material'
import { CircularProgressIndicator } from '../../layout/circular-progress-indicator'
import Amount from '../../layout/amount'

interface Subcategory {
  subcategory: string
  spent: number
  cap: number
}

interface BudgetSubcategoriesProps {
  subcategories: Subcategory[]
}

const SubcategoryItem = ({ sub }: { sub: Subcategory }) => (
  <Stack direction='row' alignItems='center' spacing={2}>
    <CircularProgressIndicator
      value={(sub.spent / sub.cap) * 100}
      size={20}
      thickness={10}
    />
    <Stack flex={1}>
      <Typography sx={{ fontSize: 12, color: 'grey.700' }}>
        {sub.subcategory}
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
        <Amount>{sub.spent}</Amount>
        <Typography>/</Typography>
        <Amount>{sub.cap}</Amount>
      </Stack>
    </Stack>
  </Stack>
)

const BudgetSubcategories = ({ subcategories }: BudgetSubcategoriesProps) => {
  return (
    <Grid2 container spacing={2} px={1}>
      {subcategories.map(sub => (
        <Grid2 key={sub.subcategory} size={12}>
          <SubcategoryItem sub={sub} />
        </Grid2>
      ))}
    </Grid2>
  )
}

export default BudgetSubcategories
