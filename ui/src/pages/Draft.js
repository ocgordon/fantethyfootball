import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { getRequest, addPlayers } from '../api';

const Draft = () => {
  const [Teamlist, setTeamlist] = useState([]);

  const fetchTeamlist = async () => {
    try {
      const resp = await getRequest('fantethy');
      setTeamlist(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const addPlayerToTeam = async (i) => {
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

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const playerList = numbers.map((i) =>
    <img
      onClick={() => addPlayerToTeam(i)}
      height="100px"
      alt="Player"
      src={'https://a.espncdn.com/i/headshots/nfl/players/full/'+parseInt(10460+i)+'.png'}
    />
    );

  return (
    <Grid divided>
      <Grid.Row centered>
        {playerList}
      </Grid.Row>
      <Grid.Row columns={4} centered>
        <Grid.Column>
          <h1>Devon's Team</h1>
          {JSON.stringify(Teamlist[0])}
        </Grid.Column>
        <Grid.Column>
          <h1>Olivia's Team</h1>
          {JSON.stringify(Teamlist[1])}
        </Grid.Column>
        <Grid.Column>
          <h1>Bob's Team</h1>
          {JSON.stringify(Teamlist[2])}
        </Grid.Column>
        <Grid.Column>
          <h1>Stacy's Team</h1>
          {JSON.stringify(Teamlist[3])}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Draft;
