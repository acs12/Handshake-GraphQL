import React, { Component } from 'react';
import '../../App.css';
import { graphql, compose } from 'react-apollo';
import { updateExperienceMutation } from '../../mutation/mutation';
import { QueryGetStudent } from '../../queries/queries';
// import EditExperience from './EditExperience';

import { Redirect } from 'react-router';
//Define a Component
class ExperienceDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            getExpDetails: [],
            expDetailsStatus: false,
            experienceId: 1,
            companyName: "",
            title: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
            response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitExperienceDetails = this.submitExperienceDetails.bind(this);
        this.changeExpDetailsStatus = this.changeExpDetailsStatus.bind(this)
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitExperienceDetails = async (e) => {
        e.preventDefault()
        let update = await this.props.updateExperienceMutation({
            variables: {
                id: localStorage.getItem("id"),
                companyName: this.state.companyName,
            title: this.state.title,
            experienceLocation: this.state.location,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
            }
        });
        console.log("Done with updation",update)
        if(update.data.ExperienceUpdate.status === "200"){
            this.setState({
                expDetailsStatus : !this.state.expDetailsStatus,
            })
        }
    }

    changeExpDetailsStatus = (e) => {
        if (this.state.expDetailsStatus === true) {
            this.setState({
                expDetailsStatus: false
            })
        }
        else {
            this.setState({
                expDetailsStatus: true
            })
        }
    }

    render() {
        console.log("exp details", this.state.getExpDetails)
        let redirectVar = null;
        let res = {}
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let expDetails = null
        if (this.props.data.Student) {
            console.log('Updating')
            res = this.props.data.Student.experience
            console.log('Updating',res)
        }
        if (this.state.expDetailsStatus === false) {
            console.log("Inside if in change existing exp details")
            expDetails = <div>
                <div className="card">
                    <div className="card-body">
                        {/* <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.delete}>Delete</button> */}
                        <h5 className="card-title">Company name : {res.companyName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Title : {res.title}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">From : {res.startDate} - To : {res.endDate}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Description : {res.description}</h6>
                        <button type="button" className="btn btn-primary" onClick={this.changeExpDetailsStatus}>Edit</button>
                    </div>
                </div>
            </div>
        }
        else {
            console.log("Inside if in exp details")
            expDetails =
                <div>
                    <br></br>
                    <form onSubmit={this.submitExperienceDetails}>
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeExpDetailsStatus}>X</button>
                        <div className="form-group">
                            Company Name:
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="companyName"
                                placeholder={res.companyName}
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
                                placeholder={res.title}
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
                                placeholder={res.companyLocation}
                            />
                        </div>

                        <div className="form-group">
                            Start Date:
                            <input
                                onChange={this.changeHandler}
                                type="date"
                                className="form-control"
                                name="startDate"
                                placeholder={res.startDate}
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
                                placeholder={res.endDate}
                            />
                        </div>

                        <div className="form-group">
                            Description:
                            <input
                                onChange={this.changeHandler}
                                type="textarea"
                                className="form-control"
                                name="description"
                                placeholder={res.description}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Save</button>
                        <br></br>
                    </form>
                </div>

        }
        return (
            <div>
                {redirectVar}
                {expDetails}

            </div>
        )
    }
}


//export Component

export default compose(graphql(QueryGetStudent, {
    options: {
        variables: { id: localStorage.getItem("id") }
    }
}), graphql(updateExperienceMutation, 
    { 
        name: "updateExperienceMutation",
        options: { refetchQueries: [{ query: QueryGetStudent, variables: { id: localStorage.getItem("id") } }] }
     }))(ExperienceDetails);