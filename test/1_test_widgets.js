const Widgets = artifacts.require('Widgets.sol')

contract('Widgets', (accounts) => {
    it('Get accounts', async () => {
        const accounts = await web3.eth.getAccounts();

        // Debug
        console.log('=== accounts ===', accounts);
        console.log('=== accounts[0] ===', accounts[0]);
    })


    it('Execute getWidgetsLength function', async () => {
        const contract = await new web3.eth.Contract(Widgets.abi, Widgets.address);
        response = await contract.methods.getWidgetsLength().call();

        // Debug
        console.log('=== response of getWidgetsLength functio ===', response);  // Result: OK
    })


    
})
