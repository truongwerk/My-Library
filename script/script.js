let myLibrary = [];
if (localStorage.length != 0) {
	myLibrary = JSON.parse(window.localStorage.getItem("library"));
}
function Books(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
	};


//Show  and hide form
const formDiv = document.querySelector("#formDiv");
const newBookBtn = document.querySelector("#newBook");
newBookBtn.addEventListener("click", function () {
	formDiv.style.display = "flex";
});
window.addEventListener("click", function (e) {
	if (e.target == formDiv) {
		formDiv.style.display = "none";
	}
});

//Add new book.
const newBookForm = document.querySelector("#newBookForm");
newBookForm.addEventListener("submit", submitNewBook);
function submitNewBook() {
	const title = document.getElementById("inputTitle").value;
	const author = document.getElementById("inputAuthor").value;
	const pages = document.getElementById("inputPages").value;
	const status = document.getElementById("inputStatus").value;
	const newBook = new Books(title, author, pages, status);
	myLibrary.push(newBook);
	document.getElementById("inputTitle").value = null;
	document.getElementById("inputAuthor").value = null;
	document.getElementById("inputPages").value = null;
	document.getElementById("inputStatus").value = "Not Read";
	formDiv.style.display = "none";
	displayBooks();
	console.table(myLibrary);
}

//Clear old display.
const container = document.querySelector("#container");
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

//Display books library.
function displayBooks() {
	removeAllChildNodes(container);
	for (let i = 0; i < myLibrary.length; i++) {
		let book = document.createElement("div");
		book.id = "book" + i;
		book.className = "book";
		container.appendChild(book);

		let title = document.createElement("h1");
		title.className = "title";
		title.textContent = `"${myLibrary[i].title}"`;
		book.appendChild(title);

		let author = document.createElement("h2");
		author.className = "author";
		author.textContent = `${myLibrary[i].author}`;
		book.appendChild(author);

		let pages = document.createElement("h3");
		pages.className = "pages";
		pages.textContent = `${myLibrary[i].pages} pages`;
		book.appendChild(pages);

		let status = document.createElement("button");
		status.dataset.bookIndex = i;
		status.className = choseClass(myLibrary[i].status);
		status.textContent = `${myLibrary[i].status}`;
		status.addEventListener("click", changeStatus);
		book.appendChild(status);

		let remove = document.createElement("button");
		remove.dataset.bookIndex = i;
		remove.addEventListener("click", removeButton);
		remove.className = "removeButton";
		remove.textContent = `Remove`;
		book.appendChild(remove);

		window.localStorage.setItem("library", JSON.stringify(myLibrary));
		console.log(localStorage);
	}
}

//Status buttons
function choseClass(status) {
	if (status == "Not Read") {
		return "statusNotRead";
	} else if (status == "Reading") {
		return "statusReading";
	} else {
		return "statusRead";
	}
}
function changeStatus() {
	let i = this.dataset.bookIndex;
	switch (myLibrary[i].status) {
		case "Not Read":
			myLibrary[i].status = "Reading";
			displayBooks();
			break;
		case "Reading":
			myLibrary[i].status = "Read";
			displayBooks();
			break;
		case "Read":
			myLibrary[i].status = "Not Read";
			displayBooks();
			break;
	}
}

//Remove button
function removeButton() {
	myLibrary.splice(this.dataset.bookIndex, 1);
	if (myLibrary.length == 0) {
		localStorage.clear();
	}
	displayBooks();
}

displayBooks();
