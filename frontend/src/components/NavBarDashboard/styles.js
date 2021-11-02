import { makeStyles } from '@material-ui/core'

const drawerWidth = 270
export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    width: 'auto',
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#101622',
  },
  userName: {
    marginRight: theme.spacing(2)
  }
}))
