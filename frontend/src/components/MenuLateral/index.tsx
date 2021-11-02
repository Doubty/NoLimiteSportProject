import React, { useState } from 'react'
import clsx from 'clsx'
import {
  CssBaseline,
  IconButton,
  Drawer,
  List,
  Typography,
  Box
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import DirectionsBikeOutlined from '@material-ui/icons/DirectionsBikeOutlined'
import CardGiftcard from '@material-ui/icons/AddShoppingCart'
import People from '@material-ui/icons/People'
import Store from '@material-ui/icons/Store'
import GroupWork from '@material-ui/icons/GroupWork'
import ExitToApp from '@material-ui/icons/ExitToApp'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useTheme } from '@material-ui/core/styles'
import { useStyles } from './styles'

import logoImg from '../../assets/img/logo.png'
import ListItemLink from '../LinkListItem'

import { useHistory } from 'react-router-dom'

const MenuLateral: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()

  const [open, setOpen] = useState(true)

  const history = useHistory()

  const handleDrawerToogle = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerToogle}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon className={classes.white} />
            ) : (
              <ChevronLeftIcon className={classes.white} />
            )}
          </IconButton>
        </div>
       

        <List>
          <ListItemLink
            to="/dashboard"
            primary="Meu Perfil"
            icon={<PersonOutlineIcon className={classes.icon} />}
          />
          <ListItemLink
            to="/ManagerEvents"
            primary="Gerenciar Eventos"
            icon={<DirectionsBikeOutlined className={classes.icon} />}
          />
          <ListItemLink
            to="/ManagerProducs"
            primary="Gerenciar Produtos"
            icon={<CardGiftcard className={classes.icon} />}
          />
           <ListItemLink
            to="/BikeGroup"
            primary="Gerenciar Grupos De Pedal"
            icon={<GroupWork className={classes.icon} />}
          />
           <ListItemLink
            to="/ManagerUsers"
            primary="Gerenciar Usuários"
            icon={<People className={classes.icon} />}
          />
           <ListItemLink
            to="/dashboard"
            primary="Gerenciar Lojas Parceiras"
            icon={<Store className={classes.icon} />}
          />
          <li>
            <ListItem
              button
              key={'Sair'}
              onClick={handleLogout}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.white}>
                <ExitToApp className={classes.icon} />
              </ListItemIcon>

              <ListItemText
                primary={'Sair'}
                classes={{
                  primary: classes.white
                }}
              />
            </ListItem>
          </li>
        </List>
      </Drawer>
    </div>
  )
}

export default MenuLateral
