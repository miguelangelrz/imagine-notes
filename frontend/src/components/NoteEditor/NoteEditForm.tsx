import { FormEvent, useEffect, useState } from "react";
import { NoteService } from "../../services/NoteService.tsx";
import { Note } from "../../entity/Note.tsx";
import { NoteApi } from "../../api/NoteApi.ts";
import { EditNote } from "../../useCase/EditNote.ts";

const noteRepository = new NoteApi();
const noteService = new NoteService(noteRepository);
const editNoteUseCase = new EditNote(noteService);

type NoteEditFormProps = {
  initialNote: Note;
  onEditNote?: (note: Note) => void;
  onCancel: () => void;
};

function NoteEditForm({
  initialNote,
  onEditNote,
  onCancel,
}: NoteEditFormProps) {
  const [title, setTitle] = useState(initialNote.title || "");
  const [content, setContent] = useState(initialNote.content || "");

  useEffect(() => {
    setTitle(initialNote.title || "");
    setContent(initialNote.content || "");
  }, [initialNote]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const note = await editNoteUseCase.execute(initialNote.id, {
      title,
      content,
    });
    if (onEditNote) onEditNote(note);
    onCancel();
  };

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <input
        placeholder="Title"
        className="mb-1"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        placeholder="Take a note..."
        className="h-20"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button onClick={onCancel}>Cancel</button>
      <button type="submit">Edit</button>
    </form>
  );
}

export default NoteEditForm;
