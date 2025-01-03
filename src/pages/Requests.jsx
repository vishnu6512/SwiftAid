import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap'
import { getAllRequests, getAllVolunteers, updateRequest, deleteRequest } from '../services/allAPI'
import { Trash } from 'react-bootstrap-icons'


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

    const handleDeleteRequest = async (requestId) => {
        const response = await deleteRequest(requestId)
        if (response.status) {
            fetchAllRequests()
        }
    }

    const styles = {
        title: {
            color: '#1a237e',
            borderBottom: '3px solid #e53935',
            display: 'inline-block',
            paddingBottom: '5px',
            marginBottom: '2rem'
        },
        card: {
            transition: 'transform 0.2s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: 'none',
            height: '100%',
            position: 'relative',
            ':hover': {
                transform: 'translateY(-5px)'
            }
        },
        cardTitle: {
            color: '#1a237e',
            fontWeight: '600'
        },
        cardText: {
            color: '#424242'
        },
        dropdown: {
            backgroundColor: '#e53935',
            border: 'none',
            ':hover': {
                backgroundColor: '#c62828'
            }
        },
        deleteButton: {
            position: 'absolute',
            bottom: '1rem',
            right: '1rem'
        }
    };

    return (
        <Container className="py-4">
            <h1 style={styles.title}>Active Requests</h1>
            <Row className="g-4">
                {requests.filter(request => request.status !== 'assigned').map((request) => (
                    <Col md={4} key={request.id}>
                        <Card style={styles.card}>
                            <Card.Body>
                                <Card.Title style={styles.cardTitle}>{request.title}</Card.Title>
                                <Card.Text style={styles.cardText}>{request.description}</Card.Text>
                                <Card.Text style={styles.cardText}>{request.location}</Card.Text>
                                <Card.Text style={styles.cardText}>{request.contact}</Card.Text> 
                                
                                <Dropdown>
                                    <Dropdown.Toggle style={styles.dropdown}>
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
            <h1 style={styles.title} className="mt-5">Assigned Requests</h1>
            <Row className="g-4">
                {requests.filter(request => request.status === 'assigned').map((request) => (
                    <Col md={4} key={request.id}>
                        <Card style={styles.card}>
                            <Card.Body>
                                <Card.Title style={styles.cardTitle}>{request.title}</Card.Title>
                                <Card.Text style={styles.cardText}>{request.description}</Card.Text>
                                <Card.Text style={styles.cardText}>{request.location}</Card.Text>
                                <Card.Text style={styles.cardText}>{request.contact}</Card.Text>
                                <Card.Text style={styles.cardText}>
                                    Assigned to: {request.assignedVolunteer?.name}
                                </Card.Text>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDeleteRequest(request.id)}
                                    style={styles.deleteButton}
                                >
                                    <Trash size={16} />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Requests