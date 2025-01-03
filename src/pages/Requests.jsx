import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap'
import { getAllRequests, getAllVolunteers, updateRequest } from '../services/allAPI'


const Requests = () => {
    const [requests, setRequests] = useState([])
    const [volunteers, setVolunteers] = useState([])
    

    useEffect(() => {
        fetchAllRequests()
        fetchAllVolunteers()
    }, [])

    const fetchAllRequests = async () => {
        const response = await getAllRequests()
        setRequests(response.data || [])
    }

    const fetchAllVolunteers = async () => {
        const response = await getAllVolunteers()
        setVolunteers(response.data || [])
    }

    const handleVolunteerAssignment = async (requestId, volunteer) => {
        const updatedRequest = {
            ...requests.find(r => r.id === requestId),
            assignedVolunteer: {
                id: volunteer.id,
                name: volunteer.name
            },
            status: 'assigned'
        }
        
        const response = await updateRequest(updatedRequest)
        if (response.status) {
            // Refresh the requests list
            fetchAllRequests()
        }
    }

    return (
        <Container>
            <h1>Active Requests</h1>
            <Row>
                {requests.filter(request => request.status !== 'assigned').map((request) => (
                    <Col md={4} key={request.id}>
                        <Card style={{ maxHeight: '300px', minHeight: '300px' }}>
                            <Card.Body>
                                <Card.Title>{request.title}</Card.Title>
                                <Card.Text>{request.description}</Card.Text>
                                <Card.Text>{request.location}</Card.Text>
                                <Card.Text>{request.contact}</Card.Text> 
                                
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Assign Volunteer
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {volunteers.map(volunteer => (
                                            <Dropdown.Item 
                                                key={volunteer.id}
                                                onClick={() => handleVolunteerAssignment(request.id, volunteer)}
                                            >
                                                {volunteer.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h1>Assigned Requests</h1>
            <Row>
                {requests.filter(request => request.status === 'assigned').map((request) => (
                    <Col md={4} key={request.id}>
                        <Card style={{ maxHeight: '300px', minHeight: '300px' }}>
                            <Card.Body>
                                <Card.Title>{request.title}</Card.Title>
                                <Card.Text>{request.description}</Card.Text>
                                <Card.Text>{request.location}</Card.Text>
                                <Card.Text>{request.contact}</Card.Text>
                                <Card.Text>
                                    Assigned to: {request.assignedVolunteer?.name}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Requests