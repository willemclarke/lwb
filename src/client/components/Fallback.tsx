import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

export const Fallback = () => {
  return (
    <Flex m="4" justify="center">
      <Heading size="md" mb="4">
        Sorry :( - this page does not exist
      </Heading>
    </Flex>
  );
};
