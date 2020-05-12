import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { deleteSkill } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

//Define a Login Component
class EditSkill extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            existingSkillStatus: false,
            skillId: this.props.item._id,
            skillName: this.props.item.skillName,
            // response: ""
        }
        //Bind the handlers to this class
        this.delete = this.delete.bind(this)
        this.changeHandler = this.changeHandler.bind(this);
        this.changeExistingSkill = this.changeExistingSkill.bind(this)
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    delete = async (e) => {
        e.preventDefault();
        let deleteSkill = {
            _id: this.state.id,
            id: this.state.skillId,
        }
        await this.props.deleteSkill(deleteSkill, res => {
            console.log(res)
            if (this.state.existingSkillStatus === true) {
                this.setState({
                    existingSkillStatus: false
                })
            }
            else {
                this.setState({
                    existingSkillStatus: true
                })
            }

        })

    }

    changeExistingSkill = (e) => {

        if (this.state.existingSkillStatus === true) {
            this.setState({
                existingSkillStatus: false
            })
        }
        else {
            this.setState({
                existingSkillStatus: true
            })
        }

    }


    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }

        let existSkill = null
        if (this.state.existingSkillStatus === false) {
            console.log("Inside if in change existing skills")
            existSkill = <div>
                <div className="card">
                    <div className="card-body">
                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.delete}>Delete</button>
                        {console.log("skill", this.props.item.skillName)}
                        <h5 className="card-title">{this.props.item.skillName}</h5>
                    </div>
                </div>

                <br></br>
            </div>
        }
        return (
            <div>
                <div key={this.props.item._id}></div>
                {redirectVar}
                {existSkill}

            </div>
        )
    }
}
//export Login Component
export default connect(null, { deleteSkill })(EditSkill);