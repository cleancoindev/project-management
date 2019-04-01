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
        console.log('=== response of getWidgetsLength function ===', response);  // Result: OK
    })


    it('Execute getWidget function', async () => {
        const contract = await new web3.eth.Contract(Widgets.abi, Widgets.address);
        response = await contract.methods.getWidget(0).call();

        // Debug
        console.log('=== response of getWidget function ===', response);  // Result: OK
    })



    // _addr = accounts[1]
    // _addr = str(accounts[1])
    //_addr = "0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b"
    it('Execute addWidget function', async (_addr) => {
        //const accounts = await web3.eth.getAccounts();
        //_addr = accounts[1]

        const contract = await new web3.eth.Contract(Widgets.abi, Widgets.address);
        response = await contract.methods.addWidget("0x3e08b4eca537b3908bd40dc9d2d1c60bc52a552b").send({ from: accounts[0] });
        //response = await contract.methods.addWidget(_addr).send({ from: accounts[0] });

        // Debug
        console.log('=== response of addWidget function ===', response);  // Result: OK
    })

})
