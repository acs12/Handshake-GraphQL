import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import { Link } from 'react-router-dom';
import CompanyEventBar from '../LandingPage/CompanyEventBar'

class StudentListEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.location.state.name,
            studentList: this.props.location.state.student,
            currentPage: 1,
            itemsPerPage: 2
        }

    }

    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }


    render() {
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage
        let renderPageNumbers = null;

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let list = []
        if (this.props.location.state.student.length === 0) {
            list = <MDBContainer>
                <MDBCol style={{ textAlign: "center" }}>
                    <div className="card-body">
                        <div >
                            <Link to={{
                                pathname: './CViewEvent',
                            }}>
                                <button className="btn btn-danger">X</button>
                            </Link>
                        </div>
                        <div className="card-title" >
                            <h2>{this.props.location.state.name}</h2>
                        </div>
                        <br></br>
                        <br></br>
                        <h4>No Registrations.</h4>
                    </div>
                </MDBCol>
            </MDBContainer>
        }
        else {
            const currentItems = this.props.location.state.student.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            list = <MDBContainer>
                <MDBCol style={{ textAlign: "center" }}>
                    <div className="card-body">
                        <div >
                            <Link to={{
                                pathname: './CViewEvent',
                            }}>
                                <button className="btn btn-danger">X</button>
                            </Link>
                        </div>
                        <div className="card-title" >
                            <h2>{this.props.location.state.name}</h2>
                        </div>
                        <br></br>
                        {currentItems.map(x => {
                            return (
                                <MDBCol>
                                    <div>
                                        <div className="card-subtitle mb-2 text-muted">
                                            <div style={{ textAlign: "center" }}>
                                                <img style={{ width: "15%", height: "15%" }} className="img-circle" src={x.profilePicUrl} alt=""></img>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={{
                                                pathname: '../ViewStudent/StudentDetailsHome',
                                                state: {
                                                    studentId: x._id,
                                                    name: x.name,
                                                    email: x.email,
                                                    schoolName: x.schoolName,
                                                    gradDate: x.gradDate,
                                                    major: x.major,
                                                    profilePicUrl: x.profilePicUrl,
                                                    careerObjective: x.careerObjective,
                                                    skills: x.skills,
                                                    education: x.education,
                                                    experience: x.experience,
                                                    resumeUrl: x.resumeUrl
                                                }
                                            }}>
                                                <h4 className="card-subtitle mb-2 text-muted">Name : {x.name}</h4></Link>
                                        </div>
                                    </div>
                                    <br></br> <br></br>
                                </MDBCol>
                            )
                        })}
                    </div>
                </MDBCol>
            </MDBContainer>
        }

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.props.location.state.student.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }


        renderPageNumbers = (
            <nav aria-label="Page navigation example" class="pagebar">
                <ul class="pagination">
                    {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                </ul>
            </nav>
        );

        return (

            <div>
                <CompanyEventBar />
                {list}
                {renderPageNumbers}
            </div>
        )
    }
}
export default StudentListEvent;