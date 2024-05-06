import NoteList from "./components/NoteList/NoteList.tsx";
import NoteCreateForm from "./components/NoteEditor/NoteCreateForm.tsx";
import { NoteService } from "./services/NoteService.tsx";
import { useEffect, useState } from "react";
import { Note } from "./entity/Note.tsx";
import { NoteApi } from "./api/NoteApi.ts";
import { DeleteNote } from "./useCase/DeleteNote.ts";
import { ArchiveNote } from "./useCase/ArchiveNote.ts";
import { RestoreNote } from "./useCase/RestoreNote.ts";
import NoteViewMenu from "./components/NoteViewMenu/NoteViewMenu.tsx";
import { NoteView } from "./models/NoteView.ts";
import { GetFilteredNotes } from "./useCase/GetFilteredNotes.ts";
import { NotesQueryParams } from "./models/NotesQueryParams.ts";

const notesRepository = new NoteApi();
const notesService = new NoteService(notesRepository);
const getFilteredNotesUseCase = new GetFilteredNotes(notesService);
const deleteNoteUseCase = new DeleteNote(notesService);
const archiveNoteUseCase = new ArchiveNote(notesService);
const restoreNoteUseCase = new RestoreNote(notesService);

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentView, setCurrentView] = useState<NoteView>(NoteView.UNARCHIVED);

  const [filters, setFilters] = useState<NotesQueryParams>({
    archived: currentView == NoteView.ARCHIVED,
  });

  useEffect(() => {
    updateNotes();
  }, [filters]);
  useEffect(() => {
    setFilters({ archived: currentView == NoteView.ARCHIVED });
  }, [currentView]);

  const updateNotes = async () => {
    setNotes(await getFilteredNotesUseCase.execute(filters));
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
