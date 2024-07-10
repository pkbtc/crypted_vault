import {ethers} from "ethers"
import contractABI from "../constants/contractABI.json"
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
     console.log(signature);
     console.log("hit");
     const url=`http://localhost:3000/api/auth?address=${selectedAccount}`;
     const res=await axios.post(url,dataSignature);
     console.log(res.data);
     console.log("hit after");
     
     
     

     const contractAddress = "0x53739B9302192a91979b99b2E645B3a42d941318"
     const contractInstance = new ethers.Contract(contractAddress,contractABI,signer);
     return {contractInstance,selectedAccount}
 } catch (error) {
    toast.error("Wallet connection failed")
    console.error(error)
 }
}