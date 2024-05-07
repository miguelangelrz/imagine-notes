import { FormEvent, useState } from "react";
import { CreateNote } from "../../useCase/CreateNote.ts";
import { NoteService } from "../../services/NoteService.tsx";
import { Note } from "../../entity/Note.tsx";
import { NoteApi } from "../../api/NoteApi.ts";
import TitleInput from "./TitleInput.tsx";
import ContentTextArea from "./ContentTextArea.tsx";
import Button from "./Button.tsx";
import { ButtonPriorityType } from "../../models/ButtonPriorityType.tsx";

const noteRepository = new NoteApi();
const noteService = new NoteService(noteRepository);
const createNoteUseCase = new CreateNote(noteService);

type NoteCreatedFormProps = {
  onCreateNote?: (note: Note) => void;
  onCancel: () => void;
};

function NoteCreateForm({ onCreateNote, onCancel }: NoteCreatedFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const note = await createNoteUseCase.execute({ title, content });
    if (onCreateNote) onCreateNote(note);
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
        <Button
          label="Create"
          type="submit"
        />
      </div>
    </form>
  );
}

export default NoteCreateForm;
