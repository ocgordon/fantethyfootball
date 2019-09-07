import React, { useState, useEffect } from 'react';
import { Grid, List, Image, Button } from 'semantic-ui-react';
import { getRequest, addPlayers } from '../api';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';

// const torusFunction = async () => {
//   // const torus = new Torus();
//   // await torus.init();
//   // await torus.ethereum.enable()
//   // const web3 = new Web3(torus.provider);
//   // Start using web3 in your dapp
//   // window.torus = torus;
//   // window.ethereum = web3;
//   // web3.personal.unlockAccount("0x9ac74414d8363ae73300ae62e69c80e217b56d50", 'pass');
//   // const toAddress = "0xdc3821270026617A3c712f04df9e891c925A1d42"
//   // const amount = .1; //willing to send 2 ethers
//   // const amountToSend = web3.toWei(amount, "ether"); //convert to wei value
//   // var send = web3.eth.sendTransaction({from:"0x9ac74414d8363ae73300ae62e69c80e217b56d50",to:toAddress, value:amountToSend});
//   // console.log(send);
// };

const Draft = () => {
  const [Teamlist, setTeamlist] = useState([[0], [0], [0], [0]]);
  const [playersList, setPlayersList] = useState([]);

  const fetchTeamlist = async () => {
    try {
      const teamRsp = await getRequest('fantethy');
      const playerRsp = await getRequest('fantethy/players');
      setTeamlist(teamRsp);
      refreshPlayerList(playerRsp, teamRsp);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshPlayerList = (playerRsp, teamRsp) => {
    //REALLY bad and terrible never do this
    let parsedPlayerList = playerRsp;
    teamRsp.map((team) => {
      team.map((individual) => {
        let playerName = JSON.parse(individual);
        parsedPlayerList.forEach((player) => {
          if (player.name === playerName.name) {
            player.taken = true;
          }
        });
      })
    })
    setPlayersList(parsedPlayerList);
  }

  const addPlayerToTeam = async (i) => {
    try {
      await addPlayers('fantethy/0x627306090abaB3A6e1400e9345bC60c78a8BEf57', JSON.stringify(i));
      fetchTeamlist();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTeamlist();
  }, []);

  const playerImage = (id) => 'https://a.espncdn.com/i/headshots/nfl/players/full/'+parseInt(10460+id)+'.png';

  const playerList = playersList.map((i) =>
    <img
      onClick={() => addPlayerToTeam(i)}
      height="100px"
      alt="Player"
      src={playerImage(i.id)}
      className={`taken-${i.taken}`}
    />
  );

  const teamList = (team) => {
    const listItem = team.map((i, index) =>
      <List.Item>
        <Image
          style={{
            width: 'auto',
            height: '35px'
          }}
          avatar
          src={playerImage((JSON.parse(i)).id)}
        />
        <List.Content>
          <List.Header>{(JSON.parse(i)).name}</List.Header>
        </List.Content>
      </List.Item>
    );

    return listItem;
  }

  const userList = ['Devon', 'Olivia', 'Bob', 'Stacy'];

  const usersAndTeams = userList.map((name, index) =>
    <Grid.Column>
      <h1>{name}'s Team</h1>
      <List animated verticalAlign='middle'>
        {Teamlist[index].length > 0 && teamList(Teamlist[index])}
      </List>
    </Grid.Column>
  );

  return (
    <Grid divided>
      <Grid.Row centered>
        {/* <Button onClick={() => torusFunction()}/> */}
        {playerList}
      </Grid.Row>
      <Grid.Row columns={4} centered>
        {usersAndTeams}
      </Grid.Row>
    </Grid>
  );
};

export default Draft;
