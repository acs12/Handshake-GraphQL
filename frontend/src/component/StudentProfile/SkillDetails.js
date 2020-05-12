import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import EditSkill from './EditSkill'
import { addSkill } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';


//Define a Login Component
class SkillDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            skillStatus: false,
            skills: [],
            skillName: "",
            // response: ""
        }
        //Bind the handlers to this class
        this.addSkills = this.addSkills.bind(this)

    }


    componentDidUpdate(prevProps, prevState) {
        console.log("SKILLS : componentDidUpdate CALLED")
        if (prevProps.skills !== this.props.skills) {
            this.setState({ skills: this.props.skills })
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    addSkills = async (e) => {

        e.preventDefault()
        let addSkills = {
            _id: this.state.id,
            skillName: this.state.skillName
        }

        await this.props.addSkill(addSkills, res => {
            console.log(res)
            if (this.state.skillStatus === true) {
                this.setState({
                    skillStatus: false
                })
            }
            else {
                this.setState({
                    skillStatus: true
                })
            }
        })

    }

    changeSkillStatus = (e) => {
        if (this.state.skillStatus === true) {
            this.setState({
                skillStatus: false
            })
        }
        else {
            this.setState({
                skillStatus: true
            })
        }
    }

    render() {
        // this.componentDidUpdate()
        console.log("Skill details",this.state)
        console.log("Props Skill",this.props.skills)
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        // let response = this.state.response
        let skill = null
        if (this.state.skillStatus === false) {
            console.log("Inside if in skill details")
            skill = <div>

                <b>Skill :</b>
                <br></br>
                <br></br>
                {this.state.skills.map(x => <EditSkill key={x._id} item={x} action={this.update}></EditSkill>)}
                <br></br>
                <button onClick={this.changeSkillStatus} className="btn btn-primary">Add Skill</button>

            </div>
        }
        else {
            console.log("Inside if in skill details")
            skill = <div>
                <form onSubmit={this.addSkills}>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeSkillStatus}>X</button>
                    <b>Add Skill :</b>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="skillName"
                            placeholder="Enter new Skill"
                            autoFocus
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>

                    <br></br>
                </form>
            </div>
        }
        return (
            <div>
                {redirectVar}
                {skill}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        skills: state.studentProfile.skills
    }
}
//export Login Component
export default connect(mapStateToProps, { addSkill })(SkillDetails);