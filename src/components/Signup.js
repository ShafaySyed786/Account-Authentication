import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmationRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
    
        if(passwordRef.current.value !== confirmationRef.current.value){
            return setError('Passwords are not the same!')
        }
    
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch(error){
            console.log(error)
            setError("Failed to signup")
        }
    
        setLoading(false)
    }
    

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">
                    Sign Up
                </h2>
                
                {error && <Alert variant = "danger">{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type = "email" ref = {emailRef} required />
                    </Form.Group>
                    <Form.Group id = "password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" ref = {passwordRef} required />
                    </Form.Group>
                    <Form.Group id = "confirmation">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type = "password" ref = {confirmationRef} required />
                    </Form.Group>
                    <Button disabled={loading} className = "w-100" type = "submit">
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className = "w-100 text-center mt-2">
            Already made an account? <Link to="/login">Login here</Link>
        </div>
    </>
  )
}