package com.ensolvers.backend.controller;

import com.ensolvers.backend.model.Note;
import com.ensolvers.backend.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<Note> saveNote(@RequestBody Note note) {
        Note createdNote = noteService.createNote(note);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes(@RequestParam(required = false) Boolean archived) {
        List<Note> notes;
        if (archived == null) {
            notes = noteService.getAllNotes();
        } else {
            notes = noteService.getNoteByArchived(archived);
        }

        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> editNote(@PathVariable Long id, @RequestBody Note note) {
        Note deletedNote = noteService.editNote(id, note);
        return new ResponseEntity<>(deletedNote, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Note> deleteNote(@PathVariable Long id) {
        Note deletedNote = noteService.deleteNote(id);
        return new ResponseEntity<>(deletedNote, HttpStatus.OK);
    }

    @PutMapping("/{id}/archive")
    public ResponseEntity<Note> archiveNote(@PathVariable Long id) {
        Note archivedNote = noteService.archiveNote(id);
        return new ResponseEntity<>(archivedNote, HttpStatus.OK);
    }

    @PutMapping("/{id}/restore")
    public ResponseEntity<Note> restoreNote(@PathVariable Long id) {
        Note restoredNote = noteService.restoreNote(id);
        return new ResponseEntity<>(restoredNote, HttpStatus.OK);
    }
}
