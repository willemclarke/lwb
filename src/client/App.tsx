import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './components/Landing';
import { User } from './components/User';

const Nav = () => {
  return (
    <Flex mt="6" bg="white" justify="center">
      <Text color="green.800" fontSize="3xl" fontWeight="bold" align="center">
        LWB - Code Challenge
      </Text>
    </Flex>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <Flex h="100%" flexDir="column">
        <Nav />
        <Box h="100%" flexGrow={1} overflowY="auto" bg="white">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/:username" element={<User />} />
          </Routes>
        </Box>
      </Flex>
    </BrowserRouter>
  );
};
