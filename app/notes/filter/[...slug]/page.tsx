import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api/notesApi';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByTag({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  const response = await fetchNotes({
    page: 1,
    perPage: 12,
    search: '',
    tag,
  });

  return (
    <div>
      <h1>Notes List</h1>

      {response.notes.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
}
