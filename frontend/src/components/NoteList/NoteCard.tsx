import { Note } from "../../entity/Note.tsx";

type NoteCardProps = {
  note: Note;
  onDelete: (id: number) => void;
};

function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="bg-slate-200 mb-1 p-3 rounded-md relative">
      <button className="absolute top-0 right-0" onClick={() => onDelete(note.id)}>X</button>
      {Boolean(note.title) && <h4 className="font-bold">{note.title}</h4>}

      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;
