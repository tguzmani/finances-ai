import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BudgetCategorySummary from './budget-category-summary'
import BudgetSubcategories, { Subcategory } from './budget-subcategories'

interface Budget {
  category: string
  totalSpent: number
  totalCap: number
  subcategories: Subcategory[]
}

const BudgetCategory = ({ budget }: { budget: Budget }) => {
  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <BudgetCategorySummary
          category={budget.category}
          totalSpent={budget.totalSpent}
          totalCap={budget.totalCap}
        />
      </AccordionSummary>

      <AccordionDetails sx={{ p: 1 }}>
        <BudgetSubcategories subcategories={budget.subcategories} />
      </AccordionDetails>
    </Accordion>
  )
}

export default BudgetCategory
