import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import { Link } from 'react-router-dom';
import { applyToEvent } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

class EventDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            eventDetailsStatus: false,
            toggle: false,
            eligible: this.props.item.eligibility,
            cname: this.props.item.companyId.name,
            companyId: this.props.item.companyId,
            eventId: this.props.item._id,
            response: "",
            resume: "",
        }

        this.changeEventDetailsStatus = this.changeEventDetailsStatus.bind(this)
        this.changeDisplay = this.changeDisplay.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.registerEvent = this.registerEvent.bind(this)
    }

    registerEvent = async (e) => {
        e.preventDefault()
        let registerEvent = {
            studentId: this.state.id,
            _id: this.state.eventId
        }
        await this.props.applyToEvent(registerEvent, res => {
            console.log(res.data)
        })
    }

    changeHandler = (e) => {
        let enteredData = this.refs.major.value.toLowerCase()
        console.log("entered data", enteredData)
        let eligible = this.state.eligible.toLowerCase()
        console.log("eligible", eligible)
        let x = (enteredData.replace(/\s+/g, '').includes(eligible.replace(/\s+/g, '')))
        console.log("x", x)
        if (eligible === "all") {
            this.registerEvent(e)
        }
        else if (x === true) {
            this.registerEvent(e)
        }
        else {
            e.preventDefault()
            this.setState({
                response: alert("Only " + this.state.eligible + " students can register for this event")
            })
        }
    }

    changeDisplay = (e) => {
        if (this.state.toggle === false) {
            this.refs.ResumeButtonDisplay.style.display = "block"
            this.setState({
                toggle: true
            })
        }
        else {
            this.refs.ResumeButtonDisplay.style.display = "none"
            this.setState({
                toggle: false
            })
        }
    }

    changeEventDetailsStatus = (e) => {
        if (this.state.eventDetailsStatus === true) {
            this.setState({
                eventDetailsStatus: false,
                cname: this.props.item.cname
            })
        }
        else {
            this.setState({
                eventDetailsStatus: true
            })
        }
    }
    render() {
        let particularEvents = null
        let response = this.state.response
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/home" />
        }
        if (this.state.eventDetailsStatus === true) {


            particularEvents =
                <MDBContainer style={{ textAlign: "left" }}>
                    <MDBCol md="4">
                        <form>
                            <br></br>
                            <div>
                                <div className="card-body">
                                    <h2 className="card-title">{this.props.item.name}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">Date : {String(this.props.item.date).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Time : {this.props.item.time}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {this.props.item.location}</h4>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol md="8">
                        <form>
                            <div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeEventDetailsStatus}>X</button>
                                    <div className="card-title">
                                        <Link to={{
                                            pathname: '../SJob/CompanyDetails',
                                            state: { name: this.props.item.companyId }
                                        }}>
                                            <h2>{this.props.item.companyId.name}</h2></Link>
                                    </div>
                                    <h4 className="card-title">{this.props.item.name}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {this.props.item.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Date : {String(this.props.item.date).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Time : {String(this.props.item.time).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Description : {this.props.item.description}</h4>
                                    <button type="button" refs="buttonToggle" style={{ display: "block", float: "right" }} className="btn btn-success" onClick={this.changeDisplay} >Apply</button>
                                    <div className="card-subtitle mb-2 text-muted" ref="ResumeButtonDisplay" style={{ display: "none" }}>
                                        <form onSubmit={this.changeHandler}>
                                            <div className="form-group">
                                                <b>Enter your Major :</b>
                                                <input
                                                    type="text"
                                                    ref="major"
                                                    name="major"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            {response}
                                            <button type="submit" className="btn btn-primary" style={{ float: "left" }} >Submit</button>
                                            <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeDisplay} >Cancel</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBContainer>
        }

        else {
            console.log("inside else in job details")

            particularEvents =
                <MDBContainer>
                    <MDBCol md="4">
                        <form style={{ textAlign: "left" }}>
                            <div>
                                <br></br>
                                <div className="card-body">
                                    <h2 className="card-title">{this.props.item.name}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">Date : {String(this.props.item.date).slice(0, 10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Time : {this.props.item.time}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {this.props.item.location}</h4>
                                    <button className="btn btn-primary" onClick={this.changeEventDetailsStatus}>View</button>
                                </div>
                                <br></br>
                            </div>
                        </form>
                    </MDBCol>
                </MDBContainer>

        }
        return (
            <div>
                <div key={this.props.item.eventId}></div>
                {redirectVar}
                {particularEvents}

            </div>
        )
    }
}

export default connect(null, { applyToEvent })(EventDetails);