package com.ensolvers.backend.repository;
import com.ensolvers.backend.model.Note;

import java.util.List;

public interface NoteRepository {
    public Note save(Note note);

    public List<Note> findAll();
}