import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { saveRequest } from '../services/allAPI'

const NewRequest = () => {

    const [requestDetails, setRequestDetails] = useState({
        title: '',
        description: '',
        location: '',
        contact: ''
    })

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        console.log(requestDetails)
        const response = await saveRequest(requestDetails)
        console.log(response)
    }

  return (
    <Container className="p-4">
      <h1 className="mb-4">New Request</h1>
      <p className="text-muted mb-4">
        Need help? Share your request with the community so volunteers can assist you. 
        Provide as much detail as possible to ensure quick and effective support.
      </p>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Request Title</Form.Label>
          <Form.Control onChange={(e) => setRequestDetails({...requestDetails, title: e.target.value})}
            type="text"
            id="title"
            name="title"
            placeholder="Brief description of what you need"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Detailed Description</Form.Label>
          <Form.Control onChange={(e) => setRequestDetails({...requestDetails, description: e.target.value})}
            as="textarea"
            id="description"
            name="description"
            rows={4}
            placeholder="Provide more details about your request..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control onChange={(e) => setRequestDetails({...requestDetails, location: e.target.value})}
            type="text"
            id="location"
            name="location"
            placeholder="Your location"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Information</Form.Label>
          <Form.Control onChange={(e) => setRequestDetails({...requestDetails, contact: e.target.value})}
            type="text"
            id="contact"
            name="contact"
            placeholder="How can volunteers reach you?"
            required
          />
        </Form.Group>

        <Button onClick={handleSubmit} type="submit" variant="primary" className="w-100">
          Submit Request
        </Button>
      </Form>
    </Container>
  )
}

export default NewRequest