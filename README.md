# M360ICT-nodejs-task

This is a server for managing a bookstore. The APIs of this server allow users to perform CRUD (Create, Read, Update, Delete) operations on books and authors.

## Technologies are used

- TypeScript
- Node.js
- Express.js
- MySQL
- Knex (query builder)

## Documentation

### How to set up the project in your local machine?

At first clone this repository using terminal of your local machine by using this command

```
git clone https://github.com/Tanvin-Ahmed/M360ICT-nodejs-task.git
```

Then run

```
year
```

or

```
npm install
```

Then create an env file with the following environment variables

```DB_HOST =
DB_USER =
DB_PASSWORD =
DB_SCHEMA =
```

After completing above, the project setup will be completed. Congratulations🎉

You don't need to create SQL Database or Schema or Table manually. When you run your project those are create automatically.

### API Endpoints

#### Book APIs

##### Create new book

```
POST http://localhost:8080/books
```

Pass required data to create new book. For example,

```
{
    "title": "Computer Fundamental",
    "description": "The basic of computer science and engineering",
    "published_date": "2023-07-25",
    "author_id": 2
}
```

##### Update book by id

```
PUT http://localhost:8080/books/:id
```

replace :id by book id

also need to pass valid data to update the book. For example,

```
{
    "title": "Computer Fundamental",
    "description": "The basic of computer science and engineering",
    "published_date": "2023-07-25",
    "author_id": 2
}
```

##### Get all books with pagination

You can pass any valid integer number as value of limit and page query parameters

```
GET http://localhost:8080/books?limit=5&page=0
```

##### Get book by id

```
GET http://localhost:8080/books/:id
```

replace :id by book id

##### Get all books of specific author

```
GET http://localhost:8080/books/author/:id
```

replace :id by author id

##### Get a book details with author information

```
GET http://localhost:8080/books/:id/details-with-author
```

replace :id by book id

##### Search books by title

```
GET http://localhost:8080/books/search?title=book-title
```

replace book-title by your search term

##### Delete book

```
DELETE http://localhost:8080/books/:id
```

replace :id by book id
