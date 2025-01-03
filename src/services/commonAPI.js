import axios from "axios"

const commonAPI = async (httpMethod, url, reqBody) => {
    const requestConfig = {
        method: httpMethod,
        url,
        data: reqBody
    }
    try {
        const response = await axios(requestConfig)
        return {
            status: true,
            data: response.data
        }
    } catch (err) {
        return {
            status: false,
            message: err.response?.data?.message || err.message,
            statusCode: err.response?.status
        }
    }
}

export default commonAPI