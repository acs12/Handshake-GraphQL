import { GET_EVENTS, APPLIED_EVENTS, APPLY_TO_EVENT, CHANGE_EVENT_FILTER } from '../../types/student/event'
import axios from 'axios';
import URL from '../../../constants.js';
const jwt_decode = require('jwt-decode')


export function getEvents(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/getAllEvents`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: GET_EVENTS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function applyToEvent(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/applyToEvent`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: APPLY_TO_EVENT,
                payload: res.data
            });
            callback(res);
        })
    }

}


export function appliedEvents(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/appliedEvents`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: APPLIED_EVENTS,
                payload: res.data
            });
            callback(res);
        })
    }

}


export function changeEventFilter(values,callback) {
    // console.log(values);

    return (dispatch) => {
        dispatch({
            type: CHANGE_EVENT_FILTER,
            payload: values
        });
        callback("success")
    }
}