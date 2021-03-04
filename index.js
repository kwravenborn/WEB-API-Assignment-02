const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.use(express.json())
let books = []

const url = 'mongodb+srv://superAdmin:palmza551@cluster0.aoswi.mongodb.net/storebook?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db,bookscollection

async function connect(){
    await client.connect()
    db = client.db('storebook')
    bookscollection = db.collection('books')
}
connect()

app.get('/books/:id', (req, res) =>{
    //input
    let id = req.params.id
    console.log(`id: ${id}`)

    let book = {}

    //process
    book = books[id]

    //output
    res.status(200).json(book)
})

app.post('/books', async (req, res) => { 

    //input
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
    const result = await bookscollection.insertOne(newBook)
    booksID = result.insertedId

    //output
    res.status(201).json(booksID)
})

const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))