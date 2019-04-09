const Propose = artifacts.require('Propose.sol')

contract('Propose', (accounts) => {
    it('Get accounts', async () => {
        const accounts = await web3.eth.getAccounts();

        // Debug
        console.log('=== accounts ===', accounts);
        console.log('=== accounts[0] ===', accounts[0]);
    })


    it('Execute getNumberOfTotalProposer function', async () => {
        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        response = await contract.methods.getNumberOfTotalProposer().call();

        // Debug
        console.log('=== response of getNumberOfTotalProposer function ===', response);  // Result: OK
    })


    // Successful
    //proposerId = 0
    const proposerName = "Taro Suzuki"
    const proposerAddress = "0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b"
    // proposalTitle = "This is proposalTitle"
    // proposalContent = "This is proposalContent"

    it('Execute createProposer function', async (_proposerName=proposerName, _proposerAddress=proposerAddress) => {
        const accounts = await web3.eth.getAccounts();

        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        //response = await contract.methods.createProposer(proposerName, proposerAddress, proposalTitle, proposalContent).send({ from: accounts[0] });
        response = await contract.methods.createProposer(proposerName, proposerAddress).send({ from: accounts[0] });

        // Debug
        console.log('=== response of createProposer function ===', response);  // Result: OK
    })

    // Successful
    it('Execute saveProposer function', async (_proposerName=proposerName, _proposerAddress=proposerAddress) => {
        const accounts = await web3.eth.getAccounts();

        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        //response_1 = await contract.methods.createProposer(proposerName, proposerAddress, proposalTitle, proposalContent).send({ from: accounts[0] });
        response_1 = await contract.methods.createProposer(_proposerName, _proposerAddress).send({ from: accounts[0] });

        //proposerId = 0
        proposerId = await contract.methods.getProposerId().call();
        console.log('=== response of getProposerId function ===', proposerId);  // Result: OK
        
        response_2 = await contract.methods.saveProposer(proposerId).send({ from: accounts[0] });
        console.log('=== response of saveProposer function ===', response_2);  // Result: OK
    })


    // Successful
    const proposerId = 1
    it('Execute getProposer function', async (_proposalId=proposerId) => {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
      const response = await contract.methods.getProposer(_proposalId).send({ from: accounts[0] });

      // Debug
      console.log('=== response of getProposer function ===', response); 
    });



    // Fail
    const proposalBy = "0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b"
    const proposalTitle = "This is proposalTitle"
    const proposalContent = "This is proposalContent"

    it('Execute createProposal function', async (_proposalBy=proposalBy, _proposalTitle=proposalTitle, _proposalContent=proposalContent) => {
  
        const accounts = await web3.eth.getAccounts();
        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        const response = await contract.methods.createProposal(_proposalBy, _proposalTitle, _proposalContent).send({ from: accounts[0] });
        //const response = await contract.methods.createProposal("0xfed9ead1d8b7d7e7563903c3120c9b58e5c5d5aa", "This is proposalTitle", "This is proposalContent").send({ from: accounts[0] });

        // Debug
        console.log('=== response of createProposal function ===', response);  // Result: OK
    })

    // Fail
    it('Execute saveProposal function', async (_proposalBy=proposalBy, _proposalTitle=proposalTitle, _proposalContent=proposalContent) => {
        const accounts = await web3.eth.getAccounts();
        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        //const response = await contract.methods.createProposal("テスト", "テスト").send({ from: accounts[0] });
        const response_1 = await contract.methods.createProposal(_proposalBy, _proposalTitle, _proposalContent).send({ from: accounts[0] });

        const _proposalId = await contract.methods.getProposalId().call();
        //const _proposalId = 0
        console.log('=== response of getProposalId function ===', _proposalId);  // Result: OK


        const response_2 = await contract.methods.saveProposal(_proposalId).send({ from: accounts[0] });

        // Debug
        console.log('=== response of saveProposal function ===', response_2);  // Result: OK
    })




})
