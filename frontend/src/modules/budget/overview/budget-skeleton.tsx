import { Accordion, AccordionSummary, Skeleton, Stack } from '@mui/material'

const BudgetSkeleton = () => {
  return (
    <Accordion disableGutters>
      <AccordionSummary>
        <Stack width='100%' spacing={1}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Skeleton width={120} height={24} />
            <Skeleton width={80} height={24} />
          </Stack>
          <Skeleton variant='rectangular' height={4} />
        </Stack>
      </AccordionSummary>
    </Accordion>
  )
}

export default BudgetSkeleton
