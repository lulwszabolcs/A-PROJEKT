package com.example.airport.service;

import com.example.airport.converter.NoteConverter;
import com.example.airport.dto.note.NoteList;
import com.example.airport.dto.note.NoteRead;
import com.example.airport.dto.note.NoteSave;
import com.example.airport.exception.NoteNotFoundException;
import com.example.airport.model.Note;
import com.example.airport.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;
    public List<NoteList> listNotes() {
        List<Note> noteList = noteRepository.findAll();
        return NoteConverter.convertModelsToList(noteList);

    }

    public NoteRead addNote(NoteSave noteSave) {
        Note note = noteRepository.save(NoteConverter.convertModelToSave(noteSave));
        return NoteConverter.convertModelToRead(note);
    }

    public NoteRead deleteNote(int id) {
        if (!noteRepository.existsById(id)) {
            throw new NoteNotFoundException();
        }
        Note deletingNote = noteRepository.findById(id).get();
        noteRepository.delete(deletingNote);
        return NoteConverter.convertModelToRead(deletingNote);
    }
}
