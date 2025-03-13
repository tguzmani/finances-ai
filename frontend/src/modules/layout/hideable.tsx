import { Typography, TypographyProps } from '@mui/material'
import { useVisibilityStore } from '../../visibility.store'

interface HideableProps extends TypographyProps {
  children: React.ReactNode
}

const Hideable = ({ children, ...props }: HideableProps) => {
  const { visibility } = useVisibilityStore()

  if (!visibility) return <Typography {...props}>******</Typography>

  return children
}

export default Hideable
