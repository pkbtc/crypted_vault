import { useWeb3Context } from "../context/UseWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Wallet = () => {
    const navigateTo=useNavigate()
    const {updateWeb3State,web3State} = useWeb3Context()
    const {selectedAccount}=web3State;
    useEffect(()=>{
        if(selectedAccount){
            navigateTo('/home');
        }
    },[selectedAccount,navigateTo]);

    const handleWallet=async()=>{
        const {contractInstance,selectedAccount}=await connectWallet();
        updateWeb3State({
            selectedAccount:selectedAccount,
            contractInstance:contractInstance
        });
        
    }
    
  return (
    <>
    <button onClick={handleWallet}>Connect Wallet</button>
    </>
  )
}

export default Wallet