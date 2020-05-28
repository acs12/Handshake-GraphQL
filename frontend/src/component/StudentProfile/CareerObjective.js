import React, { Component } from 'react';
import '../../App.css';
import { graphql, compose } from 'react-apollo';
import { updateStudentMutation } from '../../mutation/mutation';
import { QueryGetStudent } from '../../queries/queries';
import { Redirect } from 'react-router';


//Define a Component
class CareerObjective extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            careerObjStatus: false,
            careerObjective: "",
            getCareerObjective: "",
            response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.updateCareerObjective = this.updateCareerObjective.bind(this)

    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateCareerObjective = async (e) => {
        e.preventDefault()
        let update = await this.props.updateStudentMutation({
            variables: {
                id: localStorage.getItem("id"),
                careerObjective : this.state.careerObjective
            }
        });
        console.log("Done with updation",update)
        if(update.data.StudentUpdate.status === "200"){
            this.setState({
                careerObjStatus : !this.state.careerObjStatus,
            })
        }

    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let careerObj = null
        let res = {}
        if (this.props.data.Student) {
            console.log('Updating')
            res = this.props.data.Student
            console.log('Updating',res)
        }
        if (this.state.careerObjStatus === false) {
            careerObj = 
                <div>
                    <br></br>
                    <b>My Journey :</b>
                    <br></br> <br></br>
                    <div>
                       {res.careerObjective}
                    </div>
                    <br></br>
                    <button className="btn btn-primary" type="submit" onClick = {(e)=> {this.setState({careerObjStatus : true})}}>Edit</button>
                </div>
                
        }
        else{
            careerObj = <form onSubmit={this.updateCareerObjective}>
                <div>
                    <br></br>
                    <b>My Journey :</b>
                    <br></br> <br></br>
                    <div>
                       {res.careerObjective}
                    </div>
                    <br></br>
                    What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?
                    <div className="form-group">
                        <input onChange={this.changeHandler} className="form-control" type="textarea" name="careerObjective" placeholder="Type your introduction..." />
                    </div>
                </div>
                
                <button className="btn btn-primary" type="submit">Save</button>

            </form>
        }
        return (
            <div>
                {redirectVar}
                {careerObj}
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
     })) (CareerObjective);