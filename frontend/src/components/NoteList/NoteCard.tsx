import { Note } from "../../entity/Note.tsx";
import { MouseEventHandler } from "react";

type NoteQuickActionProps = {
  onAction: MouseEventHandler;
  show?: boolean;
  label: string;
};

function NoteQuickAction({
  onAction,
  show = true,
  label,
}: NoteQuickActionProps) {
  if (!show) {
    return <></>;
  }

  return (
    <button
      className="bg-slate-700 text-slate-100 text-sm rounded-2xl px-3 py-1"
      onClick={onAction}
    >
      {label}
    </button>
  );
}

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
  const archive: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onArchive(note.id);
  };
  const restore: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRestore(note.id);
  };
  const deleteTask: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(note.id);
  };

  return (
    <div
      className="bg-slate-200 mb-1 p-3 rounded-md cursor-pointer"
      onClick={() => onEdit(note)}
    >
      <div className="flex justify-end space-x-1">
        <NoteQuickAction
          onAction={archive}
          show={!note.archived}
          label="Archive"
        />
        <NoteQuickAction
          onAction={restore}
          show={note.archived}
          label="Restore"
        />
        <NoteQuickAction onAction={deleteTask} label="Delete" />
      </div>
      {Boolean(note.title) && <h4 className="font-bold">{note.title}</h4>}

      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;
