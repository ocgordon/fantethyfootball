import React from 'react';
import Logo from '../logo.png';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const SignUpForm = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="green" textAlign="center">
        <Image src={Logo} /> Create a new account
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm password"
            type="password"
          />

          <Button color="green" fluid size="large">
            Sign up
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default SignUpForm;
