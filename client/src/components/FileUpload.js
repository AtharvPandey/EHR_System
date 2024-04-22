import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `0267480b51396b166dbe`,
            pinata_secret_api_key: `5b70febb58a3445d81179fe5d45b2e93144552096d29bbc41f9f1ffd3948f19c`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    // alert("Successfully Image Uploaded");
    // setFileName("No image selected");
    // setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
//
///
//

//
///

//
//
///
///
///
///
//
///
// import { useState } from "react";
// import axios from "axios";
// import CryptoJS from "crypto-js";
// import "./FileUpload.css";

// const FileUpload = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const reader = new FileReader();
//         reader.onload = async () => {
//           try {
//             const arrayBuffer = await new Response(reader.result).arrayBuffer(); // Convert data URL to ArrayBuffer
//             const encryptedData = CryptoJS.AES.encrypt(
//               CryptoJS.lib.WordArray.create(arrayBuffer), // Convert ArrayBuffer to WordArray
//               "your-secret-key"
//             ).toString();

//             const encryptedBlob = new Blob([encryptedData]);
//             const formData = new FormData();
//             formData.append("file", encryptedBlob, fileName);

//             const resFile = await axios.post(
//               "https://api.pinata.cloud/pinning/pinFileToIPFS",
//               formData,
//               {
//                 headers: {
//                   pinata_api_key: "0267480b51396b166dbe",
//                   pinata_secret_api_key:
//                     "5b70febb58a3445d81179fe5d45b2e93144552096d29bbc41f9f1ffd3948f19c",
//                   "Content-Type": "multipart/form-data",
//                 },
//               }
//             );

//             const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//             contract.add(account, imgHash);
//             alert("Successfully Image Uploaded");
//             setFileName("No image selected");
//             setFile(null);
//           } catch (error) {
//             console.error("Error uploading encrypted image:", error);
//             alert("Unable to upload encrypted image to Pinata");
//           }
//         };

//         reader.readAsDataURL(file);
//       } catch (error) {
//         console.error("Error reading file:", error);
//         alert("Unable to read file");
//       }
//     }
//   };

//   const retrieveFile = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileName(selectedFile.name);
//   };

//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FileUpload;
