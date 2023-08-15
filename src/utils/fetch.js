import axios from 'axios';
import { handleError } from './handleError.js'; // Import the handleError function
import { config } from '../config';

export async function getData(url, params) {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};

        return await axios.get(`${process.env.REACT_APP_DB}${url}`, {
            params,
            headers: {
                Authorization: `${token}`,
            },
        });
    } catch (err) {
        console.log(err); // Optionally, you can log the error to the console
        throw err; // Re-throw the error to be handled where getData is called
    }
}

export async function postData(url, payload, formData = null) {
    console.log('formData', formData);
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};
        console.log('test', `${process.env.REACT_APP_DB}`)
        return await axios.post(`${process.env.REACT_APP_DB}${url}`, payload, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': formData ? 'multipart/form-data' : 'application/json',
            },
        });
    } catch (err) {
        console.log(err); // Optionally, you can log the error to the console
        throw err; // Re-throw the error to be handled where postData is called
    }
}

export async function putData(url, payload) {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};

        return await axios.put(`${process.env.REACT_APP_DB}${url}`, payload, {
            headers: {
                Authorization: `${token}`,
            },
        });
    } catch (err) {
        console.log(err); // Optionally, you can log the error to the console
        throw err; // Re-throw the error to be handled where putData is called
    }
}

export async function deleteData(url) {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};

        return await axios.delete(`${process.env.REACT_APP_DB}${url}`, { // Gunakan process.env.REACT_APP_DB
            headers: {
                Authorization: `${token}`,
            },
        });
    } catch (err) {
        return handleError(err);
    }
}
