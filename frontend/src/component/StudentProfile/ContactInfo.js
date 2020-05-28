import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { updateStudentMutation } from '../../mutation/mutation';
import { QueryGetStudent } from '../../queries/queries';



//Define a Component
class ContactInfo extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            studentContactInfoStatus: false,
            email: "",
            phoneNumber: "",
            response: ""

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.changeStudentContactInfoStatus = this.changeStudentContactInfoStatus.bind(this)
        this.updateStudentContactinfo = this.updateStudentContactinfo.bind(this)
    }


    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateStudentContactinfo = async (e) => {
        e.preventDefault()
        let update = await this.props.updateStudentMutation({
            variables: {
                id: localStorage.getItem("id"),
                email : this.state.email,
                phoneNumber : this.state.phoneNumber
            }
        });
        console.log("Done with updation",update)
        if(update.data.StudentUpdate.status === "200"){
            this.setState({
                studentContactInfoStatus : !this.state.studentContactInfoStatus,
            })
        }
    }


    changeStudentContactInfoStatus = (e) => {
        e.preventDefault()
        if (this.state.studentContactInfoStatus === true) {
            this.setState({
                studentContactInfoStatus: false
            })
        }
        else {
            this.setState({
                studentContactInfoStatus: true
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let studentContactInfo = null;
        let res = {}
        if (this.props.data.Student) {
            console.log('Updating')
            res = this.props.data.Student
            console.log('Updating',res)
        }
        if (this.state.studentContactInfoStatus === false) {
            studentContactInfo = <form >
                <b>Contact Informtion :</b>
                <br></br>
                <div className="card">
                    <div className="card-body"></div>

                    <h6 className="card-subtitle mb-2 text-muted"> <b>Email : </b>{res.email}</h6>

                    <h6 className="card-subtitle mb-2 text-muted"> <b> Phone-Number : </b>{res.phoneNumber}</h6>
                    <br></br>

                </div>
                <button className="btn btn-primary" type="button" onClick={this.changeStudentContactInfoStatus}>Edit</button>
            </form >
        }
        else {

            studentContactInfo = <form onSubmit={this.updateStudentContactinfo}>
                <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeStudentContactInfoStatus}>X</button>

                <b>Update Contact Information :</b>
                <br></br>

                <div className="form-group">
                    <input
                        onChange={this.changeHandler}
                        type="text"
                        className="form-control"
                        name="email"
                        required
                        autoFocus
                        placeholder="Enter New Email"
                    />
                </div>

                <div className="form-group">
                    <input
                        onChange={this.changeHandler}
                        type="Number"
                        min="0"
                        max="999999999999"
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                    />
                </div>
                <br></br>
                <button className="btn btn-primary" type="submit">Update</button>
                <br></br>
            </form>
        }
        return (
            <div>
                {redirectVar}
                {studentContactInfo}

            </div>
        )
    }
}

//export Component

export default compose(graphql(QueryGetStudent, {
    options: {
        variables: { id: localStorage.getItem("id") }
    }
}), graphql(updateStudentMutation, 
    { 
        name: "updateStudentMutation",
        options: { refetchQueries: [{ query: QueryGetStudent, variables: { id: localStorage.getItem("id") } }] }
     })) (ContactInfo);