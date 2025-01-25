import {json} from "react-router-dom";

const API_BASE_URL = process.env.API_BASE_URL

/**
 * API calls on backend, then return Response
 * @constructor
 * @param {string} endpoint The API endpoint
 * @param {object} options The fetch options
 * @returns {Promise<any>} The API response
 */

export async function apiClient(endpoint, options) {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    let resData;

    try {
        resData = await response.json();
    } catch (error) {
        resData = { error: 'Invalid JSON response.' };
    }

    if (!response.ok) {
        return { success: false, error: resData.message || 'Something went wrong, failed to send request.' };
    }

    return { success: true, data: resData };
}

export async function uploadFiles(uploadFiles){
    const url = `${API_BASE_URL}/imageUpload`;
    const response = await fetch(url, {
        method: "POST",
        body: uploadFiles
    });

    const result = await response.json();

    return result.url
}