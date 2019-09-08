import React from 'react';
import Logo from '../logo.png';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import web3Obj from '../helpers/torusHelper';

const enableTorus = async () => {
  try {
    await web3Obj.initialize()
  } catch (error) {
    console.error(error)
  }
}

const LoginForm = () => {
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
          <Image src={Logo} /> Log in to your account
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

            <Button color="green" href="/" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/signup/">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
