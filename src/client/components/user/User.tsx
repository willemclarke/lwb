import React from 'react';
import { Box, Flex, Heading, useToast, HStack } from '@chakra-ui/react';
import { ClientEntities } from './ClientEntities';
import { CarerEntities } from './CarerEntities';
import { useAddFavouritesMutation, Variables } from '../../hooks/useAddFavouritesMutation';
import _ from 'lodash';
import { useRemoveFavouritesMutation } from '../../hooks/useRemoveFavouritesMutation';
import { useUserQuery } from '../../hooks/useUserQuery';
import { Spin } from '../Spin';
import { useParams } from 'react-router-dom';
import { parseUsername } from '../../utils/utils';

export const User = () => {
  const { username } = useParams<{ username: string }>();

  const toast = useToast();
  const addFavouritesMutation = useAddFavouritesMutation();
  const removeFavouritesMutation = useRemoveFavouritesMutation();

  const { data, isLoading, error } = useUserQuery(username);

  const onAddFavourite = React.useCallback(
    (variables: Variables) => {
      addFavouritesMutation
        .mutateAsync({ username: variables.username, id: variables.id })
        .then(() => {
          toast({
            status: 'success',
            title: `Added ${variables.id} to ${parseUsername(variables.username)}'s favourites `,
            duration: 3000,
            position: 'bottom',
          });
        })
        .catch((error) => {
          toast({
            status: 'warning',
            title: `There was an error adding ${variables.id} to favourites `,
            duration: 3000,
            position: 'bottom',
          });
        });
    },
    [addFavouritesMutation]
  );

  const onRemoveFavourite = React.useCallback(
    (variables: Variables) => {
      removeFavouritesMutation
        .mutateAsync({ username: variables.username, id: variables.id })
        .then(() => {
          toast({
            status: 'success',
            title: `Removed ${variables.id} from ${parseUsername(
              variables.username
            )}'s favourites `,
            duration: 3000,
            position: 'bottom',
          });
        })
        .catch((error) => {
          toast({
            status: 'warning',
            title: `There was an error removing ${variables.id} from favourites`,
            duration: 3000,
            position: 'bottom',
          });
        });
    },
    [removeFavouritesMutation]
  );

  const onClick = React.useCallback(
    (variables: Variables) => {
      isFavourite(variables.id) ? onRemoveFavourite(variables) : onAddFavourite(variables);
    },
    [onAddFavourite, onRemoveFavourite]
  );

  const isFavourite = React.useCallback(
    (id: string) => {
      return _.includes(data?.favourites, id);
    },
    [data?.favourites]
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error || !data) {
    return <Box>{JSON.stringify(error, null, 2)}</Box>;
  }

  return (
    <Flex mt={4} justify="center" flexDir="column">
      <Flex justify="center">
        <HStack spacing={3}>
          <Heading size="md" mb="2">
            {parseUsername(username)}
          </Heading>
        </HStack>
      </Flex>
      <Flex mt={4} justify="center" maxw="md">
        <Box display="inline-flex">
          <ClientEntities
            username={username}
            onClick={onClick}
            isFavourite={isFavourite}
            clientEntities={data.clientEntities}
          />
          <CarerEntities
            username={username}
            onClick={onClick}
            isFavourite={isFavourite}
            carerEntities={data.carerEntities}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
