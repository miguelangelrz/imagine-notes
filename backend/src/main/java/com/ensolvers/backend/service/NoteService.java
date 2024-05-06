package com.ensolvers.backend.service;

import com.ensolvers.backend.model.Note;
import com.ensolvers.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note deleteNote(Long noteId) {
        return noteRepository.delete(noteId);
    }

    public Note archiveNote(Long noteId) {
        return noteRepository.archive(noteId);
    }

    public Note restoreNote(Long noteId) {
        return noteRepository.restore(noteId);
    }
}
