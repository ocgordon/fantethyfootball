import { getContractWithSigner, getContract } from '../ethers';

export const addPlayersToTeam = async (user, player) => {
  try {
    const contract = await getContractWithSigner('0xdc3821270026617A3c712f04df9e891c925A1d42');
    const receipt = await contract.addPlayersToTeam(user, player);
    return receipt;
  } catch (e) {
    console.log(e);
    return new Error(e);
  }
};

export const getPlayersOnTeam = async user => {
  try {
    const contract = await getContract();
    const footballTeam = await contract.getFootballTeam(user);
    return footballTeam;
  } catch (e) {
    return new Error(e);
  }
};

export const assignPoints = async user => {
  try {
    const contract = await getContractWithSigner('0xdc3821270026617A3c712f04df9e891c925A1d42');
    const pointsDistributed = await contract.distributePoints(user);
    return pointsDistributed;
  } catch (e) {
    return new Error(e);
  }
};

export const getPoints = async user => {
  try {
    const contract = await getContractWithSigner('0xdc3821270026617A3c712f04df9e891c925A1d42');
    const pointsDistributed = await contract.userPoints(user);
    return pointsDistributed;
  } catch (e) {
    return new Error(e);
  }
};
