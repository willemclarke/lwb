import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { User } from '../server/api';

export const App = () => {
  const [data, setData] = React.useState<User[]>();

  React.useEffect(() => {
    console.log('inside useEffect');
    const getData = async (): Promise<User[]> => {
      const data = await axios.get<User[]>('http://localhost:4000/users');
      return data.data;
    };
    getData().then((resp) => setData(resp));
  }, []);

  return (
    <Flex h="100%" mt="2" bg="white" justify="center" flexDir="column">
      <Text color="black" fontSize="3xl" fontWeight="bold" align="center">
        LWB - Code Challenge
      </Text>
      <Flex>{JSON.stringify(data, null, 2)}</Flex>
    </Flex>
  );
};
