import React from 'react'

const ContextValues = React.createContext({
  menu: false,
  openMenu: () => {},
  closeMenu: () => {},
})

export default ContextValues
