import React, { useState, useEffect } from 'react';
import { Grid, Button, List, Image, Statistic } from 'semantic-ui-react';
import { getRequest, addPlayers, distributePoints } from '../api';

const League = () => {
  const [Teamlist, setTeamlist] = useState([[0], [0], [0], [0]]);
  const [Points, setPoints] = useState([0], [0], [0], [0]);

  const fetchTeamlist = async () => {
    try {
      const resp = await getRequest('fantethy');
      const pointResp = await getRequest('fantethy/points/');
      setPoints(pointResp);
      setTeamlist(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const playerImage = id =>
    'https://a.espncdn.com/i/headshots/nfl/players/full/' + parseInt(10459 + id) + '.png';

  const teamList = team => {
    const listItem = team.map((i, index) => (
      <List.Item>
        <Image
          style={{
            width: 'auto',
            height: '100px',
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

  const simulateGame = async () => {
    try {
      await distributePoints('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', 8);
      await distributePoints('0xf17f52151EbEF6C7334FAD080c5704D77216b732', 23);
      await distributePoints('0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef', 15);
      await distributePoints('0x821aEa9a577a9b44299B9c15c88cf3087F3b5544', 10);
      fetchTeamlist();
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
          <Grid.Row>{teamList(Teamlist[0])}</Grid.Row>
          <Grid.Row>
            <h2>Devon's Points</h2>
          </Grid.Row>
          <Grid.Row>
            <Statistic color="grey">
              <Statistic.Value>{JSON.stringify(Points[0])}</Statistic.Value>
              <Statistic.Label>Points</Statistic.Label>
            </Statistic>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <h1>Olivia's Team</h1>
          <Grid.Row>{teamList(Teamlist[1])}</Grid.Row>
          <Grid.Row>
            <h2>Olivia's Points</h2>
          </Grid.Row>
          <Grid.Row>
            <Statistic color="grey">
              <Statistic.Value>{JSON.stringify(Points[1])}</Statistic.Value>
              <Statistic.Label>Points</Statistic.Label>
            </Statistic>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <h1>Bob's Team</h1>
          <Grid.Row>{teamList(Teamlist[2])}</Grid.Row>
          <Grid.Row>
            <h2>Bob's Points</h2>
          </Grid.Row>
          <Grid.Row>
            <Statistic color="grey">
              <Statistic.Value>{JSON.stringify(Points[2])}</Statistic.Value>
              <Statistic.Label>Points</Statistic.Label>
            </Statistic>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <h1>Stacy's Team</h1>
          <Grid.Row>{teamList(Teamlist[3])}</Grid.Row>
          <Grid.Row>
            <h2>Stacy's Points</h2>
          </Grid.Row>
          <Grid.Row>
            <Statistic color="grey">
              <Statistic.Value>{JSON.stringify(Points[3])}</Statistic.Value>
              <Statistic.Label>Points</Statistic.Label>
            </Statistic>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <h1>WINNER!!!</h1>
      </Grid.Row>
      <Grid.Row centered>Olivia</Grid.Row>
      <Grid.Row>
        <Statistic color="grey">
          <Statistic.Value>{JSON.stringify(Points[1])}</Statistic.Value>
          <Statistic.Label>Points</Statistic.Label>
        </Statistic>
      </Grid.Row>
    </Grid>
  );
};

export default League;
