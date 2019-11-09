const Web3 = require("web3");
const truffleContract = require("truffle-contract");
const $ = require("jquery");
// Not to forget our built contract
const splitterJson = require("../../build/contracts/Splitter.json");
require("file-loader?name=../index.html!../index.html");

if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); 
}

const Splitter = truffleContract(splitterJson);
Splitter.setProvider(web3.currentProvider);

window.addEventListener('load', function() {
    return web3.eth.getAccounts()
        .then(accounts => {
            if (accounts.length == 0) {
                $("#balance").html("N/A");
                throw new Error("No account with which to transact");
            }
            window.account = accounts[0];
            console.log("Account:", window.account);
            return web3.eth.net.getId();
        })
        .then(network => {
            console.log("Network:", network.toString(10));
            return Splitter.deployed();
        })
        .then(deployed =>{
			return web3.eth.getBalance(window.account);		
		})
        // Notice how the conversion to a string is done only when displaying.
        .then(balance => $("#balance").html(balance.toString(10)))
		
        .then(network => {
            return Splitter.deployed();
        })
        .then(deployed => {
			return web3.eth.getBalance(deployed.address);
		})		
        // Notice how the conversion to a string is done only when displaying.
        .then(balance => {
			console.log("Account Balance", balance);
			$("#balance2").html(balance.toString(10));
			
		})
		
        // Never let an error go unlogged.
        .catch(console.error);
});
  