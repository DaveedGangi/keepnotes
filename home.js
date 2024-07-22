

document.addEventListener("DOMContentLoaded",function(){





const noteTake=document.getElementById("noteTake");

const newNote=document.getElementById("new-note");

const newNoteTitle=document.getElementById("new-note-title");
const newNoteTextArea=document.getElementById("new-note-textArea");
const newNoteColor=document.getElementById("new-note-color");
const newNoteSave=document.getElementById("new-note-save");


const notesContainer=document.getElementById("notes-container");



noteTake.addEventListener("click", function(event){
    newNote.classList.toggle("active");
    console.log("Clicking");
});




newNoteSave.addEventListener("click",async function(event){

    event.preventDefault();
    console.log("New Note Item Selected");

    function generateUniqueId() {
        return Math.floor(Math.random() * 10000000000000000000);

    }

      
    //Create a new note object
    const newNoteObj={
        title: newNoteTitle.value,
        content: newNoteTextArea.value,
        background_color: newNoteColor.value,
        id:generateUniqueId()
    };

    console.log(newNoteObj);

    try {
        const response = await fetch("https://notes-2-wrxv.onrender.com/notesAdd/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newNoteObj)
        });

        if (response.ok) {
            console.log("Note saved successfully");
            fetchNotes();
        } else {
            console.error("Failed to save note:", response.statusText);
        }
    } catch (error) {
        console.error("Error saving note:", error);
    }




});




async function fetchNotes() {
    try {
        const response = await fetch("https://notes-2-wrxv.onrender.com/notesTaken/");
        const data = await response.json();

        // Clear the notes container
        notesContainer.innerHTML = "";

        // Loop through the notes and create HTML elements for each note
        data.forEach(note => {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.style.backgroundColor = note.background_color;
            noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
            
                <button class="archive-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                </svg></button> 
                <button id="deleteButton" class="delete-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg></button>
                
            `;

            const deleteButton = noteElement.querySelector(".delete-button");

            
deleteButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://notes-2-wrxv.onrender.com/noteDelete/${note.id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            console.log("Note deleted successfully");
            // Fetch notes again after deleting a note
            fetchNotes();
        } else {
            console.error("Failed to delete note:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting note:", error);
    }
});
























            notesContainer.appendChild(noteElement);
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
}





// Fetch notes initially when the page loads
fetchNotes();





});