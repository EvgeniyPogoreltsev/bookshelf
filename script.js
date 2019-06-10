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
	
	var anotherFormData = [];
	for (key in formData) {
		anotherFormData[formData[key]['name']] = formData[key]['value']; 
	}
	var elem = document.getElementById('elem');
	var data = $(this).attr('data');
	if (!data) {
	var bookId = Math.round(Math.random()*100);
	books[bookId] = anotherFormData;
	bookShelf(elem,bookId);
	} else {
		books[data] = anotherFormData;
		bookShelf(elem, data);
	}
	console.log(books);	
}
	
	function bookShelf(parent, bookId) {
		var book = $('.book-shelf')
		
		var table = document.createElement('table');
		table.className = 'book-shelf';
		
			var tr = document.createElement('tr');
			table.setAttribute('data', bookId);
				
				var bookImage = document.createElement('td');
				bookImage.className = 'book-image';
				bookImage.innerHTML = books[bookId]['book-image'];
				
				
				var bookAuthor = document.createElement('td');
				bookAuthor.className = 'book-author';
				bookAuthor.innerHTML = books[bookId]['book-author'];
		
				var bookName = document.createElement('td');
				bookName.className = 'book-name';
				bookName.innerHTML = books[bookId]['book-name'];
				
				var bookYear = document.createElement('td');
				bookYear.className = 'book-year';
				bookYear.innerHTML = books[bookId]['book-year'];
				
				var buttonChange = document.createElement('button');
				buttonChange.className = 'button-change';
				buttonChange.innerHTML = 'Изменить';
				buttonChange.onclick = changeBook;
				buttonChange.setAttribute('data', bookId);
				
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
	
	function deleteBook() {
		$(this).parent('.book-shelf').remove();
	}
	
	

