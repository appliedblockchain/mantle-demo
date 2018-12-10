import React from 'react'
import SideMenu from 'components/sideMenu'
import Navlink from 'components/sideMenu/NavLink'
import { HOME, ENCRYPTION } from 'routes'

const SideMenuContainer = () => {
  return (
    <SideMenu>
      <Navlink to={HOME}>Home</Navlink>
      <Navlink to={ENCRYPTION}>Encryption</Navlink>
    </SideMenu>
  )
}

export default SideMenuContainer
