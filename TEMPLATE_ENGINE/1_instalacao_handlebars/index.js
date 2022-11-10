const express = require("express");
const exphbs = require("express-handlebars");
const pool = require('./db/conn')

const app = express()
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})
app.engine('handlebars', hbs.engine)
app.set("view engine", "handlebars")
app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.listen(3000, () => {
    console.log('App funcionando!')
})

app.get("/book", (req, res) => {
    res.render("book");
});

app.post("/books/insertbook", (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}');`

    pool.query(sql, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/books')
        }

    })
});

app.get("/books", (req, res) => {
    const sql = `SELECT * FROM books;`
    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return err
        }
        const books = data
        console.log(data)
        res.render("books", { books });
    })
});

app.get("/books/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books where id = ${id};`
    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return err
        }
        const book = data[0]
        res.render("bookview", { book });
    })
});

app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books where id = ${id};`
    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return err
        }
        const book = data[0]
        res.render("editbook", { book });
    })
});

app.post("/books/updatebook", (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty
    const sql = `UPDATE books SET title = '${title}', pageqty='${pageqty}' WHERE id = ${id};`

    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return err
        }
        res.redirect("/books");
    })
});

app.post("/books/remove/:id", (req, res) => {
    const id = req.params.id
 
    const sql = `DELETE FROM books WHERE id = ${id};`

    pool.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return err
        }
        res.redirect("/books");
    })
});







app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: "Aprender Node",
            category: "Js",
            body: "Teste",
            coments: 4
        },
        {
            title: "Aprender PHP",
            category: "PHP",
            body: "Teste",
            coments: 5
        }
    ]
    res.render("blog", { posts })
})

app.get('/', (req, res) => {
    const user = {
        name: "Wagner",
        surname: "Parisoto"
    }

    const palavra = 'Teste'
    const auth = true

    res.render('home', { user: user, palavra, auth })
})



