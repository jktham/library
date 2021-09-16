const navInfo = document.querySelector("#nav-info");
const shelf = document.querySelector("#shelf");
const titleInput = document.querySelector("#input-title");
const authorInput = document.querySelector("#input-author");
const pagesInput = document.querySelector("#input-pages");
const readInput = document.querySelector("#input-read");
const inputForm = document.querySelector("#input-form");
const randomBookButton = document.querySelector("#random-book");
const deleteLibraryButton = document.querySelector("#delete-library");

let bookCardArr = [];
let bookDeleteArr = [];
let bookToggleArr = [];
let library = getStorage();

updateShelf(library);

inputForm.addEventListener("submit", () => {
    if (inputForm.checkValidity()) {
        addBook(titleInput.value, authorInput.value, parseInt(pagesInput.value), readInput.checked);
        updateShelf(library);
        inputForm.reset();
    }
});

randomBookButton.addEventListener("click", () => {
    let randomTitles = ["A Game of Thrones", "Harry Potter and the Chamber of Secrets", "To Kill a Mockingbird", "The Great Gatsby", "Frankenstein", "Faust", "The Lord of the Rings"];
    let randomAuthors = ["George R. R. Martin", "J. K. Rowling", "Harper Lee", "F. Scott Fitzgerald", "Mary Shelley", "Johann Wolfgang von Goethe", "J. R. R. Tolkien"];
    let randomIndex = Math.floor(Math.random()*randomTitles.length);
    let randomTitle = randomTitles[randomIndex];
    let randomAuthor = randomAuthors[randomIndex];
    let randomPage = Math.floor(Math.random()*1000);
    let randomRead = Math.random() < 0.5;
    addBook(randomTitle, randomAuthor, randomPage, randomRead);
    updateShelf(library);
});

deleteLibraryButton.addEventListener("click", () => {
    library = [];
    updateShelf(library);
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    library.push(book);
}

function updateShelf(lib) {
    shelf.innerHTML = "";
    navInfo.innerHTML = "";

    addCards(lib);
    addInfo(lib);
    setStorage(lib);
}

function addCards(lib) {
    for (let i=0; i<lib.length; i++) {        
        let bookLabel = document.createElement("div");
        bookLabel.textContent = i;
        bookLabel.classList.add("book-label");
        
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.index = i;

        let bookTitle = document.createElement("span");
        bookTitle.textContent = lib[i].title;
        bookTitle.classList.add("book-title");

        let bookAuthor = document.createElement("span");
        bookAuthor.textContent = lib[i].author;
        bookAuthor.classList.add("book-author");

        let bookPages = document.createElement("span");
        bookPages.textContent = lib[i].pages + " pages";
        bookPages.classList.add("book-pages");

        let bookRead = document.createElement("span");
        bookRead.textContent = lib[i].read ? "Read" : "Not Read";
        bookRead.classList.add("book-read");

        let bookDelete = document.createElement("button");
        bookDelete.textContent = "✕";
        bookDelete.classList.add("book-delete");

        let bookToggle = document.createElement("button");
        bookToggle.textContent = "🗏";
        bookToggle.classList.add("book-toggle");

        shelf.appendChild(bookCard);
        bookCard.appendChild(bookLabel);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(bookDelete);
        bookCard.appendChild(bookToggle);
    }

    bookCardArr = Array.from(document.querySelectorAll(".book-card"));
    bookDeleteArr = Array.from(document.querySelectorAll(".book-delete"));
    bookToggleArr = Array.from(document.querySelectorAll(".book-toggle"));
    
    for (let i=0; i<bookCardArr.length; i++) {
        bookCardArr[i].addEventListener("mouseover", () => {
            bookDeleteArr[i].style.opacity = "1";
            bookToggleArr[i].style.opacity = "1";
        });
        bookCardArr[i].addEventListener("mouseleave", () => {
            bookDeleteArr[i].style.opacity = "0";
            bookToggleArr[i].style.opacity = "0";
        });
        bookDeleteArr[i].addEventListener("click", () => {
            library.splice(i, 1);
            updateShelf(library);
        });
        bookToggleArr[i].addEventListener("click", () => {
            lib[i].toggleRead();
            updateShelf(library);
        });
    }
}

function addInfo(lib) {
    let totalBooksRead = 0;
    let totalPages = 0;
    let totalPagesRead = 0;

    for (let i=0; i<library.length; i++) {
        totalBooksRead += lib[i].read;
        totalPages += lib[i].pages;
        totalPagesRead += lib[i].pages * lib[i].read;
    }

    let infoBooks = document.createElement("span");
    infoBooks.textContent = `Books: ${totalBooksRead} / ${lib.length}`;
    infoBooks.id = "info-books";
    navInfo.appendChild(infoBooks);

    let infoPages = document.createElement("span");
    infoPages.textContent = `Pages: ${totalPagesRead} / ${totalPages}`;
    infoPages.id = "info-pages";
    navInfo.appendChild(infoPages);
}

function setStorage(lib) {
    localStorage.clear();
    localStorage.setItem("books", JSON.stringify(lib));
}

function getStorage() {
    if (localStorage["books"]) {
        lib = JSON.parse(localStorage.getItem("books"));
        for (let i=0; i<lib.length; i++) {
            Object.setPrototypeOf(lib[i], Book.prototype);
        }
    } else {
        lib = [];
    }
    return lib;
}
