const http = require('http');
const url = require('url');
const connectDb = require('./connection');
const bookCol = require('./Model/Book');
const pageCol = require('./Model/Page');
const PORT = 5000;

//server
const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url, true).pathname;
  const queryObject = url.parse(req.url, true).query;
  res.setHeader('Access-Control-Allow-Origin', '*');
  let result = {};

  switch (pathname) {
    case '/books':
      if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (queryObject.isbn) {
          result = await bookCol
            .find({
              ISBN: queryObject.isbn,
            })
            .limit(1);
        } else if (queryObject.booktitle) {
          result = await bookCol.find({
            bookTitle: queryObject.booktitle,
          });
        } else {
          result = await bookCol.find().limit(20);
        }
        res.end(JSON.stringify(result));
      }

      if (req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end({ Status: 'success' });
        const cbook = new bookCol({
          ISBN: 1234567890123,
          title: 'mary poppins',
          publicationYear: 1936,
        });
        await cbook
          .save()
          .then(console.log('Book Created'))
          .catch((err) => {
            if (err && err.code === 11000) {
              console.log('ISBN exist');
              return;
            } else {
              console.log(err);
              return;
            }
          });
        res.end('Book created \n');
      }
      break;

    case `/pages`:
      if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (queryObject.pageid) {
          result = await pageCol.find({
            _id: queryObject.pageid,
          });
        } else if (queryObject.pagenumber && queryObject.isbn) {
          result = await pageCol.find({
            pageNumber: queryObject.pagenumber,
            ISBN: queryObject.isbn,
          });

          result = JSON.parse(JSON.stringify(result));

          const { a, b } = await getEdgePages(queryObject);

          result[0].firstPage = a;
          result[0].lastPage = b;
        } else if (
          queryObject.isbn &&
          queryObject.pageAmount &&
          queryObject.offset
        ) {
          try {
            result = await pageCol
              .find({
                ISBN: queryObject.isbn,
              })
              .select({ pageNumber: 1, ISBN: 1, _id: 0 })
              .skip(queryObject.offset * queryObject.pageAmount)
              .limit(parseInt(queryObject.pageAmount));
          } catch (error) {
            console.log(error);
          }
        } else {
          result = await pageCol.find().limit(20);
          res.end(JSON.stringify(result));
        }
        res.end(JSON.stringify(result));
      }
      break;

    case `/createbook`:
      const cbook = new bookCol({
        ISBN: 1234567890123,
        title: 'mary poppins',
        publicationYear: 1936,
      });

      try {
        await cbook.save().then(() => console.log('Book Created'));
      } catch (e) {
        if (e && e.code === 11000) {
          console.log('Ya existe un libro con este ISBN');
          return;
        } else {
          console.log(e);
          return;
        }
      }

      res.end('Book created \n');
      break;

    case `/createpage`:
      const cpage = new pageCol({
        ISBN: 2,
        pageenumber: 3,
        pageText:
          'prgjnoerjgierjgopejkroigeognmeoigneorgnoerngioerngoengorngoienrgoenboinononr',
      });
      try {
        await cpage.save().then(() => console.log('Page Created'));
      } catch (e) {
        if (e && e.code === 11000) {
          console.log(
            'La pagina con este numero ya existe para el libro con este ISBN'
          );
          return;
        } else {
          console.log(e);
          return;
        }
      }
      res.end('Page created \n');
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'Text/HTML' });
      res.end('<h1>404</h1>');
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});

async function getEdgePages(queryObject) {
  const a = await pageCol
    .findOne({
      ISBN: queryObject.isbn,
    })
    .sort({ pageNumber: 1 })
    .select({ pageNumber: 1, _id: 0 });
  const b = await pageCol
    .findOne({
      ISBN: queryObject.isbn,
    })
    .sort({ pageNumber: -1 })
    .select({ pageNumber: 1, _id: 0 });
  return { a, b };
}
