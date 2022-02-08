import React from 'react';
import { Box, Flex, VStack, Text, Button, Divider, Heading } from '@chakra-ui/react';
import { CarerEntity, ClientEntity } from '../../server/Database';
import { parseUsername } from '../utils/utils';

interface Props {
  username: string;
  clientEntities: ClientEntity[];
  carerEntities: CarerEntity[];
}

export const Clients = (props: Props) => {
  const { username, clientEntities, carerEntities } = props;

  const mappedClients = clientEntities.map((clientEntity, idx) => {
    return (
      <Box
        bgColor="green.800"
        color="white"
        mt={4}
        p={2}
        rounded="md"
        shadow="md"
        key={`client-entity-${idx}`}
      >
        <VStack spacing={2}>
          <Text>
            <strong>Name:</strong> {clientEntity.first_name} {clientEntity.last_name}
          </Text>
          <Text>
            <strong>Region:</strong> {clientEntity.region}
          </Text>
          <Text>
            <strong>CCMS_ID:</strong> {clientEntity.ccdms_id}
          </Text>
          <Button colorScheme="teal">Add to favourites</Button>
        </VStack>
      </Box>
    );
  });

  const mappedCarers = carerEntities.map((carerEntity, idx) => {
    return (
      <Box
        bgColor="green.800"
        color="white"
        mt={4}
        p={2}
        rounded="md"
        shadow="md"
        key={`carer-entity-${idx}`}
      >
        <VStack spacing={2}>
          <Text>
            <strong>Region:</strong> {carerEntity.region}
          </Text>
          <Text>
            <strong>CCMS_ID:</strong> {carerEntity.ccdms_id}
          </Text>
          <Button colorScheme="teal">Add to favourites</Button>
        </VStack>
      </Box>
    );
  });

  return (
    <Flex mt={4} maxw="md" flexDir="column">
      <Box display="inline-flex">
        <Box m={2}>
          <Heading size="sm" mb="2">
            Clients
          </Heading>
          {mappedClients}
        </Box>
        <Box m={2}>
          <Heading size="sm" mb="2">
            Carers
          </Heading>
          {mappedCarers}
        </Box>
      </Box>
    </Flex>
  );
};
