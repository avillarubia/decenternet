import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import jwt from 'jsonwebtoken'
import { login } from '../services/login'
import { storeUser } from './../redux/actions/index'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmitClick = async (e) => {
        e.preventDefault()

        const payload = {
            email,
            password
        }

        try {
            const { data } =
                await login(payload)

            localStorage.setItem('decenternet-exam', data)
            const decoded = jwt.decode(data)
            dispatch(storeUser(decoded))

            history.push('/list')
        } catch (error) {

        }
    }

    return (
        <Container>
            <div className='mt-5' />
            <Form>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant='primary' type='submit' onClick={e => handleSubmitClick(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Login;