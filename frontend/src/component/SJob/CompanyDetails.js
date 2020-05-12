import React, { Component } from 'react';
import '../../App.css';




//Define a Login Component
class CompanyDetails extends Component {
    //call the constructor method
   
    render() {
        console.log("getCmpDetails", this.props.location.state.data)
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>


                <div className="card" style={{ textAlign: "center" }}>
                    <div className="card-body">
                        <h2 className="card-title">{this.props.location.state.data.name}</h2>
                        <h5 className="card-subtitle mb-2 text-muted">Email : {this.props.location.state.data.email}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Location : {this.props.location.state.data.location}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Description : {this.props.location.state.data.description}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Contact : {this.props.location.state.data.phoneNumber}</h5>
                    </div>
                </div>


            </div>
        )
    }
}
//export Login Component
export default CompanyDetails;