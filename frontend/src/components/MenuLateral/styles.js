import { makeStyles } from '@material-ui/core'

const drawerWidth = 300

export const useStyles = makeStyles(theme => ({
  root: {
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#101622',
  },
  drawerOpen: {
    top: 'auto',
    backgroundColor: '#101622',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    top: 'auto',
    backgroundColor: '#101622',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1
    }
  },
  logoImg: {
    marginLeft: '10px',
    width: '25px',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: 'auto'
    }
  },
  logoText: {
    color: '#FFF',
    fontWeight: 600,
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.0rem'
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  icon: {
    fontSize: '2rem'
  },
  white: {
    color: 'white'
  },
  listItem: {
    paddingTop: 14,
    paddingBottom: 14
  }
}))
