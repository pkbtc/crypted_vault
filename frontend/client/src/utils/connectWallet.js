import {ethers} from "ethers"
import abi from "./ABI.json"
import toast from "react-hot-toast"
import axios from "axios"
export const connectWallet = async()=>{
 try {
    
     if(!window.ethereum){
        throw new Error("Metamask is not installed")
     }
     const accounts =await window.ethereum.request({
        method:"eth_requestAccounts"
     })
     const selectedAccount = accounts[0];
    
     const provider = new ethers.BrowserProvider(window.ethereum);
     const signer = await provider.getSigner();
     
     const message = "welcome to crypted Vault";
     const signature = await signer.signMessage(message)
     
     const dataSignature = {
      signature
     }
     
     const url=`http://localhost:3000/api/auth?address=${selectedAccount}`;
     const res=await axios.post(url,dataSignature);
     const token=res.data.token;
     localStorage.setItem("token",token);
     
     
     
     

     const contractAddress = "0x305D4DF94aB7dEaab193bbFD99bA177613C6a6e5";
     const contractInstance = new ethers.Contract(contractAddress,abi,signer);
     return {contractInstance,selectedAccount}
 } catch (error) {
    toast.error("Wallet connection failed")
    console.error(error)
 }
}