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
