const Fantethy = artifacts.require('./Fantethy.sol');

module.exports = async deployer => {
  try {
    await deployer.deploy(Fantethy);
  } catch (e) {
    console.log(`error in deployment: ${e}`);
  }
};
