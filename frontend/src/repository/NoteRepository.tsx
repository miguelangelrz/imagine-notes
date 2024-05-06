import { Note } from "../entity/Note.tsx";
import { CreateNoteRequest } from "../models/CreateNoteRequest.ts";
import { NotesQueryParams } from "../models/NotesQueryParams.ts";

export interface NoteRepository {
  create(note: CreateNoteRequest): Promise<Note>;

  getAll(): Promise<Note[]>;

  getFiltered(query: NotesQueryParams): Promise<Note[]>;

  delete(id: number): Promise<Note>;

  archive(id: number): Promise<Note>;

  restore(id: number): Promise<Note>;
}
