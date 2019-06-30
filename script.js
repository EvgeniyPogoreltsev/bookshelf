    $('#add-book').on('click', function () {
	$('.popup').fadeIn(400);
    });

    $('#cancel').on('click', function () {
	$('.popup').fadeOut(400);
    });

    var books = {};
    $(document).ready(function(){
	    $('#add-book-to-library').on('click', addBookToLibrary);
    });
    $('#add-book-to-library').on('click', function () {
	    $('.popup').fadeOut(400);
    });

    function addBookToLibrary()
    {
	var formData = $('form').serializeArray();
	var rewrittenFormData = [];
	for (key in formData) {
		rewrittenFormData[formData[key]['name']] = formData[key]['value']; 
	}
	var elem = document.getElementById('elem');
	var data = $(this).attr('data');
	if (!data) {
	    var bookId = Math.round(Math.random()*200000); // исправил возможное повторение id
	    books[bookId] = rewrittenFormData;
	    bookShelf(elem,bookId);
	} else {
		books[data] = rewrittenFormData;
		bookShelf(elem, data);
	}
	    console.log(books);	
    }
	
	function bookShelf(parent, book) 
	{
		var table = document.createElement('table');
		table.className = 'book-shelf';
		
	    var tr = document.createElement('tr');
		table.setAttribute('data', book);		
		var bookImage = document.createElement('td');
		bookImage.className = 'book-image';
		bookImage.innerHTML = books[book]['book-image'];
								
		var bookAuthor = document.createElement('td');
		bookAuthor.className = 'book-author';
		bookAuthor.innerHTML = books[book]['book-author'];
		
		var bookName = document.createElement('td');
		bookName.className = 'book-name';
		bookName.innerHTML = books[book]['book-name'];
				
		var bookYear = document.createElement('td');
		bookYear.className = 'book-year';
		bookYear.innerHTML = books[book]['book-year'];
						
		var buttonChange = document.createElement('button');
		buttonChange.className = 'button-change';
		buttonChange.innerHTML = 'Изменить';
		buttonChange.onclick = changeBook;
		buttonChange.setAttribute('data', book);
				
		var buttonDelete = document.createElement('button');
		buttonDelete.className = 'button-delete';
		buttonDelete.onclick = deleteBook;
		buttonDelete.innerHTML = 'Удалить книгу';
				
		tr.appendChild(bookAuthor);
		tr.appendChild(bookImage);
		tr.appendChild(bookName);
		tr.appendChild(bookYear);
					
	    table.appendChild(tr);
		table.appendChild(buttonChange);
		table.appendChild(buttonDelete);
	    parent.appendChild(table);			
	}
	
	//Метод, который должен реализовывать заполнение книжной полки парой книг по умолчанию (метод работает, если просто реализовать его в другом файле, но в этом коде не работает,
	// не пойму почему отваливается ошибка cannot read length или undefined.)
	var defaultBooks = [['Картинка книги', 'А.С. Пушкин', 'Евгений Онегин', '2001'], ['Обложка книги', 'Н.В. Гоголь', 'Ревизор', '1990']];	
	var table = document.querySelector('#book-shelf');
	fillTable(defaultBooks, table);
	
	function fillTable(defaultBooks,table){    
		for (var i =0; i < defaultBooks.length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < defaultBooks.length[i]; j++) {
				var td = document.createElement('td');
				td.innerHTML = defaultBooks[i][j];
				tr.appendChild(td);
			}
		table.appendChild(tr);
		}
	}
		
	function changeBook() 
	{
		var data = $(this).attr('data');
		console.log(data);
		$('.popup').fadeIn(400);
		$('form #book-image').val(books[data]['book-image']);
		$('form #book-name').val(books[data]['book-name']);
		$('form #book-year').val(books[data]['book-year']);
		$('form #book-author').val(books[data]['book-author']);
		$('#add-book-to-library').attr('data', data);
	}
	
	function deleteBook() 
	{
		$(this).parent('.book-shelf').remove();
	}
	
	

