const HDWalletProvider = require('truffle-hdwallet-provider');

// https://developers.skalelabs.com for SKALE documentation
// Provide your wallet private key
const privateKey = 'PRIVATE-KEY';

// Provide your SKALE endpoint address
const skale = 'http://ethboston0.skalenodes.com:10200';

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 8545,
      network_id: '6738',
      gasPrice: 0,
    },
    ganache: {
      host: 'ganache',
      port: 8545,
      network_id: '333',
      gasPrice: 0,
    },
    skale: {
      provider: () => new HDWalletProvider(privateKey, skale),
      gasPrice: 0,
      network_id: '*',
    },
  },
};
