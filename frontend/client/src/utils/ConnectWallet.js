import {ethers} from 'ethers';
import axios from 'axios'
import toast from 'react-hot-toast';
import Abi from './Abi.json';
export const ConnectWallet=async()=>{
    try {
        if(!window.ethereum){
            throw new Error('No crypto wallet found');
        }
        const accounts=await window.ethereum.request({method:'eth_requestAccounts'});
        const selectedAccount=accounts[0];
        const provider=new ethers.BrowserProvider(window.ethereum);
        const signer=await provider.getSigner();
        const message="welcome to cyrpto vault website";
        const signature=await signer.signMessage(message);
        console.log(signature);
        const dataSignature={
            signature
        };
        const url=`http://localhost:3000/api/authentication?address=${selectedAccount}`;
        const res=await axios.post(url,dataSignature);
        console.log(res.message);
        const contractAddress="0x683aefcae3a56fe6a64ad6e1f56d2f49d0520435";
        const contract= new ethers.Contract(contractAddress,Abi,signer);
        return {contract,selectedAccount};
    } catch (error) {
        toast.error("wallet connection failed");
        console.log(error);
    }

}