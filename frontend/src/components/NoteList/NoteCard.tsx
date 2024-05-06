import { Note } from "../../entity/Note.tsx";

type NoteCardProps = {
  note: Note;
};

function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="bg-slate-200 mb-1 p-3 rounded-md">
      {Boolean(note.title) && <h4 className="font-bold">{note.title}</h4>}

      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;
