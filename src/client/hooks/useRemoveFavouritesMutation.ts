import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { getUserQueryKey } from './useUserQuery';

export interface Variables {
  username: string;
  id: string;
}

export const useRemoveFavouritesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (variables: Variables): Promise<string> => {
      const { data } = await axios.delete(
        `http://localhost:4000/${variables.username}/favourites/${variables.id}`
      );
      return data;
    },
    {
      onSuccess: async (_, variables) => {
        // onSuccess invalidate the `useGetQuery` as its data is now stale -> causing it to refetch
        await queryClient.invalidateQueries(getUserQueryKey(variables.username));
      },
    }
  );
};
