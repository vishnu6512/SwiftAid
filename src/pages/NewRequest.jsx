import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { saveRequest } from '../services/allAPI'

const styles = {
  title: {
    color: '#1a237e',
    borderBottom: '3px solid #e53935',
    display: 'inline-block',
    paddingBottom: '5px',
    marginBottom: '1.5rem'
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
  }
};

const NewRequest = () => {

    const [requestDetails, setRequestDetails] = useState({
        title: '',
        description: '',
        location: '',
        contact: '',
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

        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initializeGoogleMaps`
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        function initializeMapAndAutocomplete() {
            const input = document.getElementById('location')
            if (!input || !mapRef.current) return

            try {
                // Initialize the map
                const defaultLocation = { lat: 0, lng: 0 }
                const newMap = new window.google.maps.Map(mapRef.current, {
                    center: defaultLocation,
                    zoom: 2,
                    mapTypeControl: false,
                })
                setMap(newMap)

                // Initialize autocomplete
                const autocomplete = new window.google.maps.places.Autocomplete(input)
                autocomplete.bindTo('bounds', newMap)
                
                // Create a marker for the selected location
                const newMarker = new window.google.maps.Marker({
                    map: newMap,
                    draggable: true,
                })
                setMarker(newMarker)

                // Handle place selection
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace()
                    if (!place.geometry) return

                    updateLocationDetails(
                        place.formatted_address,
                        place.geometry.location.lat(),
                        place.geometry.location.lng()
                    )

                    // Update marker and map
                    newMarker.setPosition(place.geometry.location)
                    newMap.setCenter(place.geometry.location)
                    newMap.setZoom(15)
                })

                // Handle marker drag
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

                // Handle map clicks
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
        setRequestDetails(prev => ({
            ...prev,
            location: address,
            lat: lat,
            lng: lng
        }))
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        try {
            const response = await saveRequest(requestDetails)
            if (response) {
                alert('Request successfully submitted. Please wait for help to arrive.')
                // Reset all form fields
                setRequestDetails({
                    title: '',
                    description: '',
                    location: '',
                    contact: '',
                    lat: null,
                    lng: null
                })
                // Reset the marker position if it exists
                if (marker) {
                    marker.setMap(null)
                }
                // Reset map zoom and center if needed
                if (map) {
                    map.setCenter({ lat: 0, lng: 0 })
                    map.setZoom(2)
                }
            }
        } catch (error) {
            alert('Error submitting request. Please try again.')
            console.error('Error:', error)
        }
    }

  return (
    <Container className="p-4">
      <h1 style={styles.title}>New Request</h1>
      <p className="text-muted mb-4" style={{ color: '#424242' }}>
        Need help? Share your request with the community so volunteers can assist you. 
        Provide as much detail as possible to ensure quick and effective support.
      </p>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={styles.formLabel}>Request Title</Form.Label>
          <Form.Control 
            onChange={(e) => setRequestDetails({...requestDetails, title: e.target.value})}
            value={requestDetails.title}
            type="text"
            id="title"
            name="title"
            placeholder="Brief description of what you need"
            required
            style={{ borderRadius: '6px' }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={styles.formLabel}>Detailed Description</Form.Label>
          <Form.Control 
            onChange={(e) => setRequestDetails({...requestDetails, description: e.target.value})}
            value={requestDetails.description}
            as="textarea"
            id="description"
            name="description"
            rows={4}
            placeholder="Provide more details about your request..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={styles.formLabel}>Location</Form.Label>
          <Form.Control
            type="text"
            id="location"
            name="location"
            placeholder="Search for a location or click on the map"
            value={requestDetails.location}
            onChange={(e) => setRequestDetails({...requestDetails, location: e.target.value})}
            required
          />
          <div style={styles.mapContainer}>
            <div 
              ref={mapRef}
              style={{ width: '100%', height: '400px', marginTop: '10px' }}
              className="mb-3"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={styles.formLabel}>Contact Information</Form.Label>
          <Form.Control 
            onChange={(e) => setRequestDetails({...requestDetails, contact: e.target.value})}
            value={requestDetails.contact}
            type="text"
            id="contact"
            name="contact"
            placeholder="How can volunteers reach you?"
            required
          />
        </Form.Group>

        <Button 
          onClick={handleSubmit} 
          type="submit" 
          style={styles.submitButton}
          className="w-100">
          Submit Request
        </Button>
      </Form>
    </Container>
  )
}

export default NewRequest