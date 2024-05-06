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
import NoteEditForm from "./components/NoteEditor/NoteEditForm.tsx";

const notesRepository = new NoteApi();
const notesService = new NoteService(notesRepository);
const getFilteredNotesUseCase = new GetFilteredNotes(notesService);
const deleteNoteUseCase = new DeleteNote(notesService);
const archiveNoteUseCase = new ArchiveNote(notesService);
const restoreNoteUseCase = new RestoreNote(notesService);

enum FormView {
  NONE,
  CREATE,
  EDIT,
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [listView, setListView] = useState<NoteView>(NoteView.UNARCHIVED);
  const [formView, setFormView] = useState<FormView>(FormView.NONE);

  const showCreateForm = () => setFormView(FormView.CREATE);
  const showEditForm = () => setFormView(FormView.EDIT);
  const hideForm = () => setFormView(FormView.NONE);

  const [noteOnEdition, setNoteOnEdition] = useState<Note | null>(null);

  const [filters, setFilters] = useState<NotesQueryParams>({
    archived: listView == NoteView.ARCHIVED,
  });

  useEffect(() => {
    updateNotes();
  }, [filters]);
  useEffect(() => {
    setFilters({ archived: listView == NoteView.ARCHIVED });
  }, [listView]);

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

  const handleEdit = (note: Note) => {
    setNoteOnEdition(note);
    showEditForm();
  };

  return (
    <div className="bg-slate-100 w-screen h-screen p-7">
      <h1 className="text-center font-bold text-4xl mb-5">My notes</h1>
      <div className="flex">
        <div className="flex flex-col">
          <button onClick={showCreateForm}>Create new note</button>
          <NoteViewMenu currentView={listView} setView={setListView} />
          <NoteList
            notes={notes}
            onDeleteNote={deleteNote}
            onArchiveNote={archiveNote}
            onRestoreNote={restoreNote}
            onEditNote={handleEdit}
          />
        </div>
        {formView === FormView.CREATE && (
          <NoteCreateForm onCreateNote={updateNotes} onCancel={hideForm} />
        )}
        {formView === FormView.EDIT && noteOnEdition != null && (
          <NoteEditForm
            initialNote={noteOnEdition}
            onEditNote={updateNotes}
            onCancel={hideForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
