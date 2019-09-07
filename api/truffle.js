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
  },
};
