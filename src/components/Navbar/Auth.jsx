import React, {createContext } from 'react'

export const Data=createContext()
const Auth = ({children}) => {
  return (
    <div>
      <Data.Provider value={{totalItems}}>
        {children}
      </Data.Provider>
    </div>
  )
}

export default Auth
