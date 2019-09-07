import { getProvider } from '../ethers';

let addresses = null;

/**
 * Gets accounts by index
 * @param {Number} accountNumber
 */
export const getAccounts = async () => {
  const provider = getProvider();
  if (!addresses) addresses = await provider.listAccounts();
  return addresses;
};

/**
 * Gets usernames with address
 * @param {String} address
 */
export const getUsers = async () => {
  if (!addresses) addresses = await getAccounts();
  const accounts = [
    { name: 'Creator1', address: addresses[0] },
    { name: 'Creator2', address: addresses[1] },
    { name: 'Creator3', address: addresses[2] },
    { name: 'Approver1', address: addresses[3] },
    { name: 'Approver2', address: addresses[4] },
    { name: 'Unapproved1', address: addresses[5] },
    { name: 'Unapproved2', address: addresses[6] },
  ];

  return accounts;
};
