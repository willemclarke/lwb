import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Landing } from './components/Landing';
import { User } from './components/user/User';
import { Fallback } from './components/Fallback';

export const App = () => {
  return (
    <Router>
      <Flex h="100%" flexDir="column">
        <Nav />
        <Box h="100%" flexGrow={1} overflowY="auto" bg="white">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/user/:username" component={User} />
            <Route path="*" component={Fallback} />
          </Switch>
        </Box>
      </Flex>
    </Router>
  );
};
