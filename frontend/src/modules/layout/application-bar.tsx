import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { RiExternalLinkLine } from 'react-icons/ri'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useVisibilityStore } from '../../visibility.store'
import { useGetStatus } from '../status/status.query'

const HEIGHT = 36

const ApplicationBar = () => {
  const { visibility, toggleVisibility } = useVisibilityStore()
  const { data: status, isPending } = useGetStatus()

  const ToggleVisibilityIcon = visibility ? VisibilityIcon : VisibilityOffIcon

  const openGoogleSheets = () => {
    if (status?.googleSheetsUrl) {
      window.open(status.googleSheetsUrl, '_blank')
    }
  }

  return (
    <AppBar
      position='static'
      sx={{
        backgroundImage: 'none',
        bgcolor: 'background.default',
        height: HEIGHT,
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ minHeight: HEIGHT }}>
        <Typography variant='body2' component='div' sx={{ flexGrow: 1 }}>
          Fin<span style={{ fontWeight: 700 }}>AI</span>
        </Typography>

        <IconButton
          disabled={isPending}
          disableRipple
          size='small'
          color='inherit'
          aria-label='open sheets'
          onClick={openGoogleSheets}
        >
          <RiExternalLinkLine size={16} />
        </IconButton>

        <IconButton
          disableRipple
          size='small'
          color='inherit'
          aria-label='menu'
          onClick={toggleVisibility}
          sx={{ mr: 1 }}
        >
          <ToggleVisibilityIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default ApplicationBar
