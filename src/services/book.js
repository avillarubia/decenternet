import http from './http'

const base = 'books'

const config = {
    headers: {
        'x-auth-token': localStorage.getItem('decenternet-exam')
    }
}

export async function getAllBooks() {
    const response = await http.get(base, config)
    return response
}

export async function deleteABook(_id) {
    const response = await http.delete(`${base}/${_id}`, config)
    return response
}

export async function editABook(book) {
    const response = await http.patch(base, book, config)
    return response
}

export async function addABook(book) {
    const response = await http.post(base, book, config)
    return response
}