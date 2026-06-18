import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const perPage = 12;
type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const currentSlug = slug[0];
  const tag = currentSlug.toLowerCase() === 'all' ? '' : currentSlug;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1],
    queryFn: () => fetchNotes(1, perPage, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
};

export default NotesPage;