import { useWeb3Context } from "../context/UseWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Wallet = () => {
  const navigateTo = useNavigate();
  const { updateWeb3State, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;
  useEffect(() => {
    if (selectedAccount) {
      navigateTo("/home");
    }
  }, [selectedAccount, navigateTo]);

  const handleWallet = async () => {
    const { contractInstance, selectedAccount } = await connectWallet();
    updateWeb3State({
      selectedAccount: selectedAccount,
      contractInstance: contractInstance,
    });
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex-nowrap text-center">
        <h1 className="font-bold text-[42px] gradient-text md:text-[60px]">
          Crypted Vault
        </h1>
        <p className="text-gray-400">A new inovative way to store your data</p>
        <button
          className="relative px-12 py-4 text-white bg-sky-400 rounded-md hover:bg-sky-800 font-semibold"
          onClick={handleWallet}
        >
          Connect Wallet
        </button>
        </div>
      </div>
    </>
  );
};

export default Wallet;
