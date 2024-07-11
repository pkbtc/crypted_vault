import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Wallet from '../pages/Wallet'
import NavBar from '../components/NavBar'

const Routes=createBrowserRouter([
    {path:'/',element:<Wallet/>},
    {path:'/home',element:(
        <div>
            <NavBar/>
            <Home/>
        </div>
    )},

])

export default Routes