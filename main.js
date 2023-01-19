"use strict";

const notesContainer = document.getElementById("container");
const addNoteBtn = notesContainer.querySelector(".addNote");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.text);
  notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(id, text) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = text;
  element.placeholder = "Enter text";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    if (confirm("Delete note?")) deleteNote(id, element);
  });

  return element;
}

function addNote() {
  const allNotes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random * 10000),
    text: "",
  };

  const noteElement = createNoteElement(noteObj.id, noteObj.text);
  notesContainer.insertBefore(noteElement, addNoteBtn);
  allNotes.push(noteObj);
  saveNotes(allNotes);
}

function updateNote(id, text) {
  const allNotes = getNotes();
  const searchingNote = allNotes.filter((note) => note.id == id)[0];
  searchingNote.text = text;
  saveNotes(allNotes);
}

function deleteNote(id, element) {
  const allNotes = getNotes().filter((note) => note.id != id);
  saveNotes(allNotes);
  notesContainer.removeChild(element);
}
