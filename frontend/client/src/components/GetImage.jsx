import React from 'react'
import axios from 'axios';
import {useState} from 'react';
import { useWeb3Context } from '../context/useWeb3Context';

const GetImage = () => {
  const {web3State}=useWeb3Context();
  const {contract,selectedAccount}=web3State;
  const [currentPage,setCurrentPage]=useState(1);
  const [imagePerPage,setImagePerPage]=useState(2);
  const getHashes=async()=>{
      const ipfshashed=await contract.viewFile(selectedAccount);
      return ipfshashed;
  }
  const getImage = async () => {
    try {
      const hash = await getHashes();
      const ipfsArray = Object.values(hash);
      const url = `http://localhost:3000/api/getimage?page=${currentPage}&limit=${imagePerPage}`;
      const token = localStorage.getItem("token");
      console.log(token);
      
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }
  
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      console.log(config);
  
      const res = await axios.post(url, ipfsArray, config);
      
      // Handle successful response
      console.log("Response:", res.data);
    } catch (error) {
      // Handle errors
      console.error("Error getting image:", error);
    }
  };
  return (
    <div>
      <button onClick={getImage}>Get Image</button>
    </div>
  )
}

export default GetImage
