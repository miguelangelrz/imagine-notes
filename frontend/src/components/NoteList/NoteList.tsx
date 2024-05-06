import NoteCard from "./NoteCard.tsx";
import {Note} from "../../entity/Note.tsx";

type NoteListProps = {
  notes: Array<Note>;
}

function NoteList({ notes }: NoteListProps) {
  return (
    <ol>
      {notes.map((note: Note) => (
        <li>
          <NoteCard
            note={note}
          />
        </li>
      ))}
    </ol>
  );
}

export default NoteList;
