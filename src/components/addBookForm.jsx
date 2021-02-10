import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import jwt from 'jsonwebtoken'
import { addABook } from '../services/book'

const AddBookForm = ({ show, setShow, fetch }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmitClick = async (e) => {
        e.preventDefault()

        //TODO:
        try {
            const decoded = jwt.decode(localStorage.getItem('decenternet-exam'))

            const payload = {
                title,
                description,
                author_id: decoded._id
            }

            await addABook(payload)
            fetch()
        } catch (error) {

        }

        setShow(false)
    }

    return <>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add A Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={e => setDescription(e.target.value)} />
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={e => handleSubmitClick(e)}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default AddBookForm;