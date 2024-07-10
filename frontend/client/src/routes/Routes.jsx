import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Wallet from '../pages/Wallet'

const Routes=createBrowserRouter([
    {path:'/',element:<Wallet/>},
    {path:'/home',element:<Home/>},

])

export default Routes