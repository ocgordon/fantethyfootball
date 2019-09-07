import { getContractWithSigner } from '../ethers';

export const addPlayersToTeam = async (user, player) => {
  try {
    const contract = await getContractWithSigner('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
    const receipt = await contract.addPlayersToTeam(user, player);
    return receipt;
  } catch (e) {
    console.log(e);
    return new Error(e);
  }
};

export const getPlayersOnTeam = async user => {
  try {
    const contract = await getContractWithSigner('0x627306090abab3a6e1400e9345bc60c78a8bef57');
    const footballTeam = await contract.getFootballTeam(user);
    return footballTeam;
  } catch (e) {
    return new Error(e);
  }
};

export const assignPoints = async user => {
  try {
    const contract = await getContractWithSigner('0x627306090abab3a6e1400e9345bc60c78a8bef57');
    const pointsDistributed = await contract.distributePoints(user);
    return pointsDistributed;
  } catch (e) {
    return new Error(e);
  }
};

export const getPoints = async user => {
  try {
    const contract = await getContractWithSigner('0x627306090abab3a6e1400e9345bc60c78a8bef57');
    const pointsDistributed = await contract.userPoints(user);
    return pointsDistributed;
  } catch (e) {
    return new Error(e);
  }
};
