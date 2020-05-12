import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { QueryAllJobs } from '../../queries/queries';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CompanyJobBar from '../LandingPage/CompanyJobBar'

class CViewJob extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            jobsByCompany: [],
            currentPage: 1,
            itemsPerPage: 2,
            getJobsStatus : false
        }
    }


    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }


    render() {
        if (this.props.data.AllJobs  && this.state.getJobsStatus === false) {
            let result = this.props.data.AllJobs
            console.log("result Student Job", result)
            this.setState({
                jobsByCompany: result.CompanyJobObj,
                getJobsStatus : true
            })
        }
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        let renderPageNumbers = null;

        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let jobs = null
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.state.jobsByCompany.length === 0) {
            jobs = <div style={{ textAlign: "center" }}>
                <h4>No Jobs Posted</h4>
            </div>
        }
        else {
            const currentItems = this.state.jobsByCompany.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            jobs = <div>
                <MDBContainer>
                    <MDBCol style={{ textAlign: "left" }}>
                        {currentItems.map(x => {
                            console.log("XX",x)
                            let data = {
                                x : x,
                                title : x.title,
                                student : x.application
                            }
                            return (
                                <MDBRow>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <Link to={{
                                                pathname: './StudentList',
                                                state: { ...data }
                                            }}>
                                                <h3>{x.title}</h3></Link>
                                        </div>
                                        <div >
                                            <h5 className="card-subtitle mb-2 text-muted">Location : {x.location}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Posted On : {String(x.postedDate).slice(0,10)}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Application Deadline : {String(x.deadlineDate).slice(0,10)}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Salary : {x.salary}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Description : {x.description}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Category : {x.category}</h5>
                                        </div>
                                    </div>
                                    <br></br><br></br>
                                </MDBRow>
                            )
                        })}
                    </MDBCol>
                </MDBContainer>

            </div >
        }

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.state.jobsByCompany.length / itemsPerPage); i++) {
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
                {redirectVar}
                <CompanyJobBar />
                {jobs}
                {renderPageNumbers}
            </div>
        )
    }
}


export default compose(graphql(QueryAllJobs, {
    options: {
        variables: { companyId: localStorage.getItem("id") }
    }
}))(CViewJob);