import axios from 'axios'
import { useState } from 'react'
import {useWeb3Context} from '../context/useWeb3Context';
import toast from 'react-hot-toast';
import {ImageUp} from 'lucide-react';
const UplaodImage = () => {
  const {web3State}=useWeb3Context();
  const {contract,selectedAccount}=web3State;
  const [loading,setLoading]=useState(false);
  console.log(contract,selectedAccount);
  const [file,setFile]=useState(null);
  const uplaodImageHash=async(ipfsHash)=>{
      const tx=await  contract.uploadFile(selectedAccount,ipfsHash);
      await toast.promise(tx.wait(),{
        loading:"transaction pending..",
        success:"image uploaded sucessfully",
        error:"transaction failed"
      })
  }
  const hanldeUpload=async()=>{
    
    try {
      setLoading(true);
      const formData=new FormData();
      formData.append("file",file);
      const url="http://localhost:3000/api/uploadimage";
      const token=localStorage('token');
      const config={
        Headers:{
          "x-access":token
        }
      }

    const res=await axios.post(url,formData,config);
    
      toast.success("image uploaded sucessfully");
      await uplaodImageHash(res.data.ipfsHash);
      setLoading(false);
      

    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  }
  console.log(file);
  return (
    <div>
      <input type='file' onChange={(e)=>setFile(e.target.files[0])} disabled={loading}></input>
      <button onClick={hanldeUpload} disabled={loading || file}>Upload Image</button>
    </div>
  )
}

export default UplaodImage
