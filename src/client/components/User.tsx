import React from 'react';
import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUserQuery } from '../hooks/useUserQuery';
import { Spin } from './Spin';

export const User = () => {
  const { username } = useParams();
  const { data, isLoading, error } = useUserQuery(username ?? '');

  if (isLoading) {
    return <Spin />;
  }

  if (error || !data) {
    return <Box>{`Error fetching X.Users data`}</Box>;
  }

  const clients = data.clients.map((client) => <Box>{client.first_name}</Box>);

  return (
    <Flex>
      <VStack>{clients}</VStack>
    </Flex>
  );
};
