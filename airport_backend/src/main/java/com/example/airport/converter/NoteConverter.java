package com.example.airport.converter;

import com.example.airport.dto.note.NoteList;
import com.example.airport.dto.note.NoteRead;
import com.example.airport.dto.note.NoteSave;
import com.example.airport.model.Note;

import java.util.ArrayList;
import java.util.List;

public class NoteConverter {
    public static List<NoteList> convertModelsToList(List<Note> notes) {
        List<NoteList> dtoList = new ArrayList<>();
        for (Note note : notes) {
            dtoList.add(convertModelToListItem(note));
        }
        return dtoList;
    }

    private static NoteList convertModelToListItem(Note note) {
        NoteList dto = new NoteList();
        dto.setId(note.getId());
        dto.setText(note.getText());
        return dto;
    }

    public static Note convertModelToSave(NoteSave noteSave) {
        Note note = new Note();
        note.setText(noteSave.getText());
        return note;
    }

    public static NoteRead convertModelToRead(Note note) {
        NoteRead dto = new NoteRead();
        dto.setId(note.getId());
        dto.setText(note.getText());
        return dto;
    }
}
