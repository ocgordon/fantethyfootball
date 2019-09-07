import { getContractWithSigner, getContract } from '../ethers';

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

export const assignPoints = async (user, points) => {
  try {
    const contract = await getContractWithSigner('0xf17f52151ebef6c7334fad080c5704d77216b732');
    const pointsDistributed = await contract.distributePoints(user, points);
    return pointsDistributed;
  } catch (e) {
    return new Error(e);
  }
};

export const getPoints = async user => {
  try {
    const contract = await getContractWithSigner('0xf17f52151ebef6c7334fad080c5704d77216b732');
    const pointsDistributed = await contract.userPoints(user);
    return pointsDistributed;
  } catch (e) {
    return new Error(e);
  }
};

export const getAllPoints = async () => {
  try {
    const users = [
      '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
      '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
      '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',
    ];
    const contract = await getContract();
    const allPoints = [];
    for (let i = 0; i < 4; i++) {
      const pointsDistributed = await contract.userPoints(users[i]);
      allPoints.push(pointsDistributed);
      console.log(allPoints);
    }
    return allPoints;
  } catch (e) {
    return new Error(e);
  }
};
