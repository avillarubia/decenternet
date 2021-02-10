import http from './http'

const base = 'registrations'

export async function register(payload) {
    const response = await http.post(base, payload)
    return response
}