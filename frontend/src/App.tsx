import NoteList from "./components/NoteList/NoteList.tsx";
import NoteCreateForm from "./components/NoteEditor/NoteCreateForm.tsx";
import { GetAllNotes } from "./useCase/GetAllNotes.ts";
import { NoteService } from "./services/NoteService.tsx";
import { useEffect, useState } from "react";
import { Note } from "./entity/Note.tsx";
import { NoteApi } from "./api/NoteApi.ts";
import { DeleteNote } from "./useCase/DeleteNote.ts";
import { ArchiveNote } from "./useCase/ArchiveNote.ts";
import { RestoreNote } from "./useCase/RestoreNote.ts";
import NoteViewMenu from "./components/NoteViewMenu/NoteViewMenu.tsx";
import {NoteView} from "./models/NoteView.ts";

const notesRepository = new NoteApi();
const notesService = new NoteService(notesRepository);
const getAllNotesUseCase = new GetAllNotes(notesService);
const deleteNoteUseCase = new DeleteNote(notesService);
const archiveNoteUseCase = new ArchiveNote(notesService);
const restoreNoteUseCase = new RestoreNote(notesService);

function App() {
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [currentView, setCurrentView] = useState<NoteView>(NoteView.UNARCHIVED);

  useEffect(() => {
    updateNotes();
  }, []);

  const updateNotes = async () => {
    setNotes(await getAllNotesUseCase.execute());
  };
  const deleteNote = async (id: number) => {
    await deleteNoteUseCase.execute(id);
    await updateNotes();
  };
  const archiveNote = async (id: number) => {
    await archiveNoteUseCase.execute(id);
    await updateNotes();
  };
  const restoreNote = async (id: number) => {
    await restoreNoteUseCase.execute(id);
    await updateNotes();
  };

  return (
    <div className="bg-slate-100 w-screen h-screen p-7">
      <h1 className="text-center font-bold text-4xl mb-5">My notes</h1>
      <div className="flex">
        <div className="flex flex-col">
          <NoteViewMenu currentView={currentView} setView={setCurrentView} />
          <NoteList
            notes={notes}
            onDeleteNote={deleteNote}
            onArchiveNote={archiveNote}
            onRestoreNote={restoreNote}
          />
        </div>
        <NoteCreateForm onCreateNote={updateNotes} />
      </div>
    </div>
  );
}

export default App;
