import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.response.use(null,
    error => {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (axios.isCancel(expectedError)) return

        if (!expectedError) {
            // console.log(error)
        }

        return Promise.reject(error)
    }
)

function setJWT(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt
}

export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch,
    setJWT
}
