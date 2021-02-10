import http from './http'

const base = 'logins'

export async function login(payload) {
    const response = await http.post(base, payload)
    return response
}