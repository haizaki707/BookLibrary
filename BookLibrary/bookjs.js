let newBookBtn = document.getElementById('newBtn');
let cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener("click", function() {
    document.getElementById('formPopup').style.display = "block";
})

cancelBtn.addEventListener("click", function() {
    document.getElementById('formPopup').style.display = "none";
})

let bookTitle = document.getElementById('bookTitle');
let bookAuthor = document.getElementById('bookAuthor');
let bookPage = document.getElementById('bookPage');
let bookStatus = document.getElementById('bookStatus');
let bookButton = document.getElementById('bookButton');
let displayShow = document.getElementById('smt');
let radioYes = document.getElementById('radioYes');
let radioNo = document.getElementById('radioNo');

let yesSwitch = 0;
let noSwitch = 0;

radioYes.addEventListener("click", function() {
    yesSwitch = 1;
    noSwitch = 0;
    radioYes.style.backgroundColor="brown";
    radioNo.style.backgroundColor="white";
})

radioNo.addEventListener("click", function() {
    yesSwitch = 0;
    noSwitch = 1;
    radioNo.style.backgroundColor="brown";
    radioYes.style.backgroundColor="white";
})

let myLibrary = [];

function Book(title, author, pages, check) {
    this.title = title
    this.author = 'by ' + author
    this.pages = pages +' pages'
    this.status = "Have You Read The Book?"
    this.check = check
};

let pushTitle = '';
let pushAuthor = '';
let pushPage = '';
let pushStatus = '';
function addBookToLibrary() {
    if(bookTitle.value === "" || bookAuthor.value === "" || bookPage.value === "" || yesSwitch === 0 && noSwitch === 0) {return alert("Please fill in the inputs & select the options")};
    pushTitle = bookTitle.value;
    pushAuthor = bookAuthor.value;
    pushPage = bookPage.value;
    if(yesSwitch === 1) {
        pushStatus = "I've read it";
    } if(noSwitch === 1) {
        pushStatus = "No, I haven't read it";
    }
        newBook = new Book(pushTitle, pushAuthor, pushPage, pushStatus);
    myLibrary.push(newBook);
    console.log(myLibrary);
    return myLibrary;
};

function render() {
    displayShow.innerHTML='';
    myLibrary.forEach((newBook, index) => {
        let div = document.createElement('div');
        div.classList.add('divCard'+index);
         div.setAttribute('id', 'divcard');
         div.setAttribute('data-book', index);
         div.style.width="180px";
         div.style.height="220px";
         div.style.border="solid black 3px";
         div.style.padding="5px";
    
        let divTitle = document.createElement('h1');
        divTitle.classList.add('title');
        divTitle.textContent = newBook.title;
        div.appendChild(divTitle);
    
        let divAuthor = document.createElement('p');
        divAuthor.classList.add('author');
        divAuthor.textContent = newBook.author;
        div.appendChild(divAuthor);
    
        let divPage = document.createElement('p');
        divPage.classList.add('pages');
        divPage.textContent = newBook.pages;
        div.appendChild(divPage);
    
        let divStatus = document.createElement('p');
        divStatus.classList.add('status'+index);
        divStatus.setAttribute('id', 'stats'+index)
        divStatus.textContent = newBook.status;
        div.appendChild(divStatus);

        let checkButton = document.createElement('button');
        checkButton.classList.add('checkButton');
        checkButton.innerText = newBook.check;
        // if(newBook.check == "I've read it") {
        //     checkButton.style.backgroundColor="green"
        // } else {
        //     checkButton.style.backgroundColor="red"
        // }
        checkButton.setAttribute("data-check", index);
        
        const delButton = document.createElement('button');
        delButton.classList.add('delButton');
        delButton.innerText = 'Delete';
        delButton.setAttribute("data-delete", index);

        let okay = index;

        function status(){
            let brandNew = myLibrary[okay];
            if(brandNew.check == "I've read it"){
                brandNew.check = "No, I haven't read it"
                checkButton.style.backgroundColor="red"
            } else {
                brandNew.check = "I've read it";
                checkButton.style.backgroundColor="green"
            }

            render();
            let newArray = Array.from(new Set(myLibrary));
            console.log(newArray);
            bookTitle.value = "";
            bookAuthor.value = "";
            bookPage.value = "";
            yesSwitch = 0
            noSwitch = 0
            radioYes.style.backgroundColor="white";
            radioNo.style.backgroundColor="white";

        };

        function deleteBook(index) {
            myLibrary.splice(index, 1);
            div.parentNode.removeChild(div);
            render();
        };

        div.appendChild(checkButton);
        div.appendChild(delButton);

        displayShow.appendChild(div);

        delButton.addEventListener("click", deleteBook);
        checkButton.addEventListener("click", status);
    })
    };


let buttonClick = bookButton.addEventListener("click", function() {
    addBookToLibrary();
    if(addBookToLibrary === undefined) {
        return "Error, please fill the form correctly!"
    } else {
        render();
        let newArray = Array.from(new Set(myLibrary));
        console.log(newArray);
        bookTitle.value = "";
        bookAuthor.value = "";
        bookPage.value = "";
        yesSwitch = 0
        noSwitch = 0
        radioYes.style.backgroundColor="white";
        radioNo.style.backgroundColor="white";
    };
});
