import type { Note } from '@/types/note';
import axios from 'axios';


interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type CreateNoteData = Pick<Note, 'title' | 'content' | 'tag'>;

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
  } = {
    page,
    perPage,
  };
  if (search.trim() !== '') {
    params.search = search;
  }

  if (tag && tag.trim() !== '' && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }
  const response = await axios.get<FetchNotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params,
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data;
};

export const createNote = async (note: CreateNoteData): Promise<Note> => {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    note,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data;
};