import React from 'react'
import { Accordion } from 'react-bootstrap';

const Home = () => {
  return (
    <div className='container align-items-center text-center'>
      <section className='hero-section text-center'>
        <h1 className='font-weight-bold mt-5' style={{fontSize: '4rem'}}>SwiftAid</h1>
        <p className='hero-text'>
          Quick emergency assistance when it matters most
        </p>
        <p className='hero-text'>
        SwiftAid is a platform that bridges the gap between disaster victims and compassionate volunteers. Whether you need help or want to offer it, we’re here to connect you. From food and shelter to medical assistance, our community is ready to step in when it matters most
        </p>
      </section>

      <section className='features-section mt-5'>
        <h2 className='mb-4'>Features</h2>
        <div className='row justify-content-center'>
          <div className='col-md-4 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='card-title h5'>Post Relief Requests</h3>
                <p className='card-text'>Post and manage relief requests when you need assistance</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='card-title h5'>Interactive Map</h3>
                <p className='card-text'>Find requests near you on an interactive map</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='card-title h5'>Real-time Notifications</h3>
                <p className='card-text'>Get notified when someone nearby needs your help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='how-it-works-section mt-5 mb-5'>
        <h2 className='mb-4'>How Does It Work?</h2>
        <div className='row justify-content-center'>
          <div className='col-md-4 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='card-title h5'>1. Post a Request</h3>
                <p className='card-text'>Share your need for assistance with the community</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='card-title h5'>2. Find Volunteers</h3>
                <p className='card-text'>Volunteers nearby get notified and can sign up to help</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='card-title h5'>3. Track Progress</h3>
                <p className='card-text'>Stay updated on how your request is being addressed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='faq-section mt-5 mb-5'>
        <h2 className='mb-4'>Got Questions?</h2>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  How do I post a relief request?
                </Accordion.Header>
                <Accordion.Body>
                  Simply log in to your account, click on "Post Request" button, and fill out the form with details about your needs. Your request will be visible to nearby volunteers immediately.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Can I volunteer if I'm not in the affected area?
                </Accordion.Header>
                <Accordion.Body>
                  Yes! While local volunteers can provide immediate assistance, remote volunteers can help with coordination, resource management, and other support activities.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  How does the notification system work?
                </Accordion.Header>
                <Accordion.Body>
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