const Widgets = artifacts.require('Widgets.sol')

contract('Widgets', (accounts) => {
    it('should be tested', async () => {
        const accounts = await web3.eth.getAccounts();

        console.log('=== accounts ===', accounts);
        console.log('=== accounts[0] ===', accounts[0]);
    })
})
