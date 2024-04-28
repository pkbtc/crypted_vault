
import {createBrowserRouter} from 'react-router-dom';
import Wallet from '../pages/Wallet';
import Home from '../pages/Home';
import GetImage from '../components/GetImage';
import UplaodImage from '../components/UplaodImage';


export const routes=createBrowserRouter([
    {path:'/',element:<Wallet/>},
    {path:'/home',element:<Home/>}
])



