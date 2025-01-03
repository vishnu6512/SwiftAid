import React from 'react'
import { Accordion } from 'react-bootstrap';

const Home = () => {
  const styles = {
    heroSection: {
      backgroundColor: '#f8f9fa',
      padding: '3rem 0',
      borderRadius: '8px',
      marginBottom: '2rem'
    },
    title: {
      color: '#1a237e', // Deep blue
      fontSize: '4rem',
      fontWeight: 'bold'
    },
    card: {
      transition: 'transform 0.2s',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: 'none',
      ':hover': {
        transform: 'translateY(-5px)'
      }
    },
    sectionTitle: {
      color: '#1a237e',
      borderBottom: '3px solid #e53935', // Red accent
      display: 'inline-block',
      paddingBottom: '5px'
    }
  };

  return (
    <div className='container align-items-center text-center'>
      <section className='hero-section text-center' style={styles.heroSection}>
        <h1 style={styles.title}>SwiftAid</h1>
        <p className='hero-text' style={{ color: '#e53935', fontSize: '1.5rem' }}>
          Quick emergency assistance when it matters most
        </p>
        <p className='hero-text' style={{ color: '#424242' }}>
          SwiftAid is a platform that bridges the gap between disaster victims and compassionate volunteers. Whether you need help or want to offer it, we’re here to connect you. From food and shelter to medical assistance, our community is ready to step in when it matters most
        </p>
      </section>

      <section className='features-section mt-5'>
        <h2 className='mb-4' style={styles.sectionTitle}>Features</h2>
        <div className='row justify-content-center'>
          <div className='col-md-4 mb-3'>
            <div className='card h-100' style={styles.card}>
              <div className='card-body'>
                <h3 className='card-title h5' style={{ color: '#1a237e' }}>Post Relief Requests</h3>
                <p className='card-text' style={{ color: '#424242' }}>Post and manage relief requests when you need assistance</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100' style={styles.card}>
              <div className='card-body'>
                <h3 className='card-title h5' style={{ color: '#1a237e' }}>Interactive Map</h3>
                <p className='card-text' style={{ color: '#424242' }}>Find requests near you on an interactive map</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100' style={styles.card}>
              <div className='card-body'>
                <h3 className='card-title h5' style={{ color: '#1a237e' }}>Real-time Notifications</h3>
                <p className='card-text' style={{ color: '#424242' }}>Get notified when someone nearby needs your help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='how-it-works-section mt-5 mb-5'>
        <h2 className='mb-4' style={styles.sectionTitle}>How Does It Work?</h2>
        <div className='row justify-content-center'>
          <div className='col-md-4 mb-3'>
            <div className='card h-100' style={styles.card}>
              <div className='card-body'>
                <h3 className='card-title h5' style={{ color: '#1a237e' }}>1. Post a Request</h3>
                <p className='card-text' style={{ color: '#424242' }}>Share your need for assistance with the community</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100' style={styles.card}>
              <div className='card-body'>
                <h3 className='card-title h5' style={{ color: '#1a237e' }}>2. Find Volunteers</h3>
                <p className='card-text' style={{ color: '#424242' }}>Volunteers nearby get notified and can sign up to help</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100' style={styles.card}>
              <div className='card-body'>
                <h3 className='card-title h5' style={{ color: '#1a237e' }}>3. Track Progress</h3>
                <p className='card-text' style={{ color: '#424242' }}>Stay updated on how your request is being addressed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='faq-section mt-5 mb-5'>
        <h2 className='mb-4' style={styles.sectionTitle}>Got Questions?</h2>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <Accordion defaultActiveKey="0" style={{ borderRadius: '8px' }}>
              <Accordion.Item eventKey="0" style={{ border: 'none', marginBottom: '1rem' }}>
                <Accordion.Header style={{ backgroundColor: '#f8f9fa' }}>
                  How do I post a relief request?
                </Accordion.Header>
                <Accordion.Body style={{ color: '#424242' }}>
                  Simply log in to your account, click on "Post Request" button, and fill out the form with details about your needs. Your request will be visible to nearby volunteers immediately.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" style={{ border: 'none', marginBottom: '1rem' }}>
                <Accordion.Header style={{ backgroundColor: '#f8f9fa' }}>
                  Can I volunteer if I'm not in the affected area?
                </Accordion.Header>
                <Accordion.Body style={{ color: '#424242' }}>
                  Yes! While local volunteers can provide immediate assistance, remote volunteers can help with coordination, resource management, and other support activities.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" style={{ border: 'none', marginBottom: '1rem' }}>
                <Accordion.Header style={{ backgroundColor: '#f8f9fa' }}>
                  How does the notification system work?
                </Accordion.Header>
                <Accordion.Body style={{ color: '#424242' }}>
                  When a new relief request is posted in your area, you'll receive real-time notifications through the platform. You can customize your notification preferences in your account settings.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home