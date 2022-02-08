import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from './components/Landing';
import { User } from './components/User';

const Nav = () => {
  return (
    <Flex mt="6" bg="white" justify="center">
      <Text color="green.800" fontSize="3xl" fontWeight="bold" align="center" as="b">
        Life Without Barriers - Challenge
      </Text>
    </Flex>
  );
};

export const App = () => {
  return (
    <Router>
      <Flex h="100%" flexDir="column">
        <Nav />
        <Box h="100%" flexGrow={1} overflowY="auto" bg="white">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/user/:username" component={User} />
            {/* <Route path="*" component={Landing} /> */}
          </Switch>
        </Box>
      </Flex>
    </Router>
  );
};
