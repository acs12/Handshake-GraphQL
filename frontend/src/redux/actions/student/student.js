import { STUDENT_SIGNUP } from '../../types/student/student'
import { STUDENT_LOGIN, ALL_STUDENTS } from '../../types/student/student'
import axios from 'axios';
import URL from '../../../constants.js';
const jwt_decode = require('jwt-decode')


export function studentSignup(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/studentSignup`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: STUDENT_SIGNUP,
                payload: res.data
            });
            
        })
    }

}

export function studentLogin(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/StudentLogin`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
           
            dispatch({
                type: STUDENT_LOGIN,
                payload: res.data
            });
            callback(res)
        })
    }

}


export function allStudents(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .get(`${URL}/getStudents`);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: ALL_STUDENTS,
                payload: res.data
            });
            callback(res)
        })
    }

}