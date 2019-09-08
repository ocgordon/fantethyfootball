import React, { useState, useEffect } from 'react';
import { Grid, Button, List, Image } from 'semantic-ui-react';
import { getRequest, addPlayers } from '../api';

const Players = () => {
  const [Teamlist, setTeamlist] = useState([[0], [0], [0], [0]]);

  const fetchTeamlist = async () => {
    try {
      const resp = await getRequest('fantethy');
      setTeamlist(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const playerImage = id =>
    'https://a.espncdn.com/i/headshots/nfl/players/full/' + parseInt(10460 + id) + '.png';

  const teamList = team => {
    const listItem = team.map((i, index) => (
      <List.Item>
        <Image
          style={{
            width: 'auto',
            height: '300px',
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

  useEffect(() => {
    fetchTeamlist();
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Grid divided>
      <Grid.Row>
        <List horizontal center>
          {teamList(Teamlist[0])}
        </List>
      </Grid.Row>
    </Grid>
  );
};

export default Players;
