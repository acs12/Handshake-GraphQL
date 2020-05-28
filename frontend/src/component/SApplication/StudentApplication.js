import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import NavbarJob from '../LandingPage/NavbarJob';
import { graphql, compose } from 'react-apollo';
import { QueryAppliedJobs } from '../../queries/queries';


class StudentApplication extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            getAppsStatus: false,
            getApps: [],
            filteredApplicaion: [],
            pendingStatus: 0,
            reviewedStatus: 0,
            declinedStatus: 0,
            currentPage: 1,
            itemsPerPage: 2
        }
    }


    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }

    render() {
        if(this.props.data.AllApplication && this.state.getAppsStatus === false){
            let result = this.props.data.AllApplication
            this.setState({
                getApps : result.JobObj,
                getAppsStatus : true
            })
        }
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage
        let renderPageNumbers = null;

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let gtApps = null
        console.log("Filtered application", this.state.filteredApplicaion)
        if (this.state.getApps.length === 0) {
            gtApps = <form style={{ textAlign: "center" }}>
                <br></br>
                <h4>No Applications Done.</h4>
            </form>
        }

        else {
            const currentItems = this.state.getApps.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            gtApps = <div>
                <form style={{ textAlign: "left" }}>
                    {currentItems.map(x => {
                        return (
                            <div>
                                <br></br>
                                <div className="card-body">
                                    <h2 className="card-title">{x.title}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">Company: {x.companyId.name}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Job Title: {x.title}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location: {x.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Salary: {x.salary}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Application Date : {String(x.application[0].applicationDate).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Description: {x.description}</h4>
                                    
                                </div>
                                <br></br>
                            </div>
                        )
                    })}
                </form>

            </div>

            const pageNumbers = [];

            for (let i = 1; i <= Math.ceil(this.state.getApps.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }

            renderPageNumbers = (
                <nav aria-label="Page navigation example" class="pagebar">
                    <ul class="pagination">
                        {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                    </ul>
                </nav>
            );

        }



        return (
            <div>
                <NavbarJob />
                <MDBContainer >
                    <MDBRow style={{ textAlign: "left" }}>
                        <MDBCol style={{ textAlign: "left" }} md="5">
                            {gtApps}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            {renderPageNumbers}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        )
    }
}

export default compose(graphql(QueryAppliedJobs, {
    options: {
        variables: { id: localStorage.getItem("id") }
    }
}))(StudentApplication);