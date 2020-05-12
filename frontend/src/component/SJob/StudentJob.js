import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import JobDetails from './JobDetails'
import { graphql, compose } from 'react-apollo';
import { QueryAllJobs } from '../../queries/queries';
import NavbarJob from "../LandingPage/NavbarJob";

//Define a Login Component
class StudentJob extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            getJobsStatus: false,
            getJobs: [],
            filteredJobs: [],
            currentPage: 1,
            itemsPerPage: 2

        }
        //Bind the handlers to this class
        this.jobSearch = this.jobSearch.bind(this)
    }


    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }


    jobSearch = (e) => {
        let filteredSearchJobs = this.state.getJobs;
        if (e.target.value) {
            this.setState({
                filteredJobs: filteredSearchJobs.filter((job) => {
                    return (
                        job.title.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
                        job.companyId.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
        else {
            this.setState({
                filteredJobs: this.state.getJobs
            })
        }
    }

    render() {
        let renderPageNumbers = null;
        if (this.props.data.AllJobs && this.state.getJobsStatus === false) {
            let result = this.props.data.AllJobs
            console.log("result Student Job", result)
            this.setState({
                filteredJobs: result.JobObj,
                getJobs: result.JobObj,
                getJobsStatus: true
            })
        }

        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let clear = null
        var gtJobs = null
        console.log("GJ", this.state.getJobs)
        console.log("FJ", this.state.filteredJobs)

        if (this.state.filteredJobs.length === 0) {
            gtJobs = "No Jobs Available"
        }

        else {

            const currentItems = this.state.filteredJobs.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            gtJobs = <div>
                <form style={{ textAlign: "center" }}>
                    {currentItems.map(x => <JobDetails key={x._id} item={x}></JobDetails>)}
                </form>
            </div>
        }

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.state.filteredJobs.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }



        renderPageNumbers = (
            <nav aria-label="Page navigation example" class="pagebar">
                <ul class="pagination">
                    {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                </ul>
            </nav>
        );




        return (
            <div>
                <NavbarJob />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol style={{ textAlign: "center" }}>
                            <br></br>
                            <div>
                                <i className="glyphicon glyphicon-search"></i>
                                <input id="search" className="form-control" type="text" onChange={this.jobSearch} placeholder="Enter Job Title or Company Name or Location" />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <br></br>
                    <MDBRow style={{ textAlign: "center" }} md="5">
                        <MDBCol>
                            {gtJobs}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ textAlign: "center" }}>
                        <MDBCol >
                            {renderPageNumbers}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}


//export Login Component
export default compose(graphql(QueryAllJobs, {
    options: {
        variables: { id: localStorage.getItem("id") }
    }
}))(StudentJob);