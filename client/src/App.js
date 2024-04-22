import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
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
      <div className="App">
        <div className="navbar">
          <div className="logo">
            <img src={require("./mainLogo.png")} alt="logo" />
          </div>

          <div className="navitem">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Service</li>
              <li>Contact</li>
            </ul>
            <button className="signin">Sign In</button>
            <button className="signup">Sign Up</button>
          </div>
        </div>
        <div className="AccountAddress">
          <p>Account : {account ? account : "Not connected"}</p>
          <img src={require("./accountIcon.png")} alt="logo" />
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
            <img src={require("./mainbody.png")} alt="logo" />
          </div>
        </div>

        {/* card */}
        <div className="ag-format-container">
          <div className="ag-courses_box">
            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <img src={require("./accountIcon.png")} alt="logo" />
                <div className="ag-courses-item_title">Upload Patient Data</div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="./Display.js" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <img src={require("./accountIcon.png")} alt="logo" />
                <div className="ag-courses-item_title">Get Patient Data</div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <img src={require("./accountIcon.png")} alt="logo" />

                <div className="ag-courses-item_title">Share Patient Data</div>
              </a>
            </div>
          </div>
        </div>

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
    </>
  );
}

export default App;

{
  /*
       <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display> */
}

// {/* <-- Access Button --> */}
// {!modalOpen && (
//   <button className="share" onClick={() => setModalOpen(true)}>
//     Share Access
//   </button>
// )}

// {modalOpen && (
//   <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
// )}

// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
// import FileUpload from "./components/FileUpload";
// import Display from "./components/Display";
// import Modal from "./components/Modal";
// import "./App.css";

// function App() {
//   const [account, setAccount] = useState("");
//   const [contract, setContract] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const loadProvider = async () => {
//       try {
//         if (window.ethereum) {
//           const provider = new ethers.providers.Web3Provider(window.ethereum);

//           window.ethereum.on("chainChanged", () => {
//             window.location.reload();
//           });

//           window.ethereum.on("accountsChanged", () => {
//             window.location.reload();
//           });

//           const [account] = await provider.send("eth_requestAccounts", []);
//           setAccount(account);

//           const signer = provider.getSigner();
//           let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//           const contract = new ethers.Contract(
//             contractAddress,
//             Upload.abi,
//             signer
//           );

//           setContract(contract);
//           setProvider(provider);
//         } else {
//           console.error("Metamask is not installed");
//         }
//       } catch (error) {
//         console.error("Error loading provider:", error.message);
//       }
//     };

//     loadProvider();
//   }, []);

//   const sampleFunction = async () => {
//     try {
//       // Add your function logic here
//       // For example, calling a function from your smart contract
//       if (contract) {
//         const result = await contract.yourFunction();
//         console.log("Function result:", result);
//       } else {
//         console.error("Contract not loaded");
//       }
//     } catch (error) {
//       console.error("Error in sampleFunction:", error.message);
//     }
//   };

//   return (
//     <>
//       {!modalOpen && (
//         <button className="share" onClick={() => setModalOpen(true)}>
//           Share
//         </button>
//       )}
//       {modalOpen && (
//         <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
//       )}

//       <div className="App">
//         <h1 style={{ color: "white" }}>Medical Image Management</h1>
//         <div className="bg"></div>
//         <div className="bg bg2"></div>
//         <div className="bg bg3"></div>

//         <p style={{ color: "white" }}>
//           Account: {account ? account : "Not connected"}
//         </p>
//         <FileUpload
//           account={account}
//           provider={provider}
//           contract={contract}
//         ></FileUpload>
//         <Display contract={contract} account={account}></Display>

//         {/* Add a button to trigger the sample function */}
//         <button onClick={sampleFunction}>Call Sample Function</button>
//       </div>
//     </>
//   );
// }

// export default App;
