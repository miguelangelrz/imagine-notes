package com.ensolvers.backend.repository;

import com.ensolvers.backend.model.Note;

import java.util.List;

public interface NoteRepository {
    public Note save(Note note);

    public List<Note> findAll();

    public List<Note> findByArchived(boolean archived);

    public Note edit(Long id, Note note);

    public Note delete(Long id);

    public Note archive(Long id);

    public Note restore(Long id);
}