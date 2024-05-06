import classNames from "classnames";
import {NoteView} from "../../models/NoteView.ts";

type NoteViewToggleProps = {
  currentView: NoteView;
  setView: (view: NoteView) => void;
};

function NoteViewMenu({ currentView, setView }: NoteViewToggleProps) {
  return (
    <div className="flex">
      <div
        className={classNames("w-full cursor-pointer", {
          "font-bold": currentView === NoteView.UNARCHIVED,
        })}
        onClick={() => setView(NoteView.UNARCHIVED)}
      >
        Notes
      </div>
      <div
        className={classNames("w-full cursor-pointer", {
          "font-bold": currentView === NoteView.ARCHIVED,
        })}
        onClick={() => setView(NoteView.ARCHIVED)}
      >
        Archived
      </div>
    </div>
  );
}

export default NoteViewMenu;