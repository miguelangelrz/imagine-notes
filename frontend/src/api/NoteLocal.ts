import { NoteRepository } from "../repository/NoteRepository.tsx";
import { Note } from "../entity/Note.tsx";
import {CreateNoteRequest} from "../models/CreateNoteRequest.ts";

const notes: Array<Note> = new Array<Note>();

export class NoteLocal implements NoteRepository {
  create(note: CreateNoteRequest): Promise<Note> {
    const newNote: Note = {
      id: Date.now(),
      title: note.title,
      content: note.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    notes.push(newNote);

    return Promise.resolve(newNote);
  }

  getAll(): Promise<Note[]> {
    return Promise.resolve(notes);
  }
}
