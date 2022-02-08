import React from 'react';
import { Box, Heading, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { Variables } from '../../hooks/useAddFavouritesMutation';
import { ClientEntity as ClientEntityType } from '../../../server/Database';
import { StarIcon } from '@chakra-ui/icons';

interface Props {
  username: string;
  onClick: (variables: Variables) => void;
  isFavourite: (id: string) => boolean;
  clientEntities: ClientEntityType[];
}

export const ClientEntities = (props: Props) => {
  const { username, onClick, isFavourite, clientEntities } = props;

  const mappedClients = clientEntities.map((clientEntity, idx) => {
    const clientName = `${clientEntity.first_name} ${clientEntity.last_name}`;
    const icon = isFavourite(clientEntity.id) ? <StarIcon color="yellow" /> : null;

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
          <HStack>
            <Text>
              <strong>Name:</strong> {clientName}
            </Text>
            {icon}
          </HStack>
          <Text>
            <strong>Region:</strong> {clientEntity.region}
          </Text>
          <Text>
            <strong>CCMS_ID:</strong> {clientEntity.ccdms_id}
          </Text>
          <Button colorScheme="teal" onClick={() => onClick({ username, id: clientEntity.id })}>
            {isFavourite(clientEntity.id) ? 'Remove from favourites' : 'Add to favourites'}
          </Button>
        </VStack>
      </Box>
    );
  });

  return (
    <Box my={3} mx={4}>
      <Heading size="sm" mb="2">
        Client Entities
      </Heading>
      {mappedClients}
    </Box>
  );
};
