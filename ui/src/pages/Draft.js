import React, { useState, useEffect } from 'react';
import { Grid, List, Image, Button } from 'semantic-ui-react';
import { getRequest, addPlayers } from '../api';

const Draft = () => {
  const [Teamlist, setTeamlist] = useState([[0], [0], [0], [0]]);
  const [playersList, setPlayersList] = useState([]);
  const [count, setCount] = useState(0);

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
    teamRsp.map(team => {
      team.map(individual => {
        let playerName = JSON.parse(individual);
        parsedPlayerList.forEach(player => {
          if (player.name === playerName.name) {
            player.taken = true;
          }
        });
      });
    });
    setPlayersList(parsedPlayerList);
  };

  const addPlayerToTeam = async i => {
    try {
      if (count == 0) {
        increment();
        await addPlayers('fantethy/0x627306090abaB3A6e1400e9345bC60c78a8BEf57', JSON.stringify(i));
        fetchTeamlist();
      }
      if (count == 1) {
        increment();
        await addPlayers('fantethy/0xf17f52151EbEF6C7334FAD080c5704D77216b732', JSON.stringify(i));
        fetchTeamlist();
      }
      if (count == 2) {
        increment();
        await addPlayers('fantethy/0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef', JSON.stringify(i));
        fetchTeamlist();
      }
      if (count == 3) {
        setCount(0);
        await addPlayers('fantethy/0x821aEa9a577a9b44299B9c15c88cf3087F3b5544', JSON.stringify(i));
        fetchTeamlist();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    fetchTeamlist();
  }, []);

  const playerImage = id =>
    'https://a.espncdn.com/i/headshots/nfl/players/full/' + parseInt(10460 + id) + '.png';

  const playerList = playersList.map(i => (
    <img
      onClick={() => addPlayerToTeam(i)}
      height="100px"
      alt="Player"
      src={playerImage(i.id)}
      className={`taken-${i.taken}`}
    />
  ));

  const teamList = team => {
    const listItem = team.map((i, index) => (
      <List.Item>
        <Image
          style={{
            width: 'auto',
            height: '35px',
          }}
          avatar
          src={playerImage(JSON.parse(i).id)}
        />
        <List.Content>
          <List.Header>{JSON.parse(i).name}</List.Header>
        </List.Content>
      </List.Item>
    ));

    return listItem;
  };

  const userList = ['Devon', 'Olivia', 'Bob', 'Stacy'];

  const usersAndTeams = userList.map((name, index) => (
    <Grid.Column>
      <h1>{name}'s Team</h1>
      <List animated verticalAlign="middle">
        {Teamlist[index].length > 0 && teamList(Teamlist[index])}
      </List>
    </Grid.Column>
  ));

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
