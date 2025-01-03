import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap'
import { getAllRequests } from '../services/allAPI'

const Requests = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        fetchAllRequests()
    }, [])

    const fetchAllRequests = async () => {
        const response = await getAllRequests()
        setRequests(response.data || [])
    }

    return (
        <Container>
            <h1>Active Requests</h1>
            <Row>
                {requests.map((request) => (
                    <Col md={4} key={request._id}>
                        <Card>
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
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Requests