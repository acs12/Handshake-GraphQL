import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { updateEducationMutation } from '../../mutation/mutation';
import { QueryGetStudent } from '../../queries/queries';
// import EditEducation from './EditEducation';

//Define a Login Component
class EducationDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            getEduDetails: [],
            eduDetailsStatus: false,
            collegeName: "",
            location: "",
            degree: "",
            major: "",
            yearOfPassing: "",
            cgpa: "",
            // response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitEducationDetails = this.submitEducationDetails.bind(this);
        this.changeEduDetailsStatus = this.changeEduDetailsStatus.bind(this)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log("EDUCATION : componentDidUpdate CALLED")
    //     if (prevProps.education !== this.props.education) {
    //         this.setState({ getEduDetails: this.props.education })
    //     }
    // }
    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitEducationDetails = async (e) => {
        e.preventDefault()
        // let EducationDetails = {
        //     _id: this.state.id,
        //     collegeName: this.state.collegeName,
        //     educationLocation: this.state.location,
        //     degree: this.state.degree,
        //     major: this.state.major,
        //     yearOfPassing: this.state.yearOfPassing,
        //     cgpa: this.state.cgpa,
        // }

        let update = await this.props.updateEducationMutation({
            variables: {
                id: localStorage.getItem("id"),
                collegeName: this.state.collegeName,
                educationLocation: this.state.location,
                degree: this.state.degree,
                major: this.state.major,
                yearOfPassing: this.state.yearOfPassing,
                cgpa: this.state.cgpa,
            }
        });
        console.log("Done with updation",update)
        if(update.data.EducationUpdate.status === "200"){
            this.setState({
                eduDetailsStatus : !this.state.eduDetailsStatus,
            })
        }
    }

    changeEduDetailsStatus = (e) => {
        if (this.state.eduDetailsStatus === true) {
            this.setState({
                eduDetailsStatus: false
            })
        }
        else {
            this.setState({
                eduDetailsStatus: true
            })
        }
    }

    render() {
        console.log("edu details", this.state.getEduDetails)
        let redirectVar = null;
        let res ={}
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }

        if (this.props.data.Student) {
            console.log('Updating')
            res = this.props.data.Student.education
            console.log('Updating',res)
        }

        let eduDetails = null
        if (this.state.eduDetailsStatus === false) {
            console.log("Inside if in change existing edu details")
            eduDetails = <div>
                <b> Education : </b>
                <div className="card" >
                    <div className="card-body">
                        {/* <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.delete}>Delete</button> */}
                        <h5 className="card-title">School : {res.collegeName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted"> Location: {res.educationLocation}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Degree : {res.degree}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Major : {res.major}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Year of Passing : {res.yearOfPassing}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">CGPA : {res.cgpa}</h6>
                        <button type="button" className="btn btn-primary" onClick={this.changeEduDetailsStatus}>Edit</button>
                    </div>
                    <br></br>
                </div>
            </div>
        }
        else {
            console.log("Inside else in exp details")
            eduDetails =
                <div>
                    <br></br>
                    <form onSubmit={this.submitEducationDetails}>
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeEduDetailsStatus}>X</button>
                        <div className="form-group">
                            School Name:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="collegeName"
                                placeholder={res.collegeName}
                                required
                            />
                        </div>

                        <div className="form-group">
                            Location:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="location"
                                placeholder={res.educationLocation}
                            />
                        </div>

                        <div className="form-group">
                            Degree:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="degree"
                                placeholder={res.degree}
                                required
                            />
                        </div>

                        <div className="form-group">
                            Major:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="major"
                                placeholder={res.major}
                            />
                        </div>

                        <div className="form-group">
                            Year of Passing:
                            <input
                                onChange={this.changeHandler}
                                type="Number"
                                className="form-control"
                                name="yearOfPassing"
                                placeholder={res.yearOfPassing}
                            />
                        </div>
                        <div className="form-group">
                            CGPA:
                            <input
                                onChange={this.changeHandler}
                                type="Number"
                                step="0.01"
                                min="0"
                                max="10"
                                className="form-control"
                                name="cgpa"
                                placeholder={res.cgpa}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <br></br>
                        <br></br>
                    </form>
                </div>

        }
        return (
            <div>
                {redirectVar}
                {eduDetails}

            </div>
        )
    }
}

//export Login Component
export default compose(graphql(QueryGetStudent, {
    options: {
        variables: { id: localStorage.getItem("id") }
    }
}), graphql(updateEducationMutation, 
    { 
        name: "updateEducationMutation",
        options: { refetchQueries: [{ query: QueryGetStudent, variables: { id: localStorage.getItem("id") } }] }
     }))(EducationDetails);