import { ethers, utils } from 'ethers';
import { BigNumber } from 'ethers/utils';
import { removeNumericKeys } from 'dapp-utils';
import Fantethy from './contracts/Fantethy.json';

let instance = null;

/**
 * Returns the default provider.
 *
 * @return {ethers.providers.JsonRpcProvider} - Provider instance.
 */
export const getProvider = () => {
  if (instance) return instance;
  instance = new ethers.providers.JsonRpcProvider(process.env.WEB3_PROVIDER);
  return instance;
};

/**
 * Returns a wallet using the given address.
 *
 * @param {String} address - Eth address of wallet.
 * @return {ethers.Wallet} - Wallet instance.
 */
export const getWallet = address => {
  if (!address) throw new ReferenceError('No address provided for getWallet');
  const provider = getProvider();
  return new ethers.Wallet(address, provider);
};

/**
 * Returns a signer using the given address.
 *
 * @param {String} address - Address of signer (i.e., the sender of the transaction).
 */
export const getSigner = address => {
  if (!address) throw new ReferenceError('No address provided for getSigner');
  const provider = getProvider();
  return provider.getSigner(address);
};

/**
 * Sends a signed transaction.
 *
 * @param {Object} signedTransaction - Signed, unsent transaction.
 * @returns {Object} - Receipt
 */
export const sendSignedTransaction = async signedTransaction => {
  const provider = getProvider();
  const transaction = await provider.sendTransaction(signedTransaction);
  return provider.getTransactionReceipt(transaction.hash);
};

/**
 * Deploy a contract and returns its receipt.
 *
 * @param {String} contractJson - Compiled contract JSON.
 * @param {String} account - Account deploying from.
 * @returns {Object} - Receipt
 */
export const deployContract = async (contractJson, account) => {
  const wallet = getWallet(account);

  const factory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
  const contract = await factory.deploy();
  const receipt = await contract.deployed();
  return receipt;
};

/**
 * Create an unsigned transaction to deploy a contract.
 *
 * @param {Object} contractJson - Compiled contract JSON.
 * @param {Array} args - Arguments for the contract constructor.
 * @returns {Object} Unsigned transaction.
 */
export const getUnsignedContractDeployment = (contractJson, args = []) => {
  const factory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode);

  const transaction = factory.getDeployTransaction(...args);
  return transaction.data;
};

export const getContractWithAddress = account => {
  let obt = null;

  try {
    console.log(Object.keys(Fantethy.networks)[0]);

    const { address } = Fantethy.networks[Object.keys(Fantethy.networks)[0]];

    const provider = getProvider();
    obt = new ethers.Contract(address, Fantethy.abi, provider);

    const signer = getSigner(account);

    const contractWithSigner = obt.connect(signer);
    return contractWithSigner;
  } catch (e) {
    console.log('Failed to instantiate compiled contract', e);
  }
  return obt;
};

export const getContract = () => {
  let obt = null;

  try {
    const { address } = Fantethy.networks[Object.keys(Fantethy.networks)[0]];

    const provider = getProvider();
    obt = new ethers.Contract(address, Fantethy.abi, provider);
  } catch (e) {
    console.log('Failed to instantiate compiled contract', e);
  }
  return obt;
};

/**
 * Gets the existing contract of a given type on the network, with a signer.
 * Required for state-changing functions.
 *
 * @throws {ReferenceError} If contract doesn't exist, throws an exception.
 *
 * @param {String} contractJson - Compiled contract JSON.
 * @param {String} address - Contract address.
 * @param {String} account - Account of signer (i.e., the sender of transactions).
 * @return {ethers.Contract} - Returns contract object.
 */
export const getContractWithSigner = account => {
  const contractJson = Fantethy;
  const { address } = Fantethy.networks[Object.keys(Fantethy.networks)[0]];
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(address, contractJson.abi, provider);
    const signer = getSigner(account);
    const contractWithSigner = contract.connect(signer);
    return contractWithSigner;
  } catch (e) {
    console.log('Failed to instantiate compiled contract', e);
  }
  return null;
};

/**
 * Converts any BigNumbers in an object to numbers.
 *
 * @param {Object} object - Object to parse.
 * @returns {Object} Object with converted BigNumbers.
 */
export const parseBigNumbers = object => {
  const output = Object.assign({}, object);
  const entries = Object.entries(output);
  entries.forEach(([key, value]) => {
    if (value instanceof BigNumber) {
      output[key] = value.toNumber();
    }
  });
  return output;
};

/**
 * Abstraction for getting events from ethers. Returns human readable events.
 *
 * @param {ethers.Contract} contract - ethers contract instance.
 * @param {Object} options
 * @param {Number} options.from - Block to query from.
 * @param {Number|String} options.to - block to query to.
 * @param {String} options.topics - name of event as it appears in the contract (i.e., 'Transfer').
 * @returns {Array} - Array of events.
 */
export const getEvents = async options => {
  const contract = getContract();

  // To start a listener:
  // const filter = contract.filters.Transfer(null, '0x627306090abab3a6e1400e9345bc60c78a8bef57');

  // // Listen for our filtered results
  // contract.on(filter, (from, to, value) => {
  //   console.log(`I received ${value.toString()} tokens from ${from}`);
  // });

  const { fromBlock = 0, toBlock = 'latest', topics, from, to, tokenId } = options;

  const provider = getProvider();

  const parsedTopic = topics ? ethers.utils.id(contract.interface.events[topics].signature) : null;

  const events = await provider.getLogs({
    fromBlock,
    toBlock,
    address: contract.address,
    topics: [parsedTopic, from, to, tokenId],
  });

  const parsedEventData = events.map(log => contract.interface.parseLog(log));

  const combinedEventData = events.map((event, index) => ({
    ...event,
    name: parsedEventData[index].name,
    values: parsedEventData[index].values,
  }));

  const output = combinedEventData.map(event => ({
    ...event,
    values: removeNumericKeys(event.values),
  }));

  return output;
};
