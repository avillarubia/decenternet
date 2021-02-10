import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact'
import { getAllBooks, deleteABook, } from '../services/book'
import EditBookForm from './editBookForm';
import AddBookForm from './addBookForm';

import '@fortawesome/fontawesome-free/css/all.min.css'

const List = () => {
    const [tableData, setTableData] = useState({})
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [bookToEdit, setBookToEdit] = useState({});

    const selector = useSelector(s => s)

    useEffect(() => {
        fetch()
    }, [])

    async function fetch() {
        try {
            const { data } = await getAllBooks()

            prepareTableData(data)
        } catch (error) {
        }
    }

    function prepareTableData(data) {
        const book = data[0]
        const keys = Object.keys(book)

        keys.pop()
        keys.pop()
        keys.pop()
        keys.pop()

        keys.push('delete')
        keys.push('edit')
        const columns = []

        renderDeleteButton(data)
        renderEditButton(data)

        keys.forEach(key => {
            const label = key.replace('_', ' ')

            let column
            if (label.toLowerCase() === 'delete' || label.toLowerCase() === 'edit') {
                column = {
                    label: '',
                    field: key
                }
            }

            else {
                column = {
                    label: label,
                    field: key
                }
            }

            columns.push(column)
        })

        setTableData({ columns, rows: data })
    }

    const handleDeleteLabelClick = async (_id) => {
        await deleteABook(_id)
        const { data } = await getAllBooks()

        const _books = data.filter(book => book._id !== _id)
        prepareTableData(_books)
    }

    function renderDeleteButton(data) {
        data.forEach(book => {
            book.delete = renderDeleteLabel(book._id)
        })

        function renderDeleteLabel(_id) {
            return <p onClick={() => handleDeleteLabelClick(_id)}>delete</p>
        }
    }

    const handleEditClick = (book) => {
        setShowEdit(true)
        setBookToEdit(book)
    }

    function renderEditButton(data) {
        data.forEach(book => {
            book.edit = renderEditLabel(book)
        })

        function renderEditLabel(book) {
            return <p onClick={() => handleEditClick(book)}>edit</p>
        }
    }

    return <>
        <AddBookForm show={show} setShow={setShow} fetch={fetch} />
        <EditBookForm
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            bookToEdit={bookToEdit}
            setBookToEdit={setBookToEdit}
            fetch={fetch}
        />

        <div className='p-5'>
            <p>Hi {selector.user.name}!</p>
            <div className='mt-4'>
                <Button onClick={() => setShow(true)}>Add</Button>
                <MDBDataTableV5
                    hover
                    entriesOptions={[5, 10, 20, 25, 50]}
                    entries={5}
                    pagesAmount={4}
                    data={tableData}
                    fullPagination
                />
            </div>
        </div>
    </>
}

export default List;