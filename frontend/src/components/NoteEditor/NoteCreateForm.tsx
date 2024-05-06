import {FormEvent, useState} from "react";
import {CreateNote} from "../../useCase/CreateNote.ts";
import {NoteService} from "../../services/NoteService.tsx";
import {Note} from "../../entity/Note.tsx";
import {NoteApi} from "../../api/NoteApi.ts";

const noteRepository = new NoteApi();
const noteService = new NoteService(noteRepository);
const createNoteUseCase = new CreateNote(noteService);

type NoteCreatedFormProps = {
  onCreateNote?: (note: Note) => void;
}

function NoteCreateForm({onCreateNote}: NoteCreatedFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const note = await createNoteUseCase.execute({title, content});
    if (onCreateNote) onCreateNote(note);
  }

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <input placeholder="Title" className="mb-1" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <textarea placeholder="Take a note..." className="h-20" onChange={(e) => setContent(e.target.value)} value={content} />
      <button type="submit">
        Create
      </button>
    </form>
  );
}

export default NoteCreateForm;
