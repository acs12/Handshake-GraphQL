import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { updateEducation, deleteEducation } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';


//Define a Login Component
class EditEducation extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            existingEducationStatus: false,
            educationId: this.props.item._id,
            collegeName: this.props.item.collegeName,
            location: this.props.item.educationLocation,
            degree: this.props.item.degree,
            major: this.props.item.major,
            yearOfPassing: this.props.item.yearOfPassing,
            cgpa: this.props.item.cgpa,
        }
        //Bind the handlers to this class
        this.delete = this.delete.bind(this)
        this.changeHandler = this.changeHandler.bind(this);
        this.changeExistingEducation = this.changeExistingEducation.bind(this)
        this.updateExistingEducation = this.updateExistingEducation.bind(this)
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateExistingEducation = async (e) => {
        //prevent page from refresh
        e.preventDefault()
        let updateExistingEducation = {
            _id: this.state.id,
            id: this.state.educationId,
            collegeName: this.state.collegeName,
            educationLocation: this.state.location,
            degree: this.state.degree,
            major: this.state.major,
            yearOfPassing: this.state.yearOfPassing,
            cgpa: this.state.cgpa,
        }

        await this.props.updateEducation(updateExistingEducation, res => {
            console.log(res)
            if (this.state.existingEducationStatus === true) {
                this.setState({
                    existingEducationStatus: false
                })
            }
            else {
                this.setState({
                    existingEducationStatus: true
                })
            }
        })


    }


    delete = async (e) => {
        e.preventDefault()
        let deleteEducation = {
            _id: this.state.id,
            id: this.state.educationId,
        }
        //set the with credentials to true
        await this.props.deleteEducation(deleteEducation, res => {
            console.log(res)
        })

    }

    changeExistingEducation = (e) => {

        if (this.state.existingEducationStatus === true) {
            this.setState({
                existingEducationStatus: false
            })
        }
        else {
            this.setState({
                existingEducationStatus: true
            })
        }

    }

    render() {
        console.log(this.state)
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let existEduDetails = null
        if (this.state.existingEducationStatus === false) {
            console.log("Inside if in change existing edu details")
            existEduDetails = <div>
                <div className="card" >
                    <div className="card-body">
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.delete}>Delete</button>
                        <h5 className="card-title">School : {this.props.item.collegeName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted"> Location: {this.props.item.educationLocation}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Degree : {this.props.item.degree}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Major : {this.props.item.major}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Year of Passing : {this.props.item.yearOfPassing}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">CGPA : {this.props.item.cgpa}</h6>
                        <button type="button" className="btn btn-primary" onClick={this.changeExistingEducation}>Edit</button>
                    </div>
                    <br></br>
                </div>
            </div>
        }
        else {
            console.log("Inside else in exp details")
            existEduDetails =
                <div>
                    <br></br>
                    <form onSubmit={this.updateExistingEducation}>
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeExistingEducation}>X</button>
                        <div className="form-group">
                            School Name:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="collegeName"
                                placeholder={this.props.item.collegeName}
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
                                placeholder={this.props.item.educationLocation}
                            />
                        </div>

                        <div className="form-group">
                            Degree:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="degree"
                                placeholder={this.props.item.degree}
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
                                placeholder={this.props.item.major}
                            />
                        </div>

                        <div className="form-group">
                            Year of Passing:
                            <input
                                onChange={this.changeHandler}
                                type="Number"
                                className="form-control"
                                name="yearOfPassing"
                                placeholder={this.props.item.yearOfPassing}
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
                                placeholder={this.props.item.cgpa}
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
                <div key={this.props.item._id}></div>
                {redirectVar}
                {existEduDetails}

            </div>
        )
    }
}
//export Login Component
export default connect(null, { updateEducation, deleteEducation })(EditEducation);