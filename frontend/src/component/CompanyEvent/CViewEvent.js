import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {  getEventsById } from '../../redux'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CompanyEventBar from '../LandingPage/CompanyEventBar'

class CViewEvent extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            eventsByCompany: [],
            id: localStorage.getItem("id"),
            currentPage: 1,
            itemsPerPage: 2
        }
    }

    componentDidMount = () => {
        let getEventsByCompany = {
            companyId: this.state.id
        }
        this.props.getEventsById(getEventsByCompany,res=>{
            console.log(res.data)
            this.setState({
                eventsByCompany : res.data
            })
        })
    }

    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }


    render() {
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage
        let renderPageNumbers = null;

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let events = null
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.state.eventsByCompany.length === 0) {
            events = <div style={{ textAlign: "center" }}>
                <h4>No Events Posted</h4>
            </div>
        }
        else {
            const currentItems = this.state.eventsByCompany.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            events = <div>
                <MDBContainer>
                    <MDBCol style={{ textAlign: "left" }}>
                        {currentItems.map(x => {
                            let data = {
                                name : x.name,
                                student : x.application
                            }
                            return (
                                <MDBRow>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <Link to={{
                                                pathname: './StudentListEvent',
                                                state: { ...data }
                                            }}>
                                                <h3>{x.name}</h3></Link>
                                        </div>
                                        <h5 className="card-subtitle mb-2 text-muted">Location : {x.location}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Date : {String(x.date).slice(0,10)}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Time : {x.time}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Description : {x.description}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Eligibility : {x.eligibility}</h5>
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

        for (let i = 1; i <= Math.ceil(this.state.eventsByCompany.length / itemsPerPage); i++) {
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
                <CompanyEventBar />
                {events}
                {renderPageNumbers}
            </div>
        )
    }
}
export default connect(null,{getEventsById})(CViewEvent);