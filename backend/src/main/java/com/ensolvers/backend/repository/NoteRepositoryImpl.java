package com.ensolvers.backend.repository;

import com.ensolvers.backend.model.Note;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
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
    public List<Note> findAll() {
        Session session = entityManager.unwrap(Session.class);

        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Note> criteriaQuery = criteriaBuilder.createQuery(Note.class);
        Root<Note> root = criteriaQuery.from(Note.class);
        CriteriaQuery<Note> getAllQuery = criteriaQuery.select(root);

        TypedQuery<Note> query = session.createQuery(getAllQuery);
        return query.getResultList();
    }
}
