import { Stack, Tab, Tabs } from '@mui/material'
import AccountsOverview from '../account/accounts-overview'
import { useState } from 'react'

const TABS_MIN_HEIGHT = 36

const DashboardTabs = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack spacing={2}>
      <Tabs
        sx={{
          width: 'calc(100vw - 16px)',
          position: 'relative',
          right: 16,
          minHeight: TABS_MIN_HEIGHT,
          '& .MuiTab-root': {
            minHeight: TABS_MIN_HEIGHT,
            p: 0.5,
            textTransform: 'none',
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <Tab disableRipple label='Accounts' />
        <Tab disableRipple disabled label='Expenses' />
      </Tabs>

      <AccountsOverview />
    </Stack>
  )
}

export default DashboardTabs
