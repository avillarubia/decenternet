const user = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_USER':
            state = action.user
            return state

        default: return state
    }
}

export default user