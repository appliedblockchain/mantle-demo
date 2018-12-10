import React, { Component } from 'react'
import Text from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import styles from './styles'
import { withSnackbar } from 'notistack'
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper'
import SideMenu from 'containers/sideMenu'
import Typography from '@material-ui/core/Typography'

class ViewNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    const { fetchNotes } = this.props
    fetchNotes()
    // console.log('NOTES', notes)
    // this.setState({ notes })
  }

  render() {
    // const { notes } = this.state
    const { classes, notes } = this.props

    console.log('NOTES*****', notes)

    return (
      <div className={classes.container}>
        <SideMenu />
        <Grid container justify='center' spacing={24}>
          <Grid item xs={10}>
            <Typography variant='h2'>Notes</Typography>
          </Grid>
          { notes.length ? notes.map((note, idx) => (
            <Grid item xs={10} key={idx}>
              <Paper className={classes.paper}>
                <Text>Tag: {note.tag}</Text>
                <Text>Note: {JSON.stringify(note.encrypted)}</Text>
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
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(ViewNotes)
