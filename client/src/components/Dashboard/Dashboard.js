import React from "react";
import Modal from "../Modal";
import FileUpload from "../FileUpload";
import { ethers } from "ethers";
import Display from "../Display";
import { useState, useEffect } from "react";
import Upload from "../../artifacts/contracts/Upload.sol/Upload.json";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const [account] = await provider.send("eth_requestAccounts", []);
          setAccount(account);

          const signer = provider.getSigner();
          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } else {
          console.error("Metamask is not installed");
        }
      } catch (error) {
        console.error("Error loading provider:", error.message);
      }
    };

    loadProvider();
  }, []);

  return (
    <>
       <Navbar />
      <div className="container">
        <div className="row">
          <div className="mainfunction">
            {modalOpen && (
              <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
            )}
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            ></FileUpload>
            <Display contract={contract} account={account}></Display>

            {/* <-- Access Button --> */}
            {!modalOpen && (
              <button className="share" onClick={() => setModalOpen(true)}>
                Share Access
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
