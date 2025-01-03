import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// to save a new request from the user in new request page
export const saveRequest = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/requests`, reqBody)
}

// to get all requests from the server
export const getAllRequests = async () => {
    return await commonAPI("GET", `${serverURL}/requests`)
}

// to save a new volunteer in the database
export const saveVolunteer = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/volunteers`, reqBody)
}

// to get all volunteers from the server
export const getAllVolunteers = async () => {
    return await commonAPI("GET", `${serverURL}/volunteers`)
}

export const updateRequest = async (request) => {
    return await commonAPI("PUT", `${serverURL}/requests/${request.id}`, request)
}

