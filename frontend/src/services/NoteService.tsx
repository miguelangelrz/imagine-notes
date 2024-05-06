import {NoteRepository} from "../repository/NoteRepository.tsx";
import {Note} from "../entity/Note.tsx";
import {CreateNoteRequest} from "../models/CreateNoteRequest.ts";

export class NoteService {
  private noteRepository: NoteRepository;

  constructor(noteRepository: NoteRepository) {this.noteRepository = noteRepository}

  async getAllNotes(): Promise<Note[]> {
    return this.noteRepository.getAll();
  }

  async createNote(note: CreateNoteRequest): Promise<Note> {
    return this.noteRepository.create(note);
  }

  async deleteNote(id: number): Promise<Note> {
    return this.noteRepository.delete(id);
  }
}