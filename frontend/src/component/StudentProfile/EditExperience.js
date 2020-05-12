import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { updateExperience, deleteExperience } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

//Define a Login Component
class EditExperience extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            existingExperienceStatus: false,
            experienceId: this.props.item._id,
            companyName: this.props.item.companyName,
            title: this.props.item.title,
            location: this.props.item.companyLocation,
            startDate: this.props.item.startDate,
            endDate: this.props.item.endDate,
            description: this.props.item.description,
            response: ""
        }
        //Bind the handlers to this class
        this.delete = this.delete.bind(this)
        this.changeHandler = this.changeHandler.bind(this);
        this.changeExistingExperience = this.changeExistingExperience.bind(this)
        this.updateExistingExperience = this.updateExistingExperience.bind(this)
    }

    // componentDidMount = () => {
    //     let sDate = String(this.props.item.startDate)
    //     let eDate = String(this.props.item.endDate)
    //     sDate = sDate.slice(0, 10)
    //     eDate = eDate.slice(0, 10)
    //     this.setState({
    //         startDate: sDate,
    //         endDate: eDate
    //     })
    // }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateExistingExperience = async(e) => {
        //prevent page from refresh
        e.preventDefault();
        let updateExistingExperience = {
            _id: this.state.id,
            id: this.state.experienceId,
            companyName: this.state.companyName,
            title: this.state.title,
            companyLocation: this.state.location,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
        }

        await this.props.updateExperience(updateExistingExperience, res => {
            console.log("experience res",res)
            if (this.state.existingExperienceStatus === true) {
                this.setState({
                    existingExperienceStatus: false
                })
            }
            else {
                this.setState({
                    existingExperienceStatus: true
                })
            }
        })

    }

    delete = async (e) => {
        e.preventDefault();
        let deleteExperience = {
            _id: this.state.id,
            id: this.state.experienceId,
        }
        await this.props.deleteExperience(deleteExperience, res => {
            console.log(res)
        })

    }


    changeExistingExperience = (e) => {

        if (this.state.existingExperienceStatus === true) {
            this.setState({
                existingExperienceStatus: false
            })
        }
        else {
            this.setState({
                existingExperienceStatus: true
            })
        }

    }

    render() {
        console.log(this.state)
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }

        let existExpDetails = null
        if (this.state.existingExperienceStatus === false) {
            console.log("Inside if in change existing exp details")
            existExpDetails = <div>
                <div className="card">
                    <div className="card-body">
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.delete}>Delete</button>
                        <h5 className="card-title">Company name : {this.props.item.companyName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Title : {this.props.item.title}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">From : {this.state.startDate} - To : {this.state.endDate}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Description : {this.props.item.description}</h6>
                        <button type="button" className="btn btn-primary" onClick={this.changeExistingExperience}>Edit</button>
                    </div>
                </div>
            </div>
        }
        else {
            console.log("Inside if in exp details")
            existExpDetails =
                <div>
                    <br></br>
                    <form onSubmit={this.updateExistingExperience}>
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeExistingExperience}>X</button>
                        <div className="form-group">
                            Company Name:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="companyName"
                                placeholder={this.props.item.companyName}
                                required
                            />
                        </div>

                        <div className="form-group">
                            Title:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder={this.props.item.title}
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
                                placeholder={this.props.item.companyLocation}
                            />
                        </div>

                        <div className="form-group">
                            Start Date:
                            <input
                                onChange={this.changeHandler}
                                type="date"
                                className="form-control"
                                name="startDate"
                                placeholder={this.props.item.startDate}
                                required
                            />
                        </div>

                        <div className="form-group">
                            End Date:
                            <input
                                onChange={this.changeHandler}
                                type="date"
                                className="form-control"
                                name="endDate"
                                placeholder={this.props.item.endDate}
                            />
                        </div>

                        <div className="form-group">
                            Description:
                            <input
                                onChange={this.changeHandler}
                                type="textarea"
                                className="form-control"
                                name="description"
                                placeholder={this.props.item.description}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Save</button>
                        <br></br>
                    </form>
                </div>

        }
        return (
            <div>
                <div key={this.props.item._id}></div>
                {redirectVar}
                {existExpDetails}

            </div>
        )
    }
}
//export Login Component
export default connect(null, { updateExperience, deleteExperience })(EditExperience);