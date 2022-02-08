import React from 'react';
import { Box, Flex, Heading, List, ListItem } from '@chakra-ui/react';
import { Spin } from './Spin';
import { useUsernamesQuery } from '../hooks/useUsernamesQuery';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { parseUsername } from '../utils/utils';

export const Landing = () => {
  const { data, isLoading, error } = useUsernamesQuery();

  if (isLoading) {
    return <Spin />;
  }

  if (error || !data) {
    return <Box>Error fetching users</Box>;
  }

  const users = data.map((user, idx) => {
    const parsedUser = parseUsername(user);

    return (
      <Link to={`/user/${user}`} key={`option-${idx}`}>
        <ListItem mt={2}>{parsedUser}</ListItem>
      </Link>
    );
  });

  return (
    <Flex m="4" justify="center">
      <Flex maxW="sm" bg="white" w="400px" p="2" flexDir="column" alignItems="center">
        <Heading size="md" mb="4">
          Select a user:
        </Heading>
        <List spacing={4}>{users}</List>
      </Flex>
    </Flex>
  );
};
