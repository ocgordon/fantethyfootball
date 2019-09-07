import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { getRequest, addPlayers } from '../api';

const Players = () => {
  const [Teamlist, setTeamlist] = useState([]);

  const fetchTeamlist = async () => {
    try {
      const resp = await getRequest('fantethy');
      setTeamlist(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const addPlayerToTeam = async i => {
    try {
      await addPlayers('fantethy/0x627306090abaB3A6e1400e9345bC60c78a8BEf57', i);
      fetchTeamlist();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTeamlist();
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const playerList = numbers.map(i => (
    <Grid.Row>
      <img
        height="100px"
        alt="Player"
        src={'https://a.espncdn.com/i/headshots/nfl/players/full/' + parseInt(10460 + i) + '.png'}
      />
    </Grid.Row>
  ));

  return (
    <Grid columns={4} divided>
      <Grid.Row>
        <Grid.Column centered>{playerList[0]}</Grid.Column>
        <Grid.Column centered>{playerList[1]}</Grid.Column>
        <Grid.Column centered>{playerList[2]}</Grid.Column>
        <Grid.Column centered>{playerList[3]}</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered>{playerList[4]}</Grid.Column>
        <Grid.Column centered>{playerList[5]}</Grid.Column>
        <Grid.Column centered>{playerList[6]}</Grid.Column>
        <Grid.Column centered>{playerList[7]}</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered>{playerList[8]}</Grid.Column>
        <Grid.Column centered>{playerList[9]}</Grid.Column>
        <Grid.Column centered>{playerList[10]}</Grid.Column>
        <Grid.Column centered>{playerList[11]}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Players;
