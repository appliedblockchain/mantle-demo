import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import BaseStyles from 'components/baseStyles'
import Home from 'screens/home'
import Mnemonic from 'screens/mnemonic'
import Encryption from 'screens/encryption'
import { HOME, MNEMONIC, ENCRYPTION } from 'routes'

const App = () => (
  <>
    <BaseStyles />
    <Switch>
      <Route exact path={HOME} component={Home} />
      <Route exact path={MNEMONIC} component={Mnemonic} />
      <Route exact path={ENCRYPTION} component={Encryption} />

      <Redirect to="/" />
    </Switch>
  </>
)

export default App
