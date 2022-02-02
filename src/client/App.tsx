import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export const App = () => {
  return (
    <Flex h="100%" mt="2" bg="white" justify="center">
      <Text color="black" fontSize="3xl" fontWeight="bold">
        jwt-auth
      </Text>
    </Flex>
  );
};
