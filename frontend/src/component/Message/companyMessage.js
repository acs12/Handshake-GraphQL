import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import Display from './display'
import { allStudents } from '../../redux'
import { connect } from 'react-redux'
import MessageBar from '../LandingPage/messageBar'

//Define a Login Component
class Message extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            toggle: false,
            getStudents: [],
            chatId: ""
        }

        this.changeDisplay = this.changeDisplay.bind(this)

    }

    componentDidMount = async () => {
        await this.props.allStudents(null, res => {
            console.log(res)
            this.setState({
                getStudents: res.data
            })
        })
    }

    changeDisplay = (e) => {
        if (this.state.toggle === false) {

            this.setState({
                toggle: true
            })
        }
        else {

            this.setState({
                toggle: false
            })
        }
    }

    render() {
        let chat = null
        let redirectVar = null
        let bar = null
        // console.log("_id", this.state.jobId)
        console.log("Students", this.state.getStudents)
        if (localStorage.getItem("type") === "student") {
            bar = <MessageBar></MessageBar>
        }

        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }

        chat = <div>{this.state.getStudents.map(x => <Display key={x._id} item={x}></Display>)}</div>


        return (
            <div>
                {bar}
                {redirectVar}
                {chat}
            </div>
        )
    }
}


//export Login Component
export default connect(null, { allStudents })(Message);