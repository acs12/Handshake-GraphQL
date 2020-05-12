import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { getEvents } from '../../redux'
import { connect } from 'react-redux'
import NavbarEvent from '../LandingPage/NavbarEvent';
import EventDetails from './EventDetails'

//Define a Login Component
class StudentEvent extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            getEvents: [],
            filteredEvents: [],
            filteredSearch: 0,

        }
        //Bind the handlers to this class
        this.eventSearch = this.eventSearch.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("StudentEvent : componentDidUpdate CALLED")
        if (prevProps.data !== this.props.data) {
            this.setState({
                filteredEvents: this.props.data,
                getEvents: this.props.data
            })
        }
    }

    componentDidMount = (e) => {
        // e.preventDefault();
        let getAllEvents = {
            studentId: this.state.id
        }
        this.props.getEvents(getAllEvents, res => {
            console.log(res)
            this.setState({
                getEvents: res.data,
                filteredEvents: res.data
            })
        })
    }


    eventSearch = (e) => {
        let filteredSearchEvents = this.state.getEvents;
        console.log("Filtered Search Jobs", filteredSearchEvents)
        if (e.target.value) {
            this.setState({
                filteredSearch: 1,
                filteredEvents: filteredSearchEvents.filter((ev) => {
                    return (ev.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
        else {
            this.setState({
                filteredSearch: 0,
                filteredEvents: filteredSearchEvents.filter((ev) => {
                    return (!ev.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
    }

    render() {

        var gtEvents = null
        if (this.state.filteredSearch === 1) {
            console.log("inside if in filter", this.state.filteredEvents)
            gtEvents = <div>
                <form style={{ textAlign: "center" }}>
                    {this.state.filteredEvents.map(x => <EventDetails key={x._id} item={x}></EventDetails>)}
                </form>
            </div>
        }

        else if (this.state.getEvents.length === 0) {
            gtEvents = "No Upcoming Events"
        }

        else {
            console.log("inside else in events", this.state.filteredEvents)
            gtEvents = <div>
                <form style={{ textAlign: "center" }}>
                    {this.state.getEvents.map(x => <EventDetails key={x._id} item={x}></EventDetails>)}
                </form>
            </div>
        }




        return (
            <div>
                <NavbarEvent />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol style={{ textAlign: "center" }}>

                            <br></br>
                            <div>
                                <br></br>
                                <i className="glyphicon glyphicon-search"></i>
                                <input id="search" class="form-control" type="text" onChange={this.eventSearch} placeholder="Search Event Name" />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow style={{ textAlign: "center" }} md="5">
                        <MDBCol>
                            {gtEvents}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        data : state.events.data
    }
}
//export Login Component
export default connect(mapStateToProps, { getEvents })(StudentEvent);