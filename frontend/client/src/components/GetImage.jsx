import React, { useState, useEffect } from 'react';
import { useWeb3Context } from "../context/UseWeb3Context";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const GetImage = ({ reload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;

  useEffect(() => {
    const handleHash = async () => {
      const ipfsHashes = await contractInstance.viewFile(selectedAccount);
      return ipfsHashes;
    };

    const getImage = async () => {
      setLoading(true);
      const ipfs = await handleHash();
      const hashesArray = Object.values(ipfs);
      const url = `http://localhost:3000/api/getimage?page=${currentPage}&limit=${imagePerPage}`;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "x-access-token": token
        }
      };

      try {
        const res = await axios.post(url, hashesArray, config);
        const imagesData = res.data.decryptedDataArray;
        setImages(imagesData);
      } catch (error) {
        toast.error("Error fetching images");
        console.error("Error fetching images", error);
      } finally {
        setLoading(false);
      }
    };

    if (contractInstance && selectedAccount) {
      getImage();
    }
  }, [contractInstance, currentPage, imagePerPage, selectedAccount, reload]);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {images.length > 0 ? (
            images.map((imgData, index) => (
              <img key={index} src={`data:image/jpeg;base64,${imgData}`} alt={`Image ${index}`} />
            ))
          ) : (
            "No images"
          )}
          <button onClick={() => pagination(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={() => pagination(currentPage + 1)}>Next</button>
        </>
      )}
    </>
  );
};

export default GetImage;
