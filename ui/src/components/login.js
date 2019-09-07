import React from 'react';
import Logo from '../logo.png';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';

const torusFunction = async () => {
  const torus = new Torus();
  console.log(torus)
  await torus.init();
  await torus.login(); // await torus.ethereum.enable()
  const web3 = new Web3(torus.provider);
  // Start using web3 in your dapp
  window.torus = torus;
  window.ethereum = web3;

  // web3.eth.sendTransaction({
  //   from:'0x9ac74414d8363ae73300ae62e69c80e217b56d50',
  //   to:'0xdc3821270026617A3c712f04df9e891c925A1d42',
  //   value:web3.toWei(.1, "ether")
  // }, function(err, transactionHash) {
  //   if (!err)
  //     console.log(transactionHash + " success");
  // });
};

const LoginForm = () => {
  torusFunction();
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
