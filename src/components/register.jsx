import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { register } from '../services/register'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmitClick = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            email,
            password
        }

        try {
            await register(payload)
        } catch (error) {
        }
    }

    return (
        <Container>
            <div className='mt-5' />
            <Form>
                <Form.Group controlId='formBasicName'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder='Enter full name' onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' onChange={e => setEmail(e.target.value)} />
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else.
                    </Form.Text>
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

export default Register;