const Propose = artifacts.require('Propose.sol')

contract('Propose', (accounts) => {
    it('Get accounts', async () => {
        const accounts = await web3.eth.getAccounts();

        // Debug
        console.log('=== accounts ===', accounts);
        console.log('=== accounts[0] ===', accounts[0]);
    })


    it('Execute getNumberOfTotalProposalh function', async () => {
        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        response = await contract.methods.getNumberOfTotalProposal().call();

        // Debug
        console.log('=== response of getNumberOfTotalProposal function ===', response);  // Result: OK
    })



    _proposerId = 1
    _proposerAddress = 0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b
    _name = "Taro Suzuki"
    _content = "This is test for createProposal contract"

    it('Execute createProposal function', async (_proposerId, _proposerAddress, _name, _content) => {
        const accounts = await web3.eth.getAccounts();

        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);
        response = await contract.methods.createProposal(_proposerId, _proposerAddress, _name, _content).send({ from: accounts[0] });

        // Debug
        console.log('=== response of createProposal function ===', response);  // Result: OK
    })

})
