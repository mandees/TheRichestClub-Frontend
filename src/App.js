import logo from './logo.svg';
import mineImage from './mine.jpg';
import tanzanite from './yellow_gem.gif';

import Wallet from './components/Wallet';
import Club from './components/Club';
import Store from './components/Store';
import Profile from './components/Profile';
import StatusDisplay from './components/StatusDisplay';
import 'semantic-ui-css/semantic.min.css';
import { Divider, Menu, Image,  Header, Icon, Transition, Button, Popup } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import Levels from './app-logic/Levels';


import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import TheRichestClubAbi from './ethereum/TheRichestClubAbi';


function App() {
  
  const contractAddress = "0x5016C4e96C33095bfB0128D18aDd22d6e47C285C";

  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentAccountLong, setCurrentAccountLong] = useState(null);
  const [status, setStatus] = useState('Rust');
  const [clubName, setClubName] = useState(null);
  const [clubMembers, setClubMembers] = useState([]);
  const [percentage, setPercentage] = useState("90%");
  const [showStore, setShowStore] = useState(false);
  //const [profile, setProfile] = useState(null);

  let provider = null;
  let web3 = null;
  let theRichestClub = null; 

  const setupWallet = async function () {
    if (provider == null)
    {
      console.log("Setting up wallet");
      
      provider = await detectEthereumProvider();
      if (provider)
        {
          //console.log(provider);
          web3 = new Web3(provider);
          theRichestClub = new web3.eth.Contract(TheRichestClubAbi, contractAddress)
        }
    }
  };

  const handleAccountsChanged = function (accounts) {
    
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } 
    else if (accounts[0] !== currentAccount) 
    {
      let shortenedAccount = accounts[0].substring(0, 6) + '...' + accounts[0].substring(accounts[0].length - 4, accounts[0].length);
      setCurrentAccount(shortenedAccount);
      setCurrentAccountLong(accounts[0]);
      
      updateStatus(accounts[0]);

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
  }

  const getData = async function (senderAddress) {
    const status = await theRichestClub.methods.getStatus().call({ from: senderAddress})
    
    //const status = await theRichestClub.methods.status('0x616af430C365e4E3fA3821B93759EC5a084e4eE7').call()
    let level = Levels[parseInt(status)];
    return [level.percentage, level.name];
  }
  
  const getClubData = async function(senderAddress) {
    //const clubData = await theRichestClub.methods.clubs('0x169bb6bc11facb627bddefe4121c0d3808aa2384').call()
    if (senderAddress != null) {
      const clubData = await theRichestClub.methods.clubs(senderAddress).call()
      if (clubData.exists)
      {
        setClubName(clubData.name);
        setClubMembers(clubData.members);
        //console.log(clubData);  
      }
    }
  }

  const updateStatus = async (senderAddress) => {
    let [percentage, status] = await getData(senderAddress); 
    getClubData(senderAddress);
    
    setStatus(status);
    //setClubName(clubName);
    
    setPercentage(percentage);
  }

  setupWallet();
  
  const toggleShowStore = () => {
    setShowStore(!showStore);
  }

  const onBuyFunction = async (level, price) => {
    console.log(`Buy for ${price} ETH`);

    let gasEstimate = Math.trunc(await theRichestClub.methods.acquireStatus(level).estimateGas({
      from: currentAccountLong,
      value: price * (10 ** 18) // weis
    }
    ) * 1.62);

    const gasPrice = await web3.eth.getGasPrice();

    const result = await theRichestClub.methods.acquireStatus(level).send({
        from: currentAccountLong,
        gas: gasEstimate,
        gasPrice: gasPrice, 
        value: price * (10 ** 18) // weis
    });
    
    if (result)
    {
      updateStatus(currentAccountLong);
      console.log(result);  
    }
  }


  return (
    <div className="App">
        <Menu >
          <Menu.Item position="left">
            <Header as="a" href="/" color="purple" icon="gem" size="medium" content="The Richest's Club" />
            
          </Menu.Item>
          <Menu.Menu >
          <Menu.Item floated position="right">
            <Profile color="purple" icon="user"/>
          </Menu.Item >
          <Menu.Item position="right">
            <Wallet currentAccount={currentAccount} onToggleConnect={toggleConnect}/>
          </Menu.Item>
          </Menu.Menu>
        </Menu>

        <StatusDisplay percentage={percentage} status={status} logo={mineImage} gem={tanzanite} />
        <Divider hidden />
        <Button inverted color="purple" onClick={toggleShowStore}>Redeem a higher status</Button>
        <Store onBuy={onBuyFunction} show={showStore}/>
        <Divider hidden/>
        <Divider />
        <Divider hidden/>

        <Club name={clubName} members={clubMembers} />
        <Divider hidden/>
        <Divider />
        <Divider hidden/>
        
       
    </div>
  );
}

export default App;
