import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    flexGrow: 1
  },
  title: {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: theme.spacing(6) + 4,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem'
    }
  },
  '@media (max-width: 445px)': {
    title: {
      fontSize: '1.2rem'
    }
  },
  '@media (max-width: 362px)': {
    title: {
      fontSize: '1rem'
    }
  }
}))
