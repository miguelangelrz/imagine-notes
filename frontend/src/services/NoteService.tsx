import {NoteRepository} from "../repository/NoteRepository.tsx";
import {Note} from "../entity/Note.tsx";
import {SaveNoteRequest} from "../models/SaveNoteRequest.ts";
import {NotesQueryParams} from "../models/NotesQueryParams.ts";

export class NoteService {
  private noteRepository: NoteRepository;

  constructor(noteRepository: NoteRepository) {this.noteRepository = noteRepository}

  async getAllNotes(): Promise<Note[]> {
    return this.noteRepository.getAll();
  }

  async getFilteredNotes(query: NotesQueryParams): Promise<Note[]> {
    return this.noteRepository.getFiltered(query);
  }

  async createNote(note: SaveNoteRequest): Promise<Note> {
    return this.noteRepository.create(note);
  }

  async editNote(id: number, note: SaveNoteRequest): Promise<Note> {
    return this.noteRepository.edit(id, note);
  }

  async deleteNote(id: number): Promise<Note> {
    return this.noteRepository.delete(id);
  }

  async archiveNote(id: number): Promise<Note> {
    return this.noteRepository.archive(id);
  }

  async restoreNote(id: number): Promise<Note> {
    return this.noteRepository.restore(id);
  }
}