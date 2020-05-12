import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import AllStudent from './AllStudent'
import { graphql, compose } from 'react-apollo';
import { QueryAllStudents } from '../../queries/queries';
import { Redirect } from 'react-router';


//Define a Login Component
class ViewStudents extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            getStudents: [],
            // skillsData: [],
            filteredStudents: [],
            filteredSearch: 0,
            currentPage: 1,
            itemsPerPage: 2,
            flag: false
        }
        //Bind the handlers to this class
        // this.changeMajorStatus = this.changeMajorStatus.bind(this)
        this.studentSearch = this.studentSearch.bind(this)
        // this.companySearch = this.companySearch.bind(this)

    }

    // componentDidMount = async (e) => {
    //     // e.preventDefault();
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     await this.props.allStudents(null, res => {
    //         console.log(res)
    //         this.setState({
    //             getStudents: res.data
    //         })
    //     })
    //     // this.componentWillReceiveProps()
    // }

    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }

    // companySearch = (e) => {
    //     let filteredSearchStudents = this.state.getStudents;
    //     console.log("Filtered Search Students", filteredSearchStudents)
    //     if (e.target.value) {
    //         this.setState({
    //             filteredSearch: 1,
    //             filteredStudents: filteredSearchStudents.filter((s) => {
    //                 console.log("Skill", s.skills)
    //                 let skillsArray = ""
    //                 for (let i = 0; i < s.skills.length; i++) {
    //                     let oneSkill = s.skills[i].skillName
    //                     console.log(s.skills[i].skillName)
    //                     if (i == s.skills.length - 1) {
    //                         skillsArray = skillsArray.concat(oneSkill)
    //                         console.log("For", skillsArray)
    //                     }
    //                     else {
    //                         skillsArray = skillsArray.concat(oneSkill + ",")
    //                         console.log("For", skillsArray)
    //                     }
    //                 }
    //                 return (
    //                     s.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
    //                     s.schoolName.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
    //                     skillsArray.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
    //             }
    //             )
    //         })
    //     }
    //     else {
    //         this.setState({
    //             filteredSearch: 0
    //         })
    //     }
    // }

    studentSearch = (e) => {
        let filteredSearchStudents = this.state.getStudents;
        console.log("Filtered Search Students", filteredSearchStudents)
        if (e.target.value) {
            this.setState({
                filteredSearch: 1,
                filteredStudents: filteredSearchStudents.filter((s) => {
                    return (
                        s.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
                        s.schoolName.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
        else {
            this.setState({
                filteredStudents: this.state.getStudents
            })
        }
    }



    render() {
        let gtStudents = null

        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        let renderPageNumbers = null;
        const pageNumbers = [];

        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.props.data.AllStudents && this.state.flag === false) {
            let result = this.props.data.AllStudents
            console.log("result", result)
            this.setState({
                filteredStudents: result.StudentObj,
                getStudents: result.StudentObj,
                flag: true
            })
        }
        if (this.state.filteredStudents.length === 0) {
            gtStudents = "No Students Registered"
        }
        else {
            const currentItems = this.state.filteredStudents.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            gtStudents = <div>
                <form style={{ textAlign: "center" }}>
                    {currentItems.map(x => <AllStudent key={x._id} item={x}></AllStudent>)}
                </form>
            </div>


            for (let i = 1; i <= Math.ceil(this.state.filteredStudents.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }


            renderPageNumbers = (
                <nav aria-label="Page navigation example" class="pagebar">
                    <ul class="pagination">
                        {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                    </ul>
                </nav>
            );


        }
        return (
            <div>
                {redirectVar}
                <MDBContainer>
                    <MDBRow>
                        <MDBCol style={{ textAlign: "center" }}>
                            <MDBRow>
                                <i className="glyphicon glyphicon-search"></i>
                                <input id="searchStudent" className="form-control" type="text" onChange={this.studentSearch} placeholder="Search with Name, College" />
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <br></br><br></br>
                    <MDBRow style={{ textAlign: "center" }}>
                        <MDBCol>
                            {gtStudents}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            {renderPageNumbers}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}


//export Login Component
export default graphql(QueryAllStudents)(ViewStudents);