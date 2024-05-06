import {NoteService} from "../services/NoteService.tsx";
import {Note} from "../entity/Note.tsx";

export class GetAllNotes {
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  public async execute(): Promise<Note[]> {
    return this.noteService.getAllNotes();
  }
}