import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./App.css";
import Web3 from "web3";
import {NFTCollection} from "./abi";




class App extends Component {

 render() {
  const web3 = new Web3(Web3.givenProvider);
  const contractAddress = "0x68Fd8cBD6951e106FD5E4c833b88CFa5552ef059";
  const nftContract = new web3.eth.Contract(NFTCollection.abi,contractAddress); 

  function handleConnect(){
    const accounts = window.ethereum.enable();
    const account = accounts[0];
    this.setState({account : account});
  }
  async function handleMint(){
    const gas = await nftContract.methods.mint(window.ethereum.selectedAddress,1).estimateGas();

    const result = await nftContract.methods.mint(window.ethereum.selectedAddress,1).send({
      from: window.ethereum.selectedAddress,
      gas
    });
  }

   return (
     <div className="bg-info h-100">
       <div className="d-flex justify-content-end  p-4 me-4">
          <Button onClick={handleConnect} className="fs-5 d-flex" variant="dark">connect to wallet</Button>
       </div>
       <div className="d-flex justify-content-center align-items-center flex-column p-4">
          <h1 >This is project for free NFT mint</h1>
          <h4  className="mt-4">first connect your wallet</h4>
          <h2 className="text-danger m-2">you have connect to rinkeby network if not connected you cant get NFT</h2>
          <h4>give some fake ether from this link <a href="https://rinkebyfaucet.com/">rinkeby faucet</a></h4>
          <h4>and click on MINT NOW!</h4>
          <Button onClick={handleMint} className="fs-3 m-5 d-flex" variant="dark">MINT NOW</Button>
          <h3>some item in this collection</h3>
       </div>
        <div className="d-flex justify-content-center p-3 gap-4 px-5 text-center">
          <img src="https://ipfs.io/ipfs/QmdZzQtKyArrxvNdYqp1pNFk8zvKr9GBe6NHjNkJiiDUvT/1.jpg" className="img-size rounded border border-4"/>
          <img src="https://ipfs.io/ipfs/QmdZzQtKyArrxvNdYqp1pNFk8zvKr9GBe6NHjNkJiiDUvT/2.jpg" className="img-size rounded border border-4"/>
          <img src="https://ipfs.io/ipfs/QmdZzQtKyArrxvNdYqp1pNFk8zvKr9GBe6NHjNkJiiDUvT/3.jpg" className="img-size rounded border border-4"/>
          <img src="https://ipfs.io/ipfs/QmdZzQtKyArrxvNdYqp1pNFk8zvKr9GBe6NHjNkJiiDUvT/4.jpg" className="img-size rounded border border-4"/>
        </div>
     </div>)
 }
}
export default App;
