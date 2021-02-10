import React from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import jwt from 'jsonwebtoken'
import { editABook } from '../services/book'

const EditBookForm = ({ showEdit, setShowEdit, bookToEdit, setBookToEdit, fetch }) => {
    const handleSubmitEditClick = async (e) => {
        e.preventDefault()

        //TODO:
        try {
            const decoded = jwt.decode(localStorage.getItem('decenternet-exam'))

            const payload = {
                _id: bookToEdit._id,
                title: bookToEdit.title,
                description: bookToEdit.description,
                author_id: decoded._id
            }

            await editABook(payload)
            fetch()
        } catch (error) {

        }

        setShowEdit(false)
    }

    return <>
        <Modal show={showEdit} onHide={() => setShowEdit(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit A Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control defaultValue={bookToEdit.title} onChange={e => setBookToEdit({ ...bookToEdit, ...{ title: e.target.value } })} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control defaultValue={bookToEdit.description} onChange={e => setBookToEdit({ ...bookToEdit, ...{ description: e.target.value } })} />
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={e => handleSubmitEditClick(e)}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => setShowEdit(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default EditBookForm;