import {NoteService} from "../services/NoteService.tsx";
import {SaveNoteRequest} from "../models/SaveNoteRequest.ts";
import {Note} from "../entity/Note.tsx";

export class CreateNote {
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  public async execute(note: SaveNoteRequest): Promise<Note> {
    return this.noteService.createNote(note);
  }
}