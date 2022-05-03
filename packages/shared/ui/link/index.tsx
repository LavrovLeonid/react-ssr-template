import styled from '@emotion/styled'
import { Link as RouterLink } from 'react-router-dom'

export const Link = styled(RouterLink)(({ theme }) => ({
  display: 'block',
  color: theme.colors.primary,
}))
