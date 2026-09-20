import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/notesApi';
import NotesClient from './Notes.client';

export default async function Notes() {
  const queryClient = new QueryClient();

  const queryKey = ['notes', 1, ''];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
      }),
  });

  const queryState = queryClient.getQueryState(queryKey);

  if (queryState?.status === 'error') {
    throw queryState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
