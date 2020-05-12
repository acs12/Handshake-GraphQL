import React, { Component } from 'react';
import '../../App.css';
import PreviosChat from './previousChat'
import { MDBContainer, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';
import { companySendsMessage } from '../../redux'
import { connect } from 'react-redux'


class CompanyDisplay extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            toggle: false,
            text: "",
            data: []
        }

        this.changeDisplay = this.changeDisplay.bind(this)
        this.changHandler = this.changHandler.bind(this)
        this.chat = this.chat.bind(this)

    }

    changHandler = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    chat = async (id) => {
        // e.preventDefault()
        let data = {
            _id: this.state.id,
            id: id,
            text: this.state.text

        }
        console.log("data to send", data)
        await this.props.companySendsMessage(data, res => {
            console.log(res)
            this.setState({
                data: res.data.chat
            })
        })
        console.log("data to send", data)

    }

    changeDisplay = async (id) => {
        if (this.state.toggle === false) {
            let data = {
                _id: this.state.id,
                id: id
            }
            console.log("data to send", data)
            await this.props.companySendsMessage(data, res => {
                if (TypeError) {
                    console.log("res",res)
                    this.setState({
                        data: res.data[0].chat,
                        toggle: true
                    })
                }
                else {
                    console.log("res", res)
                    console.log("res", typeof (res.data))
                    this.setState({
                        data: res.data[0].chat,
                        toggle: true
                    })
                    console.log("this.state", this.state)
                }
            })
        }
        else {
            this.setState({
                toggle: false
            })
        }
    }

    render() {
        let redirectVar = null
        let chatWindow = null
        console.log("_id", this.state.jobId)
        console.log("Students", this.state.getStudents)
        console.log("chat", this.state.data)

        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let chats = null
        if (this.state.data !== undefined) {
            chats = this.state.data.map(x => <PreviosChat key={x._id} item={x}></PreviosChat>)
        }

        // if(this.props.item._id === this.state.id){
        //     chatWindow ==
        // }

        if (this.state.toggle === false) {
            console.log("inside if in job details", this.state.name)
            chatWindow = <div>
                < MDBContainer >
                    <div className="card">
                        <div className="card-subtitle mb-2 text-muted">
                            <div style={{ textAlign: "left" }}>
                                <img style={{ width: "10%", height: "10%" }} className="img-circle" src={this.props.item.user1.profilePicUrl} alt=""></img>
                            </div>
                            <div className="card-title">
                                <h2>{this.props.item.name}</h2>
                            </div>
                            <h4 className="card-subtitle mb-2 text-muted">School : {this.props.item.user1.location}</h4>
                            <br></br>
                            <button type="submit" className="btn btn-primary" onClick={() => { this.changeDisplay(this.props.item.user1._id) }}>Chat</button>
                            <br></br>
                            <br></br>

                        </div>
                    </div>
                </MDBContainer>
            </div >

        }


        else if (this.state.toggle === true) {
            chatWindow = <div>
                < MDBContainer >
                    <div className="card">
                        <MDBCol style={{ textAlign: "left" }}>
                            <div className="card-subtitle mb-2 text-muted">
                                <div style={{ textAlign: "left" }}>
                                    <img style={{ width: "8%", height: "8%" }} className="img-circle" src={this.props.item.user1.profilePicUrl} alt=""></img>
                                </div>
                                <div className="card-title">
                                    <h2>{this.props.item.user1.name}</h2>
                                </div>
                                <h4 className="card-subtitle mb-2 text-muted">School : {this.props.item.user1.location}</h4>
                                <br></br>
                            </div>
                        </MDBCol>
                        <MDBCol style={{ textAlign: "right" }}>
                            <button type="button" className="btn btn-danger" onClick={this.changeDisplay}>X</button>
                            <br></br>
                            <br></br>
                            <div className="card">
                                <div className="card-body" style={{ textAlign: "center" }}>
                                    {chats}
                                    <textarea onChange={this.changHandler} placeholder="Enter Message"></textarea>
                                    <br></br>
                                    <button className="btn btn-success" onClick={() => { this.chat(this.props.item.user1._id) }}>Send</button>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                        </MDBCol>
                    </div>
                </MDBContainer>
            </div >
        }
        else {
            chatWindow = null
        }
        return (
            <div key={this.props.item._id}>.
                {redirectVar}
                {chatWindow}
            </div>
        )
    }
}


//export Login Component
export default connect(null, { companySendsMessage })(CompanyDisplay);