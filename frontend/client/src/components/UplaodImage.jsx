import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {useWeb3Context} from "../context/UseWeb3Context.jsx"
import toast from 'react-hot-toast'
import {ethers} from "ethers"

import {ImageUp} from "lucide-react"
const UplaodImage = ({reloadEffect}) => {
    const [file,setFile]=useState(null);
    const {web3State}=useWeb3Context();
    const {selectedAccount,contractInstance}=web3State;
    const [loading,setLoading]=useState(false);

   // console.log(selectedAccount,contractInstance);
    const handleHash=async(ipfsHash)=>{
      try {
       // const tx=await contractInstance.uploadFile(selectedAccount,ipfsHash);
       await toast.promise(contractInstance.uploadFile(selectedAccount,ipfsHash),{
        loading:"Transaction is pending",
        success:"Transaction is successful",
        error:"Transaction failed"
    })
      } catch (error) {
        console.log(error)
      }
     // console.log(tx);
    }
    const handleUpload=async()=>{
      setLoading(true);
        const formData=new FormData();
        formData.append("file",file);
        try {
            const url='http://localhost:3000/api/upload';
            const token=localStorage.getItem("token");
            const config={
              headers:{
                "x-access-token":token
              }
            }
        const res=await axios.post(url,formData,config);
        toast.success("Image uploaded successfully");

        await handleHash(res.data.ipfsHash);
        setLoading(false);
        reloadEffect();
        } catch (error) {
          toast.error("Something went wrong");
            console.log(error)
        }
        finally{
          setLoading(false);
        }
    }
    console.log(file);

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center gap-6">
    <p className="font-semibold md:text-[24px]">
      Upload file with Web3s Security
    </p>
    <div className="w-full flex justify-center items-center">
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-[200px] md:w-[210px]"
      />
    </div>
    {file ? (
      <button
        onClick={handleUpload}
        disabled={loading}
        className="border-sky-400 border-dotted p-2 border-2 rounded-md flex flex-col justify-center items-center hover:bg-sky-200"
      >
        <ImageUp />
        {loading ? "Uploading..." : "Upload"}
      </button>
    ) : (
      <p className="text-[20px] font-semibold text-red-500">
        Choose a File To Upload
      </p>
    )}

    <br />
  </div>)
  
}

export default UplaodImage