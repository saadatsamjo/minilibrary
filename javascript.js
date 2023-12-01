// ====================================================================//
//books object array 
// ====================================================================//
const myLibrary = [];

// book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// button to show 6 cards max if more than 3 cards available
$('#see-more-button').on('click', function(){
    // seemore() loops through the library array, max 6 items
    seeMore(myLibrary);

    $('#see-more-button').css({
        'display':'none',
    })

    $('#view-latest-button').css({
        'display':'block'
    })
})


// clicking view lates button= calling loopThrough, ie default display, ie 3 cards
// ====================================================================//
$('#view-latest-button').on('click', function(){
    loopThrough(myLibrary);
    $('#view-latest-button').css({
        'display':'none'
    })
})





// ====================================================================//
// the function to loop through 3 max and display 3max
// ====================================================================//

function loopThrough(myLibrary) {
    $('.library-books').empty();
    $('.overlay').fadeOut();
    $('#view-latest-button').css({
        'display':'none'
    })

    // Calculate the starting index based on the length of myLibrary
    let startIndex = Math.max(myLibrary.length - 3, 0);

    if (myLibrary.length>3) {
        $('.see-more-div').css({
            
            'width': '800px',
            'margin': '0 auto',
            'display': 'flex',
            'justify-content': 'end',
            'padding':'10px'
        });
        $('#see-more-button').css({
            'display':'block',
        })
        
    }

    for (let i = myLibrary.length - 1; i >= startIndex; i--) {
        let book = myLibrary[i];
        let bookId = i.toString().replace(/\s+/g, '');

        // Creating a new book card (some html) 
        let bookCard = `
        <div class="book-card" style="border-radius:10px">
                <div class="book-title-div">
                    <i class="icon fa fa-bars"></i>
                    <h1>${book.title}</h1>
                </div>
                <div class="book-author-div">
                    <p>${book.author}</p>
                </div>
                <div class="book-footer-div">
                    <p class="book-pages">${book.pages} Pages</p>
                    <p id='${bookId}'>${book.read ? 'Done' : 'Not Yet'}</p>
                </div>
            </div>
        `;

        $('.book-card').css({
            'display': 'flex',
            'flex-direction': 'column',
            'margin': '10px',
            'width': '250px',
            'border-radius': '10px'
        });
        
        $('.library-books').append(bookCard);
        $(`#${bookId}`).addClass(book.read ? 'yes' : 'no');
    }
}

// ====================================================================//
// see more than 3 books
// ====================================================================//

function seeMore(myLibrary) {
    $('.library-books').empty();
    // Calculate the starting index based on the length of myLibrary
    let startIndex = Math.max(myLibrary.length - 6, 0);

    for (let i = myLibrary.length - 1; i >= startIndex; i--) {
        let book = myLibrary[i];
        let bookId = i.toString().replace(/\s+/g, '');

        // Create a new book card (some html) 
        let bookCard = `
        <div class="book-card" style="border-radius:10px">
                <div class="book-title-div">
                    <i class="icon fa fa-bars"></i>
                    <h1>${book.title}</h1>
                </div>
                <div class="book-author-div">
                    <p>${book.author}</p>
                </div>
                <div class="book-footer-div">
                    <p class="book-pages">${book.pages} Pages</p>
                    <p id='${bookId}'>${book.read ? 'Done' : 'Not Yet'}</p>
                </div>
            </div>
        `;

        $('.book-card').css({
            'display': 'flex',
            'flex-direction': 'column',
            'margin': '10px',
            'width': '250px',
            'border-radius': '10px'
        });
        
        $('.library-books').append(bookCard);
        $(`#${bookId}`).addClass(book.read ? 'yes' : 'no');
    }
}


// ====================================================================//
//documet ready, jquery
// ====================================================================//
$(document).ready(function () {

    //hiding the newbook form
    $('#new-book-btn').on('click', function () {
    
        // showing overlay to add focus on the form
        $('.overlay').fadeIn();


        // styling of the new book form
        $('#new-book-form').css({
            'gap': '20px',
            'display': 'flex',
            'flex-direction': 'column',
            'padding': '20px',
            'height': '550px',
            'background-color': 'var(--primary-color)',
            // 'background-color': 'blue',
            'border-radius': '14px'
        });
    
        $('#add-book-btn').css({
            'padding': '10px 0px',
            'width': '150px',
            'margin': '50px auto 0px auto',
        });
    });
    

    $('#new-book-form').submit(function (event) {
        event.preventDefault(); // prevent the form from submitting
        
        createBook(); // Call the createBook function
    });

    // collects form info, instatiates new book object, pushes the object to myLibrary array
    function createBook() {
        $('#new-book-form').css('display', 'none');
        let newBook = new Book(
            $('#title').val(),
            $('#author').val(), 
            $('#pages').val(),
            $('#read').prop('checked')
        );
        myLibrary.push(newBook);
        loopThrough(myLibrary);
    }
})

