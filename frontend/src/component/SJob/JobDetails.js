import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { ApplyToJobMutation } from '../../mutation/mutation';
import { QueryAllJobs } from '../../queries/queries';


//Define a Login Component
class JobDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            jobDetailsStatus: false,
            toggle: false,
            company: this.props.item.companyId,
            jobId: this.props.item._id,
            postedDate: this.props.item.postedDate,
            deadlineDate: this.props.item.deadlineDate,
            response: ""
        }

        // this.changeHandler = this.changeHandler.bind(this)
        // this.changeJobDetailsStatus = this.changeJobDetailsStatus.bind(this)
        // this.changeDisplay = this.changeDisplay.bind(this)
        this.apply = this.apply.bind(this)

    }

    // apply = async (e) => {
    //     e.preventDefault()
    //     let apply = {
    //         studentId: this.state.id,
    //         _id: this.state.jobId,
    //         resumeUrl: this.state.resumeUrl
    //     }
    //     // set the with credentials to true
    //     // axios.defaults.withCredentials = true;
    //     // // make a post request with the user data
    //     // await this.props.applyToJob(apply, res => {
    //     //     console.log('Response : ', res.data)
    //     // })
    // }

    // changeHandler = (e) => {
    //     console.log("event", e)
    //     this.setState({
    //         resumeUrl: e.target.files[0]
    //     })
    //     console.log("Resume", this.state.resumeUrl)
    // }

    apply = async (e) => {
        console.log("Jobid", this.props.item._id)
        let mutationResponse = await this.props.ApplyToJobMutation({
            variables: {
                jobId: this.props.item._id,
                studentId: localStorage.getItem("id")
            },
            // refetchQueries: [{ query: QueryAllJobs }]
        });
        window.location.reload()
        // let result = mutationResponse.data;
        // console.log("result",result)
        // if (result) {
        //     console.log("Response",result)
        //     if (result.status === "200") {
        //         this.setState({
        //             success: true,
        //             response: result.message,
        //             loginFlag : true
        //         });
        //     } else {
        //         this.setState({
        //             response: result.message,
        //             loginFlag : true
        //         });
        //     }
        // }
    }

    changeJobDetailsStatus = (e) => {
        if (this.state.jobDetailsStatus === true) {
            this.setState({
                jobDetailsStatus: false,
                name: this.props.item.name
            })
        }
        else {
            this.setState({
                jobDetailsStatus: true
            })
        }
    }
    render() {
        console.log("_id", this.state.jobId)
        let particularJobs = null

        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.state.jobDetailsStatus === true) {
            console.log("inside if in job details", this.state.name)


            particularJobs =
                <MDBContainer style={{ textAlign: "left" }}>
                    <MDBRow>
                        <MDBCol md="4">

                            <br></br>
                            <div>
                                <div className="card-body">
                                    <h2 className="card-title">{this.props.item.title}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {this.props.item.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Category : {this.props.item.category}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Deadline : {String(this.props.item.deadlineDate).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Posted On : {String(this.props.item.postedDate).slice(0, 10)}</h4>
                                </div>
                            </div>

                        </MDBCol>
                        <MDBCol md="8">
                            <div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeJobDetailsStatus}>X</button>
                                    <div className="card-title">
                                        <Link to={{
                                            pathname: './CompanyDetails',
                                            state: {
                                                data: this.props.item.companyId,

                                            }
                                        }}>
                                            <h2>{this.props.item.companyId.name}</h2></Link>
                                    </div>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.title}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Category : {this.props.item.category}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {this.props.item.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Salary : {this.props.item.salary}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Posted On : {String(this.state.postedDate).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Deadline Date : {String(this.state.deadlineDate).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Job Description : {this.props.item.description}</h4>
                                    <button type="button" className="btn btn-success" onClick={this.apply} >Apply</button>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

        }

        else {
            console.log("inside else in job details")

            particularJobs =
                <MDBContainer>
                    <MDBCol md="4">
                        <form style={{ textAlign: "left" }}>
                            <div>
                                <br></br>
                                <div className="card-body">
                                    <h2 className="card-title">{this.props.item.title}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">Company : {this.props.item.companyId.name}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {this.props.item.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Category : {this.props.item.category}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Deadline : {String(this.props.item.deadlineDate).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Posted On : {String(this.props.item.postedDate).slice(0, 10)}</h4>
                                    <button className="btn btn-primary" onClick={this.changeJobDetailsStatus}>View</button>
                                </div>
                                <br></br>
                            </div>
                        </form>
                    </MDBCol>
                </MDBContainer>

        }
        return (
            <div>
                <div key={this.props.item.jobId}></div>
                {redirectVar}
                {particularJobs}


            </div>
        )
    }
}


//export Login Component
export default compose(graphql(ApplyToJobMutation,
    {
        name: "ApplyToJobMutation",
        options: { refetchQueries: [{ query: QueryAllJobs,variables: { id: localStorage.getItem("id") }}] }
    }),
    graphql(QueryAllJobs, {
        options: {
            variables: { id: localStorage.getItem("id") }
        }
    }))(JobDetails);