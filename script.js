//working with add Button in the Add Notes section

showNotes();
let addBtn = document.getElementById('addBtn');


addBtn.addEventListener("click", function (e) {

    let addText = document.getElementById('addtxt');
    // let title= document.getElementsById('title1');
    if(addText.value.length===0){
        window.alert('Please Add Some Notes!!!!');
        return;
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notes_array = [];
    }
    else {
        notes_array = JSON.parse(notes);

    }
    notes_array.push(addText.value);

    localStorage.setItem("notes", JSON.stringify(notes_array));
    addText.value = "";
     console.log(notes_array);

    showNotes();

})

function showNotes() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notes_array = [];
    }
    else {
        notes_array = JSON.parse(notes);
    }

    let html = '';

    notes_array.forEach(function (element, index) {
        if(element.length!==''){
            
        
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Notes - ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    <div class = "flexbox1" onclick="deleteNote(this.id)">
                    <div class="flexbox2">
                <i class="fa fa-heart fa"></i>
                            </div>
                    </div>
                </div>
               
            </div>
                `
        }
    });

    let display_notes = document.getElementById('notes');

    if (notes_array.length>0) {
        display_notes.innerHTML = html;
    }
    else {
        let nothing = `<ul><li><p class="nothing">No Notes in The DataBase. Use "Add Note" to add notes</li></ul></p>`
        display_notes.innerHTML = nothing;
    }


}

function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notes_array = [];
    }
    else {
        notes_array = JSON.parse(notes);
    }

    notes_array.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes_array));
    showNotes();


}

let search = document.getElementById('Search');
search.addEventListener("input", function () {

    let text = search.value.toLowerCase();

    let notesCards = document.getElementsByClassName('noteCard');

    Array.from(notesCards).forEach(function (element) {

        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
         console.log(`${text} - ------ ${cardText}`);

        if (cardText.includes(text)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })


})


