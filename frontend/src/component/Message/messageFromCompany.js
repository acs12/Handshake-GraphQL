import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import CompanyDisplay from './companyDisplay'
import { messageFromCompany } from '../../redux'
import { connect } from 'react-redux'
import MessageBar from '../LandingPage/messageBar'

//Define a Login Component
class MessageFromCompany extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            toggle: false,
            getCompany: [],
            chatId: ""
        }

        // this.changeDisplay = this.changeDisplay.bind(this)

    }

    componentDidMount = async () => {
        let data = {
            studentId: this.state.id
        }
        await this.props.messageFromCompany(data, res => {
            console.log(res)
            this.setState({
                getCompany: res.data
            })
        })
    }

    // changeDisplay = (e) => {
    //     if (this.state.toggle === false) {

    //         this.setState({
    //             toggle: true
    //         })
    //     }
    //     else {

    //         this.setState({
    //             toggle: false
    //         })
    //     }
    // }

    render() {
        console.log(this.state)
        let chat = null
        let redirectVar = null
        // console.log("_id", this.state.jobId)
        console.log("Company", this.state.getCompany)

        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.state.getCompany.length === 0) {
            chat = <div style={{ textAlign: "center" }}>
                <br></br>
                <br></br>
                <h3>No Messages</h3>
                </div>
        }
        else {
            chat = <div>{this.state.getCompany.map(x => <CompanyDisplay key={x._id} item={x}></CompanyDisplay>)}</div>
        }

        return (
            <div>
                <MessageBar />
                {redirectVar}
                {chat}
            </div>
        )
    }
}


//export Login Component
export default connect(null, { messageFromCompany })(MessageFromCompany);