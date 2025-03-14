import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useVisibilityStore } from '../../visibility.store'

const HEIGHT = 36

const ApplicationBar = () => {
  const { visibility, toggleVisibility } = useVisibilityStore()

  const ToggleVisibilityIcon = visibility ? VisibilityIcon : VisibilityOffIcon

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
          disableRipple
          size='small'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={toggleVisibility}
        >
          <ToggleVisibilityIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default ApplicationBar
