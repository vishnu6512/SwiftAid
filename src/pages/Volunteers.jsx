import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'
import { saveVolunteer } from '../services/allAPI'

const styles = {
  title: {
    color: '#1a237e',
    borderBottom: '3px solid #e53935',
    display: 'inline-block',
    paddingBottom: '5px',
    marginBottom: '2rem'
  },
  subtitle: {
    color: '#1a237e',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  formLabel: {
    color: '#1a237e',
    fontWeight: '500'
  },
  submitButton: {
    backgroundColor: '#1a237e',
    border: 'none',
    padding: '0.8rem',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#0d1757'
    }
  },
  mapContainer: {
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  infoText: {
    color: '#424242',
    lineHeight: '1.6'
  }
};

const Volunteers = () => {

    const [volunteerDetails, setVolunteerDetails] = useState({
        name: '',
        phone: '',
        email: '',
        age: '',
        gender: '',
        location: '',
        lat: null,
        lng: null
    })

    const [map, setMap] = useState(null)
    const [marker, setMarker] = useState(null)
    const mapRef = React.useRef(null)

    useEffect(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
            initializeMapAndAutocomplete()
            return
        }

        const scriptId = 'google-maps-script'
        if (document.getElementById(scriptId)) return

        const script = document.createElement('script')
        script.id = scriptId

        window.initializeGoogleMaps = () => {
            initializeMapAndAutocomplete()
        }

        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcXXwIGx17FJFYRyPuKaGn3seJ_Rwn-5o&libraries=places&callback=initializeGoogleMaps`
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        return () => {
            const scriptElement = document.getElementById(scriptId)
            if (scriptElement) {
                document.head.removeChild(scriptElement)
            }
            if (window.initializeGoogleMaps) {
                delete window.initializeGoogleMaps
            }
        }
    }, [])

    const updateLocationDetails = (address, lat, lng) => {
        setVolunteerDetails(prev => ({
            ...prev,
            location: address,
            lat: lat,
            lng: lng
        }))
    }

    const initializeMapAndAutocomplete = () => {
        const input = document.getElementById('location')
        if (!input || !mapRef.current) return

        try {
            const defaultLocation = { lat: 0, lng: 0 }
            const newMap = new window.google.maps.Map(mapRef.current, {
                center: defaultLocation,
                zoom: 2,
                mapTypeControl: false,
            })
            setMap(newMap)

            const autocomplete = new window.google.maps.places.Autocomplete(input)
            autocomplete.bindTo('bounds', newMap)

            const newMarker = new window.google.maps.Marker({
                map: newMap,
                draggable: true,
            })
            setMarker(newMarker)

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace()
                if (!place.geometry) return

                updateLocationDetails(
                    place.formatted_address,
                    place.geometry.location.lat(),
                    place.geometry.location.lng()
                )

                newMarker.setPosition(place.geometry.location)
                newMap.setCenter(place.geometry.location)
                newMap.setZoom(15)
            })

            newMarker.addListener('dragend', () => {
                const position = newMarker.getPosition()
                const geocoder = new window.google.maps.Geocoder()

                geocoder.geocode({ location: position }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        updateLocationDetails(
                            results[0].formatted_address,
                            position.lat(),
                            position.lng()
                        )
                    }
                })
            })

            newMap.addListener('click', (e) => {
                const position = e.latLng
                newMarker.setPosition(position)

                const geocoder = new window.google.maps.Geocoder()
                geocoder.geocode({ location: position }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        updateLocationDetails(
                            results[0].formatted_address,
                            position.lat(),
                            position.lng()
                        )
                    }
                })
            })

        } catch (error) {
            console.error('Error initializing Google Maps:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await saveVolunteer(volunteerDetails)
        console.log(response)
    }
    return (
        <>

            <Container className="py-4">
                <h1 style={styles.title} className="text-center">Volunteer Registration</h1>
                <Row>
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label style={styles.formLabel}>Full Name</Form.Label>
                                <Form.Control onChange={(e) => setVolunteerDetails({ ...volunteerDetails, name: e.target.value })} type="text" placeholder="Enter your full name" style={{ borderRadius: '6px' }} />
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formPhone">
                                <Form.Label style={styles.formLabel}>Phone Number</Form.Label>
                                <Form.Control onChange={(e) => setVolunteerDetails({ ...volunteerDetails, phone: e.target.value })} type="tel" placeholder="Enter your phone number" style={{ borderRadius: '6px' }} />
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formEmail">
                                <Form.Label style={styles.formLabel}>Email address</Form.Label>
                                <Form.Control onChange={(e) => setVolunteerDetails({ ...volunteerDetails, email: e.target.value })} type="email" placeholder="Enter your email" style={{ borderRadius: '6px' }} />
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formAge">
                                <Form.Label style={styles.formLabel}>Age</Form.Label>
                                <Form.Control onChange={(e) => setVolunteerDetails({ ...volunteerDetails, age: e.target.value })} type="number" placeholder="Enter your age" style={{ borderRadius: '6px' }} />
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formGender">
                                <Form.Label style={styles.formLabel}>Gender</Form.Label>
                                <Form.Select onChange={(e) => setVolunteerDetails({ ...volunteerDetails, gender: e.target.value })} style={{ borderRadius: '6px' }}>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formLocation">
                                <Form.Label style={styles.formLabel}>Location</Form.Label>
                                <Form.Control
                                    id="location"
                                    type="text"
                                    placeholder="Search for a location or click on the map"
                                    value={volunteerDetails.location}
                                    onChange={(e) => setVolunteerDetails({ ...volunteerDetails, location: e.target.value })}
                                    style={{ borderRadius: '6px' }}
                                />
                                <div
                                    ref={mapRef}
                                    style={{ width: '100%', height: '400px', marginTop: '10px' }}
                                    className="mb-3"
                                />
                            </Form.Group>

                            <button onClick={handleSubmit} type="submit" style={styles.submitButton} className="btn w-100">Submit</button>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <h2 style={styles.subtitle}>Why Should You Register as a Volunteer?</h2>
                        <p style={styles.infoText}>
                            Volunteering is a selfless act that helps communities in times of need. When disaster strikes or during critical situations, volunteers are the backbone that ensures effective relief and recovery. By registering as a volunteer, you become a vital part of a network that makes a difference.
                        </p>
                        <p style={styles.infoText}>
                            Whether it's helping people recover from natural disasters, providing support to underprivileged communities, or assisting in emergencies, your actions can have a profound impact. Volunteering not only aids others, but it also provides you with a sense of purpose and fulfillment.
                        </p>

                        <h3 style={styles.subtitle}>Benefits of Volunteering:</h3>
                        <ul>
                            <li><strong>Make a Direct Impact:</strong> Your involvement can directly affect the lives of people who are going through challenging times. The aid you provide can be life-changing for those in need.</li>
                            <li><strong>Gain New Skills:</strong> Volunteering provides you with an opportunity to develop new skills, whether it’s leadership, first aid, communication, or teamwork. These skills can enhance both your personal and professional growth.</li>
                            <li><strong>Expand Your Network:</strong> Through volunteering, you'll meet like-minded individuals and form valuable connections. Networking with other volunteers and professionals in the field can open doors to new opportunities.</li>
                            <li><strong>Personal Fulfillment:</strong> Helping others brings a deep sense of satisfaction and can improve your emotional well-being. The experiences you gain will stay with you for life, enriching your personal journey.</li>
                            <li><strong>Build Community Connections:</strong> Volunteering gives you a chance to connect with your local community and understand its unique needs, helping you contribute to its growth and development.</li>
                        </ul>

                        <h3 style={styles.subtitle}>What We Expect from Volunteers:</h3>
                        <p style={styles.infoText}>
                            Volunteers are expected to be committed, compassionate, and ready to assist when needed. The situations you’ll encounter can be challenging, but your willingness to help can make a huge difference in the outcome. We value:
                        </p>
                        <ul>
                            <li><strong>Commitment:</strong> A strong dedication to the cause and willingness to contribute your time and effort.</li>
                            <li><strong>Teamwork:</strong> Ability to work alongside others and collaborate to achieve common goals in high-pressure environments.</li>
                            <li><strong>Adaptability:</strong> A readiness to adapt to different situations, including handling unforeseen challenges with a positive attitude.</li>
                            <li><strong>Empathy:</strong> A deep sense of understanding and compassion for those you are helping, recognizing the emotional and physical toll they may be experiencing.</li>
                        </ul>


                        
                    </Col>


                </Row>

            </Container>
        </>

    )
}

export default Volunteers