import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'
import { Omit } from '@material-ui/types'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useStyles } from './styles'

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
  onClick?: () => void
}

// eslint-disable-next-line
function ListItemLink(props: ListItemLinkProps): JSX.Element {
  const { icon, primary, to, onClick } = props
  const classes = useStyles()
  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  )

  return (
    <li>
      <ListItem
        button
        key={primary}
        onClick={onClick}
        component={renderLink}
        className={classes.listItem}
      >
        {icon ? (
          <ListItemIcon className={classes.white}>{icon}</ListItemIcon>
        ) : null}
        <ListItemText
          primary={primary}
          classes={{
            primary: classes.white
          }}
        />
      </ListItem>
    </li>
  )
}

export default ListItemLink
