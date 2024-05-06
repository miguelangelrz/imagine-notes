import { NoteService } from "../services/NoteService.tsx";
import { NotesQueryParams } from "../models/NotesQueryParams.ts";
import { Note } from "../entity/Note.tsx";

export class GetFilteredNotes {
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  public async execute(filterParams: NotesQueryParams): Promise<Note[]> {
    return this.noteService.getFilteredNotes(filterParams);
  }
}
