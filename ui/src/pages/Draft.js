import React, { useState, useEffect } from 'react';
import { Grid, List, Image, ListItem} from 'semantic-ui-react';
import { getRequest, addPlayers } from '../api';

const Draft = () => {
  const [Teamlist, setTeamlist] = useState([[0], [0], [0], [0]]);

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

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const playerList = numbers.map((i) =>
    <img
      onClick={() => addPlayerToTeam(i)}
      height="100px"
      alt="Player"
      src={'https://a.espncdn.com/i/headshots/nfl/players/full/'+parseInt(10460+i)+'.png'}
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
          src={'https://a.espncdn.com/i/headshots/nfl/players/full/'+parseInt(10460+index)+'.png'}
        />
        <List.Content>
          <List.Header>{i}</List.Header>
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
        {teamList(Teamlist[index])}
      </List>
    </Grid.Column>
  );

  return (
    <Grid divided>
      <Grid.Row centered>
        {playerList}
      </Grid.Row>
      <Grid.Row columns={4} centered>
        {usersAndTeams}
      </Grid.Row>
    </Grid>
  );
};

export default Draft;
