import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { updateCompanyMutation } from '../../mutation/mutation';
import { QueryGetCompany } from '../../queries/queries';




class CompanyProfile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            companyDetailsStatus: false,
            profilePicUrl: "",
            name: "",
            location: "",
            description: "",
            phoneNumber: "",
            email: "",
            response: "",
            id: localStorage.getItem("id")

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.changeCompanyDetailsStatus = this.changeCompanyDetailsStatus.bind(this)
        this.updateCompanyDetails = this.updateCompanyDetails.bind(this)
    }


    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }



    changeCompanyDetailsStatus = (e) => {
        if (this.state.companyDetailsStatus === true) {
            this.setState({
                companyDetailsStatus: false
            })
        }
        else {
            this.setState({
                companyDetailsStatus: true
            })
        }
    }

    updateCompanyDetails = async (e) => {
        e.preventDefault()
        let update = await this.props.updateCompanyMutation({
            variables: {
                id: localStorage.getItem("id"),
                name: this.state.name,
                location: this.state.location,
                description: this.state.description,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
            }
        });
        console.log("Done with updation", update)
        if (update.data.CompanyUpdate.status === "200") {
            this.setState({
                companyDetailsStatus: !this.state.companyDetailsStatus,
                flag: false
                // data : this.props.data.Student
            })
        }

    }

    render() {
        let redirectVar = null;
        let res = {}
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/CompanyLogin" />
        }
        if (this.props.data.Company) {
            console.log('Updating')
            res = this.props.data.Company
            console.log('Updating',res)
        }
        console.log("Profile pic url", this.state)
        let companyDetails = null;
        if (this.state.companyDetailsStatus === false) {
            companyDetails = <form >
                <br></br>
                <br></br>
                <div>
                    <div style={{ textAlign: "left" }}>
                        <img style={{ width: "15%", height: "15%" }} src="https://picsum.photos/200/300" className="img-circle" alt=""></img>
                    </div>
                    <br></br>
                    <div className="form-control-plaintext">

                        <b><h3>{res.name}</h3></b>
                    </div>
                    <div className="form-control-plaintext">
                        <b>Description : </b>
                        {res.description}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Location : </b>
                        {res.location}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Email : </b>
                        {res.email}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Phone-Number : </b>
                        {res.phoneNumber}
                    </div><br></br>
                    <button className="btn btn-primary" type="button" onClick={this.changeCompanyDetailsStatus}>Edit</button>

                </div >
            </form >
        }
        else {

            companyDetails =
                <div>

                    <form onSubmit={this.updateCompanyDetails}>

                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeCompanyDetailsStatus}>X</button>
                        <b>Update Basic Details:</b>
                        <br></br>
                        <br></br>

                        <div className="form-group">
                            Company Name :
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter Name for your Company"
                                value={this.state.name}
                                required
                            />
                        </div>

                        <div className="form-group">
                            Description :
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="description"
                                value={this.state.description}
                                placeholder="Description of what you do."
                                required
                            />
                        </div>

                        <div className="form-group">
                            Location :
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="location"
                                value={this.state.location}
                                placeholder="Enter Location of your company"
                            />
                        </div>

                        <div className="form-group">
                            Email :
                            <input
                                onChange={this.changeHandler}
                                type="email"
                                className="form-control"
                                name="email"
                                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                value={this.state.email}
                                placeholder="Enter Email-ID"
                            />
                        </div>
                        <div className="form-group">
                            Phone-Number
                            <input
                                onChange={this.changeHandler}
                                type="number"
                                className="form-control"
                                name="phoneNumber"
                                min="0"
                                max="999999999999"
                                value={this.state.phoneNumber}
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        <br></br>
                        <button className="btn btn-primary" type="submit">Update</button>
                        <br></br><br></br>

                    </form>
                </div>
        }
        return (
            <div>
                {redirectVar}
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol md="6">
                        {companyDetails}
                    </MDBCol>
                    <MDBCol md="3">

                    </MDBCol>

                </MDBContainer>
            </div>
        )
    }
}

export default compose(graphql(QueryGetCompany, {
    options: {
        variables: { id: localStorage.getItem("id") }
    }
}), graphql(updateCompanyMutation,
    {
        name: "updateCompanyMutation",
        options: { refetchQueries: [{ query: QueryGetCompany, variables: { id: localStorage.getItem("id") } }] }
    }))(CompanyProfile);