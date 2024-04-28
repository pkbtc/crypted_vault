import React from 'react'
import axios from 'axios'
const UplaodImage = () => {
  const hanldeUpload=async()=>{
    try {
      const url="http://localhost:3000/api/uploadimage";
      const res=await axios.post(url);
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={hanldeUpload}>Upload Image</button>
    </div>
  )
}

export default UplaodImage
