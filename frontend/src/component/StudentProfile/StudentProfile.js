import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { updateStudentMutation } from '../../mutation/mutation';
import { QueryGetStudent } from '../../queries/queries';



//Define a Component
class StudentProfile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            studentDetailsStatus: false,
            name: "",
            dateOfBirth: "",
            address: "",
            city: "",
            state: "",
            country: "",
            gradDate: "",
            major: "",
            data: "",
            flag: false,
            response: ""

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.changeStudentDetailsStatus = this.changeStudentDetailsStatus.bind(this)
        this.updateStudentDetails = this.updateStudentDetails.bind(this)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    changeStudentDetailsStatus = (e) => {
        e.preventDefault()
        if (this.state.studentDetailsStatus === true) {
            this.setState({
                studentDetailsStatus: false
            })
        }
        else {
            this.setState({
                studentDetailsStatus: true
            })
        }
    }

    updateStudentDetails = async (e) => {
        e.preventDefault()
        let update = await this.props.updateStudentMutation({
            variables: {
                id: localStorage.getItem("id"),
                name: this.state.name,
                dateOfBirth: this.state.dateOfBirth,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                gradDate: this.state.gradDate,
                major: this.state.major
            }
        });
        console.log("Done with updation",update)
        if(update.data.StudentUpdate.status === "200"){
            this.setState({
                studentDetailsStatus : !this.state.studentDetailsStatus,
                flag : false
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let res = {}
        if (this.props.data.Student) {
            console.log('Updating')
            res = this.props.data.Student
            console.log('Updating',res)
        }
        
        console.log("Profile pic url", this.state.profilePicUrl)
        let studentDetails = null;
        if (this.state.studentDetailsStatus === false) {
            studentDetails = <form >
                <div>
                    <div className="card-body">
                        <div className="card-title">
                            <b>General Information :</b>
                        </div>
                        <div >
                            <h5 className="card-subtitle mb-2 text-muted"><div style={{ textAlign: "left" }}>
                                <img style={{ width: "20%", height: "20%" }} src="https://picsum.photos/200/300" className="img-circle" alt="" />
                            </div></h5>
                            <h5 className="card-subtitle mb-2 text-muted">Name : {res.name}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">School Name : {res.schoolName}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">Major : {res.major}</h5>
                        </div>
                        <button className="btn btn-primary" type="button" onClick={this.changeStudentDetailsStatus}>Edit</button>
                    </div>
                </div >
            </form >
        }
        else {

            studentDetails =
                <div>


                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeStudentDetailsStatus}>X</button>
                    <b>Update Basic Details:</b>
                    <br></br>
                    <br></br>
                    <form onSubmit={this.updateStudentDetails} className="form-group">

                        <div className="form-group">
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            Date of Birth :
                            <input
                                onChange={this.changeHandler}
                                type="date"
                                className="form-control"
                                name="dateOfBirth"
                                placeholder="dateOfBirth"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="address"
                                placeholder="Enter Street Address"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="city"
                                placeholder="Enter City"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="state"
                                placeholder="Enter State"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="country"
                                placeholder="Enter Country"
                            />
                        </div>

                        <div className="form-group">
                            Graduation Date :
                            <input
                                onChange={this.changeHandler}
                                type="date"
                                className="form-control"
                                name="gradDate"
                                placeholder="Enter Graduation Date"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="major"
                                placeholder="Enter Your Major"
                                required
                            />
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-primary" >Update</button>
                        <br></br><br></br>
                    </form>
                </div>
        }
        return (
            <div>
                {redirectVar}
                {studentDetails}

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
     }))(StudentProfile);