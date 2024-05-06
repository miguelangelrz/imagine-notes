import { Note } from "../entity/Note.tsx";
import { SaveNoteRequest } from "../models/SaveNoteRequest.ts";
import { NotesQueryParams } from "../models/NotesQueryParams.ts";

export interface NoteRepository {
  create(note: SaveNoteRequest): Promise<Note>;

  getAll(): Promise<Note[]>;

  getFiltered(query: NotesQueryParams): Promise<Note[]>;

  edit(id: number, note: SaveNoteRequest): Promise<Note>;

  delete(id: number): Promise<Note>;

  archive(id: number): Promise<Note>;

  restore(id: number): Promise<Note>;
}
