import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer } from "mdbreact";
// import { companySendsMessage } from '../../redux'
// import { connect } from 'react-redux'


class PreviousChat extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),

        }

    }

    render() {
        let chatHistory = null
        if (this.props.item.from === this.state.id) {
            chatHistory = <div>
                < MDBContainer >
                    <div style={{textAlign : "right"}}>
                        <h6>{this.props.item.text}</h6>
                        <hr></hr>
                    </div>
                </MDBContainer>
            </div >
        }
        else{
            chatHistory = <div>
                < MDBContainer >
                    <div style={{textAlign : "left"}}>
                        <h6>{this.props.item.text}</h6>
                        <hr></hr>
                    </div>
                </MDBContainer>
            </div >
        }

        return (
            <div key={this.props.item._id}>
                {chatHistory}
            </div>
        )
    }
}


//export Login Component
export default PreviousChat;