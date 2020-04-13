let library = [];
const localLibrary = JSON.parse(localStorage.getItem('library') || '[]');
let defaultBooks = JSON.parse(localStorage.getItem('defaultBooks'));

window.addEventListener('load', function(e) {  
    library=[];
    localLibrary.forEach((book) => {
        library.push(book);
    });
    populateStorage();
    render();
  });

function populateStorage() {

    if (library.length==0) {
    let book1 = new Book ("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book ("The Old Man and the Sea", "Ernest Hemingway", "127", true);
    library.push(book1);
    library.push(book2);
    localStorage.setItem('library', JSON.stringify(library));
    render();
    }
}

function addBookToLibrary(book) {
    let book1 = new Book ("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book ("The Old Man and the Sea", "Ernest Hemingway", "127", true);
    library.push(book1);
    library.push(book2);
    library.push(book);
    localStorage.setItem('library', JSON.stringify(library));
}

function removeBookFromLibrary(index) {
    library.splice(index, 1);
    localStorage.setItem('library', JSON.stringify(library));
    render();
}

function Book(title, author, published, didRead) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.didRead = didRead;
}

let addButton = document.getElementById("addButton");
let title = document.getElementById('title');
let author = document.getElementById('author');
let published = document.getElementById('published');
let didread = document.getElementById('read');

function render() {
    let booksContainer = document.getElementById("book-table");
    let rowsNumber = booksContainer.rows.length;
    //delete old table
    for (let n=rowsNumber-1; n>0; n--){
        booksContainer.deleteRow(n);
    }

    
    
    library.forEach((book,index) => {

    let row = booksContainer.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = library[index].title;
    cell2.innerHTML = library[index].author;
    cell3.innerHTML = library[index].published;

    let readButton= document.createElement("button");
    readButton.id=index;
    readButton.className="btn btn-success";
    cell4.appendChild(readButton);
    let readStatus="";
    if (library[index].didRead==1) {readStatus="Yes"} else {readStatus="No"};
    readButton.innerHTML=readStatus;


    readButton.addEventListener("click", function() {
        library[index].didRead= !(library[index].didRead)
        // control: alert (myLibrary[i].check);
        localStorage.setItem('library', JSON.stringify(library));
        render();
    });

    //add delete button to every row and render again
    let deleteButton= document.createElement("button");
    deleteButton.id=index+5;
    cell5.appendChild(deleteButton);
    deleteButton.className="btn btn-warning";
    deleteButton.innerHTML="Delete";

    deleteButton.addEventListener("click", function () {
    alert(`You've deleted title: ${library[index].title}`);
    removeBookFromLibrary(index);
    render();
    });

   });
}

let closeFormButton = document.querySelector('#close-form-button');
let isFormOpen = false;
const form = document.querySelector('#new-book-form');
function toggleForm(event) {
    isFormOpen = !isFormOpen;
    form.className = isFormOpen ? 'card-body d-block' : 'card-body d-none';
    event.target.innerText = isFormOpen ? 'Close' : 'Open';
}
//closeFormButton.addEventListener('click', toggleForm);


addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(new Book(
        title.value,
        author.value,
        parseInt(published.value, 10),
        read.checked
    ));
    resetFields();
    render();
});

function resetFields() {
    title.value = '';
    author.value = '';
    published.value = '';
    read.checked = false;
}

render();