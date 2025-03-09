package com.example.airport.controller;

import com.example.airport.dto.note.NoteList;
import com.example.airport.dto.note.NoteRead;
import com.example.airport.dto.note.NoteSave;
import com.example.airport.service.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Note functions", description = "Manage notes")
public class NoteController {
    @Autowired
    private NoteService noteService;
    @GetMapping("/notes/list")
    @PreAuthorize("hasAuthority('LIST_NOTES')")
    @Operation(summary = "List notes")
    public List<NoteList> listNotes() {
        return noteService.listNotes();
    }

    @PostMapping("/notes")
    @Operation(summary = "Save a note")
    @PreAuthorize("hasAuthority('SAVE_NOTE')")
    public NoteRead addNote(@RequestBody NoteSave noteSave) {
        return noteService.addNote(noteSave);
    }

    @DeleteMapping("/note/{id}")
    @PreAuthorize("hasAuthority('DELETE_NOTE')")
    @Operation(summary = "Delete a note")
    public NoteRead deleteNote(@PathVariable int id) {
        return noteService.deleteNote(id);
    }

}
