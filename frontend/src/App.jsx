import { useEffect } from "react";
import VotingContractABI from "./contracts/Voting.json";
import { ethers } from "ethers";
import { useContractContext } from "./context/contractContext";

import BasePanel from "./pages/panels/BasePanel";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function App() {
  const { updateSharedData } = useContractContext();

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x4cfb02fb2a1c3e7d9bdc61cc5ef3306ede828bcb";
      const contractABI = VotingContractABI.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          updateSharedData({ provider, signer, contract });
        } else {
          alert("Install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <>
      <BasePanel />
    </>
  );
}

export default App;
