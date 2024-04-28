import { useWeb3Context } from '../context/useWeb3Context'
import { ConnectWallet } from '../utils/ConnectWallet';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const Wallet = () => {
  const navigate=useNavigate();
  const {updateWeb3State,web3State}=useWeb3Context();
  const {selectedAccount}=web3State;
  useEffect(()=>{
    if(selectedAccount){
      navigate('/home');
    }
  })


    const handleWallet=async()=>{
      const {contract,selectedAccount}=await ConnectWallet();
      updateWeb3State({contract,selectedAccount});
    }
  return (
    <>
    <button onClick={handleWallet}>Connect Wallet</button>
    </>
  )
}

export default Wallet
