import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Text from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import styles from './styles'
import { withSnackbar } from 'notistack'
import { compose } from 'redux'
import IconButton from '@material-ui/core/IconButton'
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import Paper from '@material-ui/core/Paper'
import SideMenu from 'containers/sideMenu'
import { TextField } from 'components/formik'
import Button from '@material-ui/core/Button'
import { Formik, Form } from 'formik'
import Typography from '@material-ui/core/Typography'
import * as Yup from 'yup'

const CreateNoteSchema = Yup.object().shape({
  tag: Yup.string()
    .required('Required'),
  msg: Yup.string()
    .min(10, 'Too short')
    .required('Required'),
  sharedWith: Yup.array()
})

class CreateNote extends Component {
  constructor(props) {
    super(props)
    this.state = { sharedWith: new Set() }
  }

  componentDidMount() {
    const { fetchUsers } = this.props
    fetchUsers()
  }

  toggleShare(address) {
    const { sharedWith } = this.state
    sharedWith.has(address)
      ? sharedWith.delete(address)
      : sharedWith.add(address)

    this.setState({ sharedWith })
  }

  render() {
    const { classes, users, createNote, enqueueSnackbar } = this.props
    const sharedWith = Array.from(this.state.sharedWith)

    const onSubmit = async ({ tag, msg }, { resetForm }) => {
      try {
        const note = { tag, msg, sharedWith }
        await createNote(note)
        enqueueSnackbar('Note successfully created', { variant: 'success' })
        resetForm({})
      } catch (err) {
        enqueueSnackbar('Note creation failed', { variant: 'error' })
      }
    }

    return (
      <div className={classes.container}>
        <SideMenu />
        <Grid container justify="center" spacing={24}>
          <Grid item xs={10}>
            <Typography variant="h4">Create a note</Typography>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Formik
                initialValues={{ tag: '', msg: '' }}
                validationSchema={CreateNoteSchema}
                onSubmit={onSubmit}>
                {(props) => (
                  <Form>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="tag"
                          label="Tag"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="msg"
                          label="Note"
                          variant="outlined"
                        />
                      </Grid>

                      { users.length ? (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="h6">Share your note with the following users?</Typography>
                          </Grid>
                          { users.map((user, idx) => (
                            <Grid item xs={12} key={idx}>
                              <Paper className={classes.userPaper}>
                                <Typography variant="h5" className={classes.marginBottom}>
                                  {user.name}
                                  {this.state.sharedWith.has(user.pubKey) && <span className={classes.sharing}>&nbsp; (Sharing)</span>}
                                </Typography>
                                <Text className={classes.marginBottom}>Address: {user.addr}</Text>
                                <Text className={classes.marginBottom}>Public key: {user.pubKey}</Text>
                                {/* @TODO: Replace onClick with bound function. Anonymous functions are bad for performance */}
                                <div className={classes.alignRight}>
                                  <IconButton onClick={() => this.toggleShare(user.pubKey)}>
                                    { this.state.sharedWith.has(user.pubKey)
                                      ? <RemoveCircle />
                                      : <AddCircle />
                                    }
                                  </IconButton>
                                </div>
                              </Paper>
                            </Grid>
                          )) }
                        </>
                      ) : null }

                      <Grid item xs={12} className={classes.alignRight}>
                        <Button type="submit" color="primary" variant="contained" disabled={!props.isValid}>
                            Create
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )
                }
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

CreateNote.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(CreateNote)
