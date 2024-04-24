import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "../FileUpload";
import Upload from "../../artifacts/contracts/Upload.sol/Upload.json";
import Display from "../Display";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// import Dashboard from "./components/Dashboard/Dashboard";

function Home() {
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

  const sampleFunction = async () => {
    try {
      // Add your function logic here
      // For example, calling a function from your smart contract
      if (contract) {
        const result = await contract.yourFunction();
        console.log("Function result:", result);
      } else {
        console.error("Contract not loaded");
      }
    } catch (error) {
      console.error("Error in sampleFunction:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <div className="AccountAddress">
          <p>Account : {account ? account : "Not connected"}</p>
          {/* <img src={require("./accountIcon.png")} alt="logo" /> */}
        </div>

        <div className="mainbody">
          <div className="leftody">
            <h1>
              Making <span>Healthcare</span> better <br />
              together
            </h1>
            <h3>
              Blockchain-Enhanced Secure Medical Image Management:
              <br />A Cutting-Edge Solution for Healthcare Data Integrity and
              Privacy
            </h3>
            <button className="bodybutton">Project Report</button>
          </div>
          <div className="rightbody">
            {/* <img src={require("./mainbody.png")} alt="logo" /> */}
          </div>
        </div>

        {/* card */}
        <div className="ag-format-container">
          <div className="ag-courses_box">
            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                {/* <img src={require("./accountIcon.png")} alt="logo" /> */}
                <div className="ag-courses-item_title">Upload Patient Data</div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="./Display.js" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                {/* <img src={require("./accountIcon.png")} alt="logo" /> */}
                <div className="ag-courses-item_title">Get Patient Data</div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                {/* <img src={require("./accountIcon.png")} alt="logo" /> */}

                <div className="ag-courses-item_title">Share Patient Data</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
