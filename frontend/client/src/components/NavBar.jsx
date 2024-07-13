import React from 'react'
import ConnectedAccount from './ConnectedAccount'
const NavBar = () => {
  return (
    <div className=" w-full h-[80px] bg-sky-300 flex justify-center items-center border-b-2 border-gray-700">
         <ConnectedAccount />
    </div> 
  )
}

export default NavBar
