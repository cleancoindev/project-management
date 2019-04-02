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
        //response = await contract.methods.getNumberOfTotalProposal().call();

        // Debug
        console.log('=== response of getNumberOfTotalProposer function ===', response);  // Result: OK
    })



    // Successful
    contactName = "Taro Suzuki"
    contactAddress = "0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b"

    it('Execute createContact function', async (_contactName=contactName, _contactAddress=contactAddress) => {
        const accounts = await web3.eth.getAccounts();

        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        //response = await contract.methods.createContact("鈴木", "0x46eE041Dc142117FD9a9D1011178Df5066e29d42").send({ from: accounts[0] })
        response = await contract.methods.createContact(contactName, contactAddress).send({ from: accounts[0] });
        // Debug
        console.log('=== response of createContact function ===', response);  // Result: OK
    })



    // Successful
    //proposerId = 0
    proposerName = "Taro Suzuki"
    proposerAddress = "0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b"
    //content = "This is test for createProposal contract"

    it('Execute createProposer function', async (_proposerName=proposerName, _proposerAddress=proposerAddress) => {
    //it('Execute createProposal function', async (_proposerName=proposerName, _proposerAddress=proposerAddress) => {
        const accounts = await web3.eth.getAccounts();

        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        response = await contract.methods.createProposer(proposerName, proposerAddress).send({ from: accounts[0] });
        //response = await contract.methods.createProposal(proposerName, proposerAddress).send({ from: accounts[0] });

        // Debug
        console.log('=== response of createProposer function ===', response);  // Result: OK
    })


    // Successful
    proposerName = "Taro Suzuki"
    proposerAddress = "0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b"
    it('Execute saveProposer function', async (_proposerName=proposerName, _proposerAddress=proposerAddress) => {
        const accounts = await web3.eth.getAccounts();

        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        response_1 = await contract.methods.createProposer(proposerName, proposerAddress).send({ from: accounts[0] });
        //response_1 = await contract.methods.createProposal(proposerName, proposerAddress).send({ from: accounts[0] });

        //proposerId = 0
        proposerId = await contract.methods.getProposerId().call();
        //proposerId = await contract.methods.getProposalId().call();
        console.log('=== response of getProposerId function ===', proposerId);  // Result: OK
        
        response_2 = await contract.methods.saveProposer(proposerId).send({ from: accounts[0] });
        //response_2 = await contract.methods.saveProposal(proposerId).send({ from: accounts[0] });
        console.log('=== response of saveProposer function ===', response_2);  // Result: OK
    })
})
