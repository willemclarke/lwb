import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUserQuery } from '../hooks/useUserQuery';
import { Spin } from './Spin';
import { Clients } from './Clients';
import { parseUsername } from '../utils/utils';

export const User = () => {
  const { username } = useParams<{ username: string }>();
  const { data, isLoading, error, refetch } = useUserQuery(username);

  if (isLoading) {
    return <Spin />;
  }

  if (error || !data) {
    return <Box>{JSON.stringify(error, null, 2)}</Box>;
  }

  return (
    <Flex mt={4} justify="center">
      <Flex alignItems="center" flexDir="column">
        <Heading size="md" mb="2">
          {username}
        </Heading>
        <Clients
          username={username}
          clientEntities={data.clientEntities}
          carerEntities={data.carerEntities}
        />
      </Flex>
    </Flex>
  );
};
