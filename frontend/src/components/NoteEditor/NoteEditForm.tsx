import { FormEvent, useEffect, useState } from "react";
import { NoteService } from "../../services/NoteService.tsx";
import { Note } from "../../entity/Note.tsx";
import { NoteApi } from "../../api/NoteApi.ts";
import { EditNote } from "../../useCase/EditNote.ts";
import TitleInput from "./TitleInput.tsx";
import ContentTextArea from "./ContentTextArea.tsx";
import Button from "./Button.tsx";
import { ButtonPriorityType } from "../../models/ButtonPriorityType.tsx";

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
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <ContentTextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-end space-x-1 w-full mt-2">
        <Button
          label="Cancel"
          priority={ButtonPriorityType.SECONDARY}
          onClick={onCancel}
        />
        <Button label="Edit" type="submit" />
      </div>
    </form>
  );
}

export default NoteEditForm;
