import React, { Component } from "react";
import getWeb3, { getGanacheWeb3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";
import CounterUI from "./components/Counter/index.js";
import Wallet from "./components/Wallet/index.js";
import Project from "./components/Project/index.js";  // Load Project components
import Instructions from "./components/Instructions/index.js";
import { Loader, Button } from 'rimble-ui';

import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';

import styles from './App.module.scss';

class App extends Component {
  // state = {
  //   storageValue: 0,
  //   web3: null,
  //   accounts: null,
  //   contract: null,
  //   proposer_name: "",
  //   proposer_address: "",
  //   route: window.location.pathname.replace("/","")
  // };

  constructor(props) {
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      route: window.location.pathname.replace("/",""),

      /////// Added state
      proposer_name: '',
      //proposer_address: ''
      proposer_address: '0x50ab3d146401766a4b767c1fd3cd090cfd53aac0'
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleInputProposerAddress = this.handleInputProposerAddress.bind(this)
    this.send = this.send.bind(this);
  }


  ////// New
  // handleInput(event) {
  //   let value = event.target.value; 
  //   this.setState({ value: value });  // { "value": value } 
  // }

  ////// Oridinal
  handleInput({ target: { value } }) {
    this.setState({ value });  // { "value": value } 
    console.log("handleInput called!");
    console.log("=== [handleInput]： value ===", value);
  }


  handleInputProposerAddress({ target: { valueOfProposerAddress } }) {
    this.setState({ valueOfProposerAddress });
    console.log("=== [handleInputProposerAddress]： valueOfProposerAddress ===", valueOfProposerAddress); 
  }


  send = async (_proposerName, _proposerAddress) => {
    const { project, accounts, value, valueOfProposerAddress } = this.state;
    //const address = "0x51a3f1892fd8666bba10a610b6b1ed6397f0d313"   // Replace constant with variable of valueOfProposerAddress
    this.setState({
      value: '',
      valueOfProposerAddress: '',
      proposer_name: value,
      proposer_address: valueOfProposerAddress
      //proposer_address: address
    });
    console.log("send called!");
    console.log("=== valueOfProposerAddress ===", valueOfProposerAddress)   // Result: undefined

    const response = await project.methods.createProposer(this.state.proposer_name, this.state.proposer_address).send({ from: accounts[0] })
    //const response = await project.methods.createProposer(this.state.proposer_name, address).send({ from: accounts[0] })
    console.log('=== response of createProposer function ===', response);

    // Update state with the result.
    this.setState({ proposer_name: value });
    this.setState({ proposer_address: valueOfProposerAddress });
    //this.setState({ proposer_address: address });
  }  


  // send() {
  //   const { value } = this.state;
  //   this.setState({
  //     value: '',
  //     proposer_name: value,
  //     proposer_address: ''
  //   });
  //   console.log("send called!");
  // }  



  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
    let Counter = {};
    let Wallet = {};
    let Project = {};
    try {
      // Counter = require("../../contracts/Counter.sol");
      // Wallet = require("../../contracts/Wallet.sol");
      // Project = require("../../contracts/Propose.sol");
      Counter = require("./contracts/Counter.json");
      Wallet = require("./contracts/Wallet.json");
      Project = require("./contracts/Propose.json");  // Load ABI of contract of ContactNotebook
    } catch (e) {
      console.log(e);
    }
    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];
        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');
        let instance = null;
        let instanceWallet = null;
        let instanceProject = null;
        let deployedNetwork = null;
        if (Counter.networks) {
          deployedNetwork = Counter.networks[networkId.toString()];
          if (deployedNetwork) {
            instance = new web3.eth.Contract(
              Counter.abi,
              deployedNetwork && deployedNetwork.address,
            );
            //console.log('=== instance ===', instance);
          }
        }
        if (Wallet.networks) {
          deployedNetwork = Wallet.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceWallet = new web3.eth.Contract(
              Wallet.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if (Project.networks) {
          deployedNetwork = Project.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceProject = new web3.eth.Contract(
              Project.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceProject ===', instanceProject);
          }
        }
        if (instance || instanceWallet || instanceProject) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, contract: instance, wallet: instanceWallet, project: instanceProject }, () => {
              this.refreshValues(instance, instanceWallet, instanceProject);
              setInterval(() => {
                this.refreshValues(instance, instanceWallet, instanceProject);
              }, 5000);
            });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshValues = (instance, instanceWallet, instanceProject) => {
    if (instance) {
      this.getCount();
    }
    if (instanceWallet) {
      this.updateTokenOwner();
    }
    if (instanceProject) {
      console.log('Title');
    }
  }

  getCount = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCounter().call();
    // Update state with the result.
    this.setState({ count: response });
  };

  updateTokenOwner = async () => {
    const { wallet, accounts } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await wallet.methods.owner().call();
    // Update state with the result.
    this.setState({ tokenOwner: response.toString() === accounts[0].toString() });
  };

  createProposer = async (_proposerName, _proposerAddress) => {
    const { project, accounts } = this.state;
    const response = await project.methods.createProposer(_proposerName, _proposerAddress).send({ from: accounts[0] })
    console.log('=== response of createProposer function ===', response);

    // Update state with the result.
    this.setState({ proposer_name: _proposerName });
    this.setState({ proposer_address: _proposerAddress });
  }

  /**************** Original send finction *****************/
  // send = async (_proposerName, _proposerAddress) => {
  //   const { project, accounts, value, valueOfProposerAddress } = this.state;
  //   //const address = "0x51a3f1892fd8666bba10a610b6b1ed6397f0d313"   // Replace constant with variable of valueOfProposerAddress
  //   this.setState({
  //     value: '',
  //     valueOfProposerAddress: '',
  //     proposer_name: value,
  //     proposer_address: valueOfProposerAddress
  //     //proposer_address: address
  //   });
  //   console.log("send called!");
  //   console.log("=== valueOfProposerAddress ===", valueOfProposerAddress)   // Result: undefined

  //   const response = await project.methods.createProposer(this.state.proposer_name, this.state.proposer_address).send({ from: accounts[0] })
  //   //const response = await project.methods.createProposer(this.state.proposer_name, address).send({ from: accounts[0] })
  //   console.log('=== response of createProposer function ===', response);

  //   // Update state with the result.
  //   this.setState({ proposer_name: value });
  //   this.setState({ proposer_address: valueOfProposerAddress });
  //   //this.setState({ proposer_address: address });
  // }  

  createProposal = async (_proposalBy, _proposalTitle, _proposalContent) => {
    const { project, accounts } = this.state;
    const response = await project.methods.createProposal(_proposalBy, _proposalTitle, _proposalContent).send({ from: accounts[0] })
    console.log('=== response of createProposal function ===', response);

    // Update state with the result.
    this.setState({ proposal_by: _proposalBy });
    this.setState({ proposal_title: _proposalTitle });
    this.setState({ proposal_content: _proposalContent });
  }

  getNumberOfTotalProposer = async () => {
    const { project } = this.state;
    //const response = 0;
    
    // try {
    //     const response = await project.methods.getNumberOfTotalProposer().call();
    // } catch {
    //     console.log('null');
    // }
    const response = await project.methods.getNumberOfTotalProposer().call();
    console.log('=== response of getNumberOfTotalProposer function ===', response);

    // Update state with the result.
    this.setState({ number_of_total_proposer: response });
  };  

  increaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.increaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  decreaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.decreaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  renounceOwnership = async (number) => {
    const { accounts, wallet } = this.state;
    await wallet.methods.renounceOwnership().send({ from: accounts[0] });
    this.updateTokenOwner();
  };

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name={instructionsKey} accounts={this.state.accounts} />
      </div>
    );
  }

  renderBody() {
    const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = this.state;
    const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled) ? "upgrade-auto" : "upgrade";
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
        {this.state.web3 && !this.state.contract && (
          this.renderDeployCheck('counter')
        )}
        {this.state.web3 && this.state.contract && (
          <div className={styles.contracts}>
            <h1>Counter Contract is good to Go!</h1>
            <p>Interact with your contract on the right.</p>
            <p> You can see your account onfo on the left </p>
            <div className={styles.widgets}>
              <Web3Info {...this.state} />
              <CounterUI
                decrease={this.decreaseCount}
                increase={this.increaseCount}
                {...this.state} />
            </div>
            {this.state.balance < 0.1 && (
              <Instructions
                ganacheAccounts={ganacheAccounts}
                name="metamask"
                accounts={accounts} />
            )}
            {this.state.balance >= 0.1 && (
              <Instructions
                ganacheAccounts={this.state.ganacheAccounts}
                name={updgradeCommand}
                accounts={accounts} />
            )}
          </div>
        )}
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="setup" accounts={this.state.accounts} />
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className={styles.wrapper}>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="faq" accounts={this.state.accounts} />
      </div>
    );
  }

  renderEVM() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.wallet && (
        this.renderDeployCheck('evm')
      )}
      {this.state.web3 && this.state.wallet && (
        <div className={styles.contracts}>
          <h1>Wallet Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account onfo on the left </p>
          <div className={styles.widgets}>
            <Web3Info {...this.state} />
            <Wallet
              renounce={this.renounceOwnership}
              {...this.state} />
          </div>
          <Instructions
            ganacheAccounts={this.state.ganacheAccounts}
            name="evm" accounts={this.state.accounts} />
        </div>
      )}
      </div>
    );
  }

  renderProject() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.project && (
        this.renderDeployCheck('project')
      )}
      {this.state.web3 && this.state.project && (
        <div className={styles.contracts}>
          <h1>Project Contract is good to Go!</h1>
          <div className={styles.widgets}>
            <Project
              getNumberOfTotalProposer={this.getNumberOfTotalProposer}
              createProposer={this.createProposer}
              createProposal={this.createProposal}
              {...this.state} />
          </div>

          <div className={styles.widgets}>
            <p>Proposer name</p>
            <input type="text" value={this.state.value} onChange={this.handleInput} />

            <p>Proposer address</p>
            <input type="text" value={this.state.valueOfProposerAddress} onChange={this.handleInputProposerAddress} />
            {/*  <input type="text" value={this.state.address} onChange={this.handleInputProposerAddress} /> */}

            <Button onClick={this.send}>SEND</Button>
          </div>



          
          <div className={styles.widgets}>
            <form onSubmit={this.send}>
              <p>Proposer name</p>
              <input type="text" value={this.state.value} onChange={this.handleInput} />

              <p>Proposer address</p>
              <input type="text" value={this.state.valueOfProposerAddress} onChange={this.handleInputProposerAddress} />
              {/*  <input type="text" value={this.state.address} onChange={this.handleInputProposerAddress} /> */}

              <Button><input type="submit" value="Submit" /></Button>
            </form>
          </div>

        </div>
      )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'counter' && this.renderBody()}
          {this.state.route === 'evm' && this.renderEVM()}
          {/* {this.state.route === 'faq' && this.renderFAQ()} */}
          {this.state.route === 'project' && this.renderProject()}
        <Footer />
      </div>
    );
  }
}

export default App;
