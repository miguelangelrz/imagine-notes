import { Note } from "../../entity/Note.tsx";

type NoteCardProps = {
  note: Note;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onEdit: (note: Note) => void;
};

function NoteCard({
  note,
  onDelete,
  onRestore,
  onArchive,
  onEdit,
}: NoteCardProps) {
  return (
    <div
      className="bg-slate-200 mb-1 p-3 rounded-md cursor-pointer"
      onClick={() => onEdit(note)}
    >
      <div className="flex">
        {!note.archived && (
          <button onClick={() => onArchive(note.id)}>Archive</button>
        )}
        {note.archived && (
          <button onClick={() => onRestore(note.id)}>Restore</button>
        )}
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
      {Boolean(note.title) && <h4 className="font-bold">{note.title}</h4>}

      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;
