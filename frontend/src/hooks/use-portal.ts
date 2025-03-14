import { MouseEvent, useState } from 'react'

const usePortal = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const onOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return { open, anchorEl, onClose, onOpen }
}

export default usePortal
