const express = require('express')
const app = express()

app.use(express.json())
let books = []

app.post('/books', (req, res) => { 

    //input*
    let title = req.body.title
    let price = req.body.price
    let unit = req.body.unit
    let isbn = req.body.isbn
    let imageurl = req.body.imageurl

    let newBook = {
        title: title,
        price: price,
        unit: unit,
        isbn: isbn,
        imageurl: imageurl
    }
    let booksID = 0

    //process
    books.push(newBook)
    booksID = books.length - 1

    //output*
    res.status(201).json(booksID)
})

const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))