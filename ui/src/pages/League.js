import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { getRequest, addPlayers, distributePoints } from '../api';

const League = () => {
  const [Teamlist, setTeamlist] = useState([]);

  const fetchTeamlist = async () => {
    try {
      const resp = await getRequest('fantethy');
      const pointResp = await getRequest(
        'fantethy/points/0xf17f52151EbEF6C7334FAD080c5704D77216b732',
      );
      console.log(pointResp);
      setTeamlist(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const simulateGame = async () => {
    try {
      await distributePoints('0xf17f52151EbEF6C7334FAD080c5704D77216b732', 10);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTeamlist();
  }, []);

  return (
    <Grid divided>
      <Grid.Row centered>
        <Button onClick={() => simulateGame()}>Simulate Game</Button>
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

export default League;
