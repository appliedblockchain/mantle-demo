import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import BaseStyles from 'components/baseStyles'
import Home from 'screens/home'
import Mnemonic from 'screens/mnemonic'
import LoadMnemonic from 'screens/loadMnemonic'
import Encryption from 'screens/encryption'
import { HOME, MNEMONIC, ENCRYPTION, LOAD_MNEMONIC } from 'routes'
import AuthRoute from 'containers/authRoute'

const App = () => (
  <>
    <BaseStyles />
    <Switch>
      <Route exact path={HOME} component={Home} />
      <Route exact path={MNEMONIC} component={Mnemonic} />
      <Route exact path={LOAD_MNEMONIC} component={LoadMnemonic} />
      <AuthRoute exact path={ENCRYPTION} component={Encryption} />

      <Redirect to="/" />
    </Switch>
  </>
)

export default App
