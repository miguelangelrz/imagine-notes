package com.ensolvers.backend.repository;

import com.ensolvers.backend.model.Note;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class NoteRepositoryImpl implements  NoteRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Note save(Note note) {
        Session session = entityManager.unwrap(Session.class);
        session.persist(note);
        return note;
    }

    @Override
    public List<Note> getAllNotes() {
        return List.of();
    }
}
