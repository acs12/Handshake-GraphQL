import { GET_PROFILE, ADD_EDUCATION, ADD_EXPERIENCE, ADD_SKILL, UPDATE_CONTACT, UPDATE_CAREER, UPDATE_PROFILE, UPDATE_EDUCATION, UPDATE_EXPERIENCE, DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_SKILL } from '../../types/student/studentProfile'
import axios from 'axios';
import URL from '../../../constants.js';
const jwt_decode = require('jwt-decode')


export function getProfile(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    console.log("inside get profile api action")
    console.log(values)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/getStudents`, values);

    return (dispatch) => {
        console.log("RESPONSE")
        request.then((res) => {
            console.log("RES", res)
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });

            callback(res)

        })
        // request.catch((err) => {
        //     console.log(err)
        // })
    }

}

export function updateContact(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/updateStudentContactDetails`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
            callback(res)

        })
    }

}

export function updateProfile(values, callback) {
    console.log("Values",values);
    const formData = new FormData();
    formData.append('profilePicUrl', values.profilePicUrl);
    formData.append("_id", values._id);
    formData.append("name", values.name);
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append('address', values.address);
    formData.append('city', values.city);
    formData.append('state', values.state);
    formData.append('country', values.country);
    formData.append('gradDate', values.gradDate);
    formData.append('major', values.major);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    console.log("form data", formData)

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/updateProfile`, formData,config);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            callback(res)

        })
    }

}

export function updateCareer(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/updateCareerObjective`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_CAREER,
                payload: res.data
            });
            callback(res)
        })
    }

}

export function updateEducation(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/education/updateEducation`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_EDUCATION,
                payload: res.data
            });
            callback(res)

        })
    }

}

export function updateExperience(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/experience/updateExperience`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_EXPERIENCE,
                payload: res.data
            });
            callback(res)
        })
    }

}

export function addEducation(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/education/addEducation`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: ADD_EDUCATION,
                payload: res.data
            });
            callback(res)
        })
    }

}

export function deleteEducation(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/education/deleteEducation`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: DELETE_EDUCATION,
                payload: res.data
            });
            callback(res)
        })
    }

}

export function addExperience(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/experience/addExperience`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: ADD_EXPERIENCE,
                payload: res.data
            });
            callback(res)
        })
    }

}


export function deleteExperience(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/experience/deleteExperience`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: DELETE_EXPERIENCE,
                payload: res.data
            });
            callback(res)
        })
    }

}


export function addSkill(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/skill/addSkill`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: ADD_SKILL,
                payload: res.data
            });
            callback(res)
        })
    }

}

export function deleteSkill(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/skill/deleteSkill`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: DELETE_SKILL,
                payload: res.data
            });
            callback(res)
        })
    }

}