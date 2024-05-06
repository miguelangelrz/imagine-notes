import {NoteService} from "../services/NoteService.tsx";
import {CreateNoteRequest} from "../models/CreateNoteRequest.ts";
import {Note} from "../entity/Note.tsx";

export class CreateNote {
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  public async execute(note: CreateNoteRequest): Promise<Note> {
    return this.noteService.createNote(note);
  }
}