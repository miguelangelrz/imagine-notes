import {NoteService} from "../services/NoteService.tsx";
import {Note} from "../entity/Note.tsx";

export class DeleteNote {
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  public async execute(id: number): Promise<Note> {
    return this.noteService.deleteNote(id);
  }
}