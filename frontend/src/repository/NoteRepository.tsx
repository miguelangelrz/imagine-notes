import {Note} from "../entity/Note.tsx";
import {CreateNoteRequest} from "../models/CreateNoteRequest.ts";

export interface NoteRepository {
  create(note: CreateNoteRequest): Promise<Note>;
  getAll(): Promise<Note[]>;
  delete(id: number): Promise<Note>;
  archive(id: number): Promise<Note>;
  restore(id: number): Promise<Note>;
}