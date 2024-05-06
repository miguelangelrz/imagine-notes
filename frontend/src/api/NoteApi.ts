import { NoteRepository } from "../repository/NoteRepository.tsx";
import { Note } from "../entity/Note.tsx";
import { SaveNoteRequest } from "../models/SaveNoteRequest.ts";
import axios from "axios";
import { NotesQueryParams } from "../models/NotesQueryParams.ts";
import { objectToQueryString } from "../utils/objectToQueryString.ts";

const host = "http://localhost:8080";
const basePath = "/api";

export class NoteApi implements NoteRepository {
  async create(note: SaveNoteRequest): Promise<Note> {
    try {
      const response = await axios.post(`${host}${basePath}/notes`, note);

      return Promise.resolve(response.data);
    } catch (e) {
      console.error(e);

      return Promise.reject(e);
    }
  }

  async getAll(): Promise<Note[]> {
    try {
      const response = await axios.get(`${host}${basePath}/notes`);

      return Promise.resolve(response.data);
    } catch (e) {
      console.error(e);

      return Promise.reject(e);
    }
  }

  async getFiltered(query: NotesQueryParams): Promise<Note[]> {
    try {
      const response = await axios.get(
        `${host}${basePath}/notes?${objectToQueryString(query)}`,
      );

      return Promise.resolve(response.data);
    } catch (e) {
      console.error(e);

      return Promise.reject(e);
    }
  }

  async edit(id: number, note: SaveNoteRequest): Promise<Note> {
    try {
      const response = await axios.put(`${host}${basePath}/notes/${id}`, note);

      return Promise.resolve(response.data);
    } catch (e) {
      console.error(e);

      return Promise.reject(e);
    }
  }

  async delete(id: number): Promise<Note> {
    try {
      const response = await axios.delete(`${host}${basePath}/notes/${id}`);

      return Promise.resolve(response.data);
    } catch (e) {
      console.error(e);

      return Promise.reject(e);
    }
  }

  async archive(id: number): Promise<Note> {
    try {
      const response = await axios.put(
        `${host}${basePath}/notes/${id}/archive`,
      );

      return Promise.resolve(response.data);
    } catch (e) {
      console.error(e);

      return Promise.reject(e);
    }
  }

  async restore(id: number): Promise<Note> {
    try {
      const response = await axios.put(
        `${host}${basePath}/notes/${id}/restore`,
      );

      return Promise.resolve(response.data);
    } catch (e) {
      console.error(e);

      return Promise.reject(e);
    }
  }


}
