const Propose = artifacts.require('Propose.sol')

contract('Propose', (accounts) => {

    it('Execute budgetStatus function', async () => {
        const accounts = await web3.eth.getAccounts();
        const contract = await new web3.eth.Contract(Propose.abi, Propose.address);

        const _proposalId = 0;  // for test number
        const response = await contract.methods.budgetStatus(_proposalId).call();
        //const event = response.events.CreateAskingPriceOfBudget.returnValues.askingPriceOfBudget;

        console.log('=== response of budgetStatus function ===', response);  // Result: OK
        //console.log('=== Check event value of createAskingPriceOfBudget function ===', event);  // Result: OK
    })

})
