import NoteList from "./components/NoteList/NoteList.tsx";
import NoteCreateForm from "./components/NoteEditor/NoteCreateForm.tsx";
import {GetAllNotes} from "./useCase/GetAllNotes.ts";
import {NoteService} from "./services/NoteService.tsx";
import {useEffect, useState} from "react";
import {Note} from "./entity/Note.tsx";
import {NoteApi} from "./api/NoteApi.ts";

const notesRepository = new NoteApi();
const notesService = new NoteService(notesRepository);
const getAllNotesUseCase = new GetAllNotes(notesService);

function App() {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    updateNotes()
  }, [])

  const updateNotes = async () => {
    setNotes(await getAllNotesUseCase.execute());
  }

  return (
    <div className="bg-slate-100 w-screen h-screen p-7">
      <h1 className="text-center font-bold text-4xl mb-5">My notes</h1>
      <div className="flex">
        <NoteList notes={notes} />
        <NoteCreateForm onCreateNote={updateNotes} />
      </div>
    </div>
  )
}

export default App
