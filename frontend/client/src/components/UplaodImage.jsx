import axios from 'axios'
import { useState } from 'react'
import {useWeb3Context} from '../context/useWeb3Context';
import toast from 'react-hot-toast';
const UplaodImage = () => {
  const {web3State}=useWeb3Context();
  const {contract,selectedAccount}=web3State;
  console.log(contract,selectedAccount);
  const [file,setFile]=useState(null);
  const uplaodImageHash=async(ipfsHash)=>{
      const tx=await  contract.uploadFile(selectedAccount,ipfsHash);
      await toast.promise(await tx.wait()),{
        loading:"transaction pending..",
        success:"image uploaded sucessfully",
        error:"transaction failed"
      }
  }
  const hanldeUpload=async()=>{
    
    try {
      const formData=new FormData();
      formData.append("file",file);
      const url="http://localhost:3000/api/uploadimage";
      const res=await axios.post(url,formData);
      toast.success("image uploaded sucessfully");
      uplaodImageHash(res.data.ipfsHash);

    } catch (error) {
      console.log(error)
    }
  }
  console.log(file);
  return (
    <div>
      <input type='file' onChange={(e)=>setFile(e.target.files[0])}></input>
      <button onClick={hanldeUpload}>Upload Image</button>
    </div>
  )
}

export default UplaodImage
