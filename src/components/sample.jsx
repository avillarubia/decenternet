import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, FormControl, Modal, Button, Form } from 'react-bootstrap'
import { getAllBooks, deleteABook, editABook } from '../services/book'

const Sample = () => {
    const [books, setBooks] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [show, setShow] = useState(false);
    const [bookToEdit, setBookToEdit] = useState({});

    const fetch = async () => {
        try {
            const { data } = await getAllBooks()
            console.log('==========TEST', groupBy(data, 2))

            setBooks(data)

            const book = data[0]
            const keys = Object.keys(book)
            setHeaders(keys)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const handleDeleteClick = async (_id) => {
        await deleteABook(_id)

        const _books = books.filter(book => book._id !== _id)
        setBooks(_books)
    }

    const handleEditClick = (book) => {
        handleShow()
        setBookToEdit(book)
    }

    const renderCellValue = (book) => {
        const values = Object.values(book)

        return <tr>
            <td onClick={() => handleEditClick(book)}>edit</td>
            <td onClick={() => handleDeleteClick(book._id)}>delete</td>
            {
                headers.map((header, index) =>
                    <td>{values[index]}</td>
                )
            }
        </tr>
    }

    const handleSearchChange = async (e) => {
        const { data } = await getAllBooks()

        const _books = []

        data.map(book => {
            const values = Object.values(book)
            const rowString = values.join(' ')

            if (rowString.includes(e.target.value)) {
                _books.push(book)
            }
        })

        setBooks(_books)
    }

    const renderEditForm = () => {
        const bookFields = Object.keys(bookToEdit)
        const bookDetails = Object.values(bookToEdit)

        return bookDetails.map((bookDetail, index) =>
            <Form.Group >
                <Form.Label>{bookFields[index]}</Form.Label>
                <Form.Control defaultValue={bookDetail} />
            </Form.Group>
        )
    }

    const handleClose = () => {
        setShow(false);
        //editABook()
    }

    const handleShow = () => setShow(true);

    const handleFormSubmitClick = async (e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        const object = {};
        form.forEach(function (value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);
        console.log(json)
    }

    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit A Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => handleFormSubmitClick(e)}>
                        {renderEditForm()}
                        <Button variant='primary' type='submit' >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <InputGroup className='mb-3'>
                <FormControl
                    placeholder='Username'
                    aria-label='Username'
                    aria-describedby='basic-addon1'
                    onChange={handleSearchChange}
                />
            </InputGroup>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {
                            headers.map(header => <th>{header}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => renderCellValue(book))
                    }
                </tbody>
            </Table>
            <p>
                <span className='mr-3'>Previous</span>
                <span>Next</span>
            </p>
        </Container>
    );
}

export default Sample;