const Book = require('./Model/Book');

class DB {
  constructor() {
    this.books = [];
    this.pages = [];
    //DB test data
    this.insertPage({
      id: 1,
      bookId: 2,
      pageNumber: 60,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a ipsum gravida, posuere urna id, sagittis nisl. In malesuada facilisis ligula, sed convallis enim suscipit non. Vestibulum sapien risus, tempus vel lobortis vel, venenatis sed metus. Phasellus fringilla elit sed sagittis lacinia. Nulla a consequat diam. Fusce viverra ex eu lacus mattis, ut egestas diam luctus. Aenean iaculis lectus sed mi rutrum, quis cursus ligula mattis. Phasellus pretium ultrices nulla. Praesent cursus, tellus vitae consequat luctus, sem massa lobortis dolor, ut porta nunc diam vel augue. Cras sodales justo erat, non porttitor diam consequat at. Ut pharetra lorem in mi pretium, lacinia finibus orci facilisis. Nulla facilisi. Aenean ornare nisi eget ligula ullamcorper venenatis. Duis velit libero, bibendum blandit eleifend blandit, dictum ut massa.',
    });
    this.insertPage({
      id: 2,
      bookId: 3,
      pageNumber: 2,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a ipsum gravida, posuere urna id, sagittis nisl. In malesuada facilisis ligula, sed convallis enim suscipit non. Vestibulum sapien risus, tempus vel lobortis vel, venenatis sed metus. Phasellus fringilla elit sed sagittis lacinia. Nulla a consequat diam. Fusce viverra ex eu lacus mattis, ut egestas diam luctus. Aenean iaculis lectus sed mi rutrum, quis cursus ligula mattis. Phasellus pretium ultrices nulla. Praesent cursus, tellus vitae consequat luctus, sem massa lobortis dolor, ut porta nunc diam vel augue. Cras sodales justo erat, non porttitor diam consequat at. Ut pharetra lorem in mi pretium, lacinia finibus orci facilisis. Nulla facilisi. Aenean ornare nisi eget ligula ullamcorper venenatis. Duis velit libero, bibendum blandit eleifend blandit, dictum ut massa.',
    });
    this.insertBook({ id: 1, title: 'Harry Potter', published: 1995 });
    this.insertBook({ id: 2, title: 'Narnia', published: 1999 });
    this.insertBook({ id: 3, title: 'Enders Game', published: 2005 });
    this.insertBook({ id: 4, title: 'Don Xijote', published: 2003 });
    this.updateBook(this.books[0], {
      title: 'Herry Petter',
      published: 1997,
      id: 0,
    });
    //db.deleteBook({ title: 'Harry Potter', published: 1995, id: 0 });
    console.log(this.books);
  }

  insertBook(book) {
    if (!book.id) {
      this.books.length;
    }
    this.books.push(book);
    console.log('book inserted');
  }

  insertPage(page) {
    if (!page.id) {
      this.pages.length;
    }
    this.pages.push(page);
    console.log('page inserted');
  }

  deleteBook(book) {
    this.books.splice(this.books.indexOf(book));
    console.log(`Deleted the book '${book.title}'`);
  }

  updateBook(book, newbook) {
    let index = this.books.indexOf(book);

    if (index >= 0) {
      this.books[index] = newbook;
      console.log(`Uptated the book '${book.title}'`);
    } else {
      console.log(`The book '${book.title}' was not found`);
    }
  }
}

module.exports = DB;
