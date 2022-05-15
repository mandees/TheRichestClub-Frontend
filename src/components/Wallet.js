import React, { useState } from 'react';
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';
import { Button, Form, Header  } from 'semantic-ui-react';
import Web3 from 'web3';

function Wallet(props) {

  const [currentAccount, setCurrentAccount] = useState(props.currentAccount);
  //const [onConnect, setOnConnect] = useState(props.onConnect);
  
  /*
  const setupWallet = async function () {
    
    console.log("Setting up wallet");

    const provider = await detectEthereumProvider();
      if (provider)
        console.log(provider);
  };

  const handleAccountsChanged = function (accounts) {
    
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      let shortenedAccount = accounts[0].substring(0, 6) + '...' + accounts[0].substring(accounts[0].length - 4, accounts[0].length);
      setCurrentAccount(shortenedAccount);
      console.log(currentAccount);
      
      props.onConnect('SuperCazzola');


      // Do any other work!
    }
  }

  const toggleConnect = function () {
    if (currentAccount == null) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
      }
      else {
        alert('You\'ll be disconnected');
        setCurrentAccount(null);
      }
  } */

  //setupWallet();
  
  return (
      <div>
          <Button inverted color="purple" size="large" onClick={props.onToggleConnect}>{props.currentAccount ? props.currentAccount : "Connect"} 
          </Button>
      </div>
  );
}
  
export default Wallet;