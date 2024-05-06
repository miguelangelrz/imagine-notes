import NoteCard from "./NoteCard.tsx";
import { Note } from "../../entity/Note.tsx";

type NoteListProps = {
  notes: Array<Note>;
  onDeleteNote: (id: number) => void;
  onArchiveNote: (id: number) => void;
  onRestoreNote: (id: number) => void;
};

function NoteList({
  notes,
  onDeleteNote,
  onArchiveNote,
  onRestoreNote,
}: NoteListProps) {
  return (
    <ol>
      {notes.map((note: Note) => (
        <li key={note.id}>
          <NoteCard
            note={note}
            onDelete={onDeleteNote}
            onArchive={onArchiveNote}
            onRestore={onRestoreNote}
          />
        </li>
      ))}
    </ol>
  );
}

export default NoteList;
