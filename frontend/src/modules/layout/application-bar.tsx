import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'

const HEIGHT = 36

const ApplicationBar = () => {
  return (
    <AppBar position='static' sx={{ height: HEIGHT }}>
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
        >
          <VisibilityIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default ApplicationBar
