import classNames from "classnames";
import { NoteView } from "../../models/NoteView.ts";

type NoteViewButtonProps = {
  isSelected: boolean;
  setView: () => void;
  label: string;
};

function NoteViewButton({ isSelected, setView, label }: NoteViewButtonProps) {
  return (
    <div
      className={classNames("w-full cursor-pointer text-center p-3", {
        "font-bold": isSelected,
        "bg-slate-200": isSelected,
      })}
      onClick={setView}
    >
      {label}
    </div>
  );
}

type NoteViewToggleProps = {
  currentView: NoteView;
  setView: (view: NoteView) => void;
};

function NoteViewMenu({ currentView, setView }: NoteViewToggleProps) {
  return (
    <div className="flex border-b-2 border-amber-700">
      <NoteViewButton
        isSelected={currentView === NoteView.UNARCHIVED}
        setView={() => setView(NoteView.UNARCHIVED)}
        label="Notes"
      />
      <NoteViewButton
        isSelected={currentView === NoteView.ARCHIVED}
        setView={() => setView(NoteView.ARCHIVED)}
        label="Archived"
      />
    </div>
  );
}

export default NoteViewMenu;
