import { COMPANY_SIGNUP,COMPANY_LOGIN,COMPANY_PROFILE,GET_COMPANY_PROFILE } from '../../types/company/company'
import axios from 'axios';
import URL from '../../../constants.js';
const jwt_decode = require('jwt-decode')


export function companySignup(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/company`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: COMPANY_SIGNUP,
                payload: res.data
            });
            callback(res)
            
        })
    }

}

export function companyLogin(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/Clogin`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
           
            dispatch({
                type: COMPANY_LOGIN,
                payload: res.data
            });
            callback(res)
        })
    }

}


export function updateCompanyProfile(values, callback) {
    console.log("Values",values);
    let x = localStorage.getItem("token")
    const formData = new FormData();
    formData.append('profilePicUrl', values.profilePicUrl);
    formData.append("_id", values._id);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("description", values.description);
    formData.append('location', values.location);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    console.log("form data", formData)

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/updateCompanyProfile`, formData,config);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: COMPANY_PROFILE,
                payload: res.data
            });
            callback(res)

        })
    }

}


export function getCompanyProfile(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    const request = axios
        .post(`${URL}/companyDetails`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
           
            dispatch({
                type: GET_COMPANY_PROFILE,
                payload: res.data
            });
            callback(res)
        })
    }

}

