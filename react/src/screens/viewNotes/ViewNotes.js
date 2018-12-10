import React from 'react'
import Text from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import styles from './styles'
import { withSnackbar } from 'notistack'
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper'
import SideMenu from 'containers/sideMenu'
import Typography from '@material-ui/core/Typography'

const CreateNote = ({ notes, classes }) => {
  return (
    <div className={classes.container}>
      <SideMenu />
      <Grid container justify='center' spacing={24}>
        <Grid item xs={10}>
          <Typography variant='h2'>Notes</Typography>
        </Grid>
        { notes ? notes.map(note => (
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Text>Tag: {note.tag}</Text>
              <Text>Note: {note.msg}</Text>
            </Paper>
          </Grid>
        )) : (
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Text>No notes available</Text>
          </Paper>
        </Grid>
        ) } 
      </Grid>
    </div>
  )
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(CreateNote)
