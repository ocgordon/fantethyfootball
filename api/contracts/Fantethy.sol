pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Fantethy {

    // Keeping a count of the users
    address[] public users = [
        0x627306090abaB3A6e1400e9345bC60c78a8BEf57,
        0xf17f52151EbEF6C7334FAD080c5704D77216b732,
        0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef,
        0x821aEa9a577a9b44299B9c15c88cf3087F3b5544
    ];

    mapping(address => string[]) public footballPlayers;

    function getAllUsers() public view returns(address[] memory) {
        return users;
    }

    function addPlayersToTeam(address userAccount, string memory footballPlayer) public returns(bool) {
        //uint teamLength = footballPlayers[user].length;
        footballPlayers[userAccount].push(footballPlayer);
        return true;
    }

    function getFootballTeam(address user) public view returns(string[] memory) {
        uint teamLength = footballPlayers[user].length;
        string[] memory players = new string[](teamLength);
        for (uint i = 0; i < teamLength; i++) {
            players[i] = footballPlayers[user][i];
        }
        return players;
    }
}
