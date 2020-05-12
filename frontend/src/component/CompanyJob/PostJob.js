import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import { AddJobMutation } from '../../mutation/mutation';
import CompanyJobBar from '../LandingPage/CompanyJobBar'
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';



class PostJob extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            title: "",
            location: "",
            deadlineDate: "",
            salary: "",
            description: "",
            category: "Full-Time",
            response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.AddJob = this.AddJob.bind(this)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    AddJob = async (e) => {
        e.preventDefault()
        let update = await this.props.AddJobMutation({
            variables: {
                companyId: localStorage.getItem("id"),
                title: this.state.title,
                location: this.state.location,
                deadlineDate: this.state.deadlineDate,
                salary: this.state.salary,
                description: this.state.description,
                category: this.state.category,
            }
        });
        console.log("Done with updation",update)
        if(update.data.AddJob.status === "200"){
            alert("Job Added");
        //    <Redirect to="../CViewJob"></Redirect>
        }
    }


    render() {
        let response = this.state.response
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/Home" />
        }
        console.log(this.state)
        let AddJob =

            <div>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol md="6" style={{ textAlign: "center" }}>


                        <form onSubmit={this.AddJob}>

                            <b>Add New Job : </b>
                            <br></br>
                            <br></br>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Enter Job Title"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    placeholder="Enter Location for Job"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <span>
                                    Deadline Date :
                                    <input
                                        onChange={this.changeHandler}
                                        type="date"
                                        className="form-control"
                                        name="deadlineDate"
                                        placeholder="Enter Deadline to Apply for Job"
                                        required
                                    />
                                </span>
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="number"
                                    className="form-control"
                                    name="salary"
                                    placeholder="Enter Salary"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Enter Job Description"
                                />
                            </div>

                            <div>
                                <p>Select Job Category :</p>

                                <input onChange={this.changeHandler} type="radio" id="Full-Time" name="category" value="Full-Time" checked />
                                <label for="Full-Time"> Full-Time</label><br></br>
                                <input onChange={this.changeHandler} type="radio" id="Part-Time" name="category" value="Part-Time" />
                                <label for="Part-Time"> Part-Time</label><br></br>
                                <input onChange={this.changeHandler} type="radio" id="Internship" name="category" value="Internship" />
                                <label for="Internship"> Internship</label><br></br>
                                <input onChange={this.changeHandler} type="radio" id="On-Campus" name="category" value="On-Campus" />
                                <label for="On-Campus"> On-Campus</label>
                                <br></br>
                            </div>
                            <br></br>
                            <button className="btn btn-primary" type="submit">Add</button>
                            <br></br><br></br>
                            {response}
                        </form>
                    </MDBCol>
                    <MDBCol md="3">

                    </MDBCol>
                </MDBContainer>

            </div>
        return (
            <div>

                {redirectVar}
                <CompanyJobBar />
                {AddJob}
            </div>
        )
    }
}
export default graphql(AddJobMutation, {name : "AddJobMutation"})(PostJob);