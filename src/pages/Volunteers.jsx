import React, { useState } from 'react'   
import { Container, Form } from 'react-bootstrap'
import { saveVolunteer } from '../services/allAPI'

const Volunteers = () => {

    const [volunteerDetails, setVolunteerDetails] = useState({
        name: '',
        phone: '',
        email: '',
        age: '',
        gender: '',
        location: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await saveVolunteer(volunteerDetails)
        console.log(response)
    }
  return (
    <>
    
    <Container>
        <h1>Volunteer Registration</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control onChange={(e) => setVolunteerDetails({...volunteerDetails, name: e.target.value})} type="text" placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={(e) => setVolunteerDetails({...volunteerDetails, phone: e.target.value})} type="tel" placeholder="Enter your phone number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => setVolunteerDetails({...volunteerDetails, email: e.target.value})} type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control onChange={(e) => setVolunteerDetails({...volunteerDetails, age: e.target.value})} type="number" placeholder="Enter your age" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select onChange={(e) => setVolunteerDetails({...volunteerDetails, gender: e.target.value})}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control onChange={(e) => setVolunteerDetails({...volunteerDetails, location: e.target.value})} type="text" placeholder="Enter your location" />
          </Form.Group>

          <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </Form>
    </Container>
    </>
    
  )
}

export default Volunteers