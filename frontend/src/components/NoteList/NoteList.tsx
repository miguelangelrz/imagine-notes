import NoteCard from "./NoteCard.tsx";
import {Note} from "../../entity/Note.tsx";

type NoteListProps = {
  notes: Array<Note>;
  onDeleteNote: (id: number) => void;
}

function NoteList({ notes, onDeleteNote }: NoteListProps) {
  return (
    <ol>
      {notes.map((note: Note) => (
        <li key={note.id}>
          <NoteCard
            note={note}
            onDelete={onDeleteNote}
          />
        </li>
      ))}
    </ol>
  );
}

export default NoteList;
