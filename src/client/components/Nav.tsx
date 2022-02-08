import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <Link to="/">
      <Flex mt="6" bg="white" justify="center">
        <Text color="green.800" fontSize="3xl" fontWeight="bold" align="center" as="b">
          Life Without Barriers - Challenge
        </Text>
      </Flex>
    </Link>
  );
};
