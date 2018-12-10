import React from 'react'
import Main from 'components/main'
import LinkButton from 'components/linkButton'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Mantle from '@appliedblockchain/mantle-core'

const Home = props => {
  const handleGenerateMnemonic = () => {
    const { history, generateMnemonic } = props
    const mnemonic = Mantle.generateMnemonic()
    generateMnemonic(mnemonic)
    history.push('/mnemonic')
  }

  return (
    <Main style={{ display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={24}>
        <Grid item xs={12}> 
          <Button
            fullWidth
            color='primary'
            variant='contained'
            onClick={handleGenerateMnemonic}>
            Generate Mnemonic
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LinkButton
            fullWidth
            color='primary'
            variant='contained'
            to='/load-mnemonic'>
            Load mnemonic
          </LinkButton>
        </Grid>
      </Grid>
    </Main>
  )
}

export default Home