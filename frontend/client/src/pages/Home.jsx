import React from 'react'
import { useWeb3Context } from '../context/useWeb3Context'
import GetImage from '../components/GetImage';
import UplaodImage from '../components/UplaodImage';

const Home = () => {
  const {web3State} =useWeb3Context();
  const {contract,selectedAccount}=web3State;
  
  return (
    <div>
      <UplaodImage/>
      <GetImage/>
    </div>
  )
}

export default Home
