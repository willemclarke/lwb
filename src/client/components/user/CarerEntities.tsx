import React from 'react';
import { Variables } from '../../hooks/useAddFavouritesMutation';
import { CarerEntity as CarerEntityType } from '../../../server/Database';
import { Box, Heading, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface Props {
  username: string;
  onClick: (variables: Variables) => void;
  isFavourite: (id: string) => boolean;
  carerEntities: CarerEntityType[];
}

export const CarerEntities = (props: Props) => {
  const { username, onClick, isFavourite, carerEntities } = props;

  const mappedCarers = carerEntities.map((carerEntity, idx) => {
    const icon = isFavourite(carerEntity.id) ? <StarIcon color="yellow" /> : null;

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
          <HStack>
            <Text>
              <strong>Region:</strong> {carerEntity.region}
            </Text>
            {icon}
          </HStack>
          <Text>
            <strong>CCMS_ID:</strong> {carerEntity.ccdms_id}
          </Text>
          <Text>
            <strong>Carers:</strong>
          </Text>
          {carerEntity.carers.map((carer, idx) => {
            return (
              <Text key={idx}>
                {carer.first_name} {carer.last_name}
              </Text>
            );
          })}
          <Button colorScheme="teal" onClick={() => onClick({ username, id: carerEntity.id })}>
            {isFavourite(carerEntity.id) ? 'Remove from favourites' : 'Add to favourites'}
          </Button>
        </VStack>
      </Box>
    );
  });

  return (
    <Box my={3} mx={4}>
      <Heading size="sm" mb="2">
        Carer Entities
      </Heading>
      {mappedCarers}
    </Box>
  );
};
