import React from 'react'
import Text from '@material-ui/core/Typography'
import LinkButton from 'components/linkButton'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import styles from './styles'

const Mnemonic = ({ mnemonic, classes }) => {
  return (
    <div className={classes.container}>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Text>{mnemonic}</Text>
        </Grid>
        <Grid item> 
          <LinkButton
            className={classes.button}
            color='primary'
            variant='contained'
            to='/encryption'>
              Start demo
          </LinkButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Mnemonic)
