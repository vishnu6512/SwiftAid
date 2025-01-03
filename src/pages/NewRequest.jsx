import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { saveRequest } from '../services/allAPI'


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

        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcXXwIGx17FJFYRyPuKaGn3seJ_Rwn-5o&libraries=places&callback=initializeGoogleMaps`
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
          <Form.Control
            type="text"
            id="location"
            name="location"
            placeholder="Search for a location or click on the map"
            value={requestDetails.location}
            onChange={(e) => setRequestDetails({...requestDetails, location: e.target.value})}
            required
          />
          <div 
            ref={mapRef}
            style={{ width: '100%', height: '400px', marginTop: '10px' }}
            className="mb-3"
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