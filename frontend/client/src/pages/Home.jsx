import React from 'react'
import { useWeb3Context } from '../context/UseWeb3Context';
import UplaodImage from '../components/UplaodImage';
import GetImage from '../components/GetImage';
import { useState } from 'react';
const Home = () => {
    const [reload,setReload]=useState(false);
    // const {web3State}=useWeb3Context();
    // const {selectedAccount}=web3State;
    const reloadEffect=()=>{
      setReload(!reload )
    }
  return (
    <div className="relative h-full w-screen flex flex-col justify-center items-center mt-8 px-4 ">
      <UplaodImage reloadEffect={reloadEffect}/>
      <GetImage reload={reload} />
    </div>
  )
}

export default Home
