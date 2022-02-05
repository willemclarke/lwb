import React from 'react';
import {
  Spinner as ChakraSpinner,
  Center,
  SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react';

export const Spin = (props: ChakraSpinnerProps) => {
  return (
    <Center h="100%" w="100%">
      <ChakraSpinner color="blue.500" {...props} />
    </Center>
  );
};
