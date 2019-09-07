const HDWalletProvider = require('truffle-hdwallet-provider');

// https://developers.skalelabs.com for SKALE documentation
// Provide your wallet private key
const privateKey = '810E2F025713EB18C22B05AA2833A045ABFD7247B56082D131898FD0A9FF33C0';

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
