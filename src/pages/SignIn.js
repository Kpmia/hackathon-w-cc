import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';
import firebase from 'firebase'


class SignIn extends React.Component {
    constructor() {
        super();
        this.userInfo = []
        this.allUsers= []
        this.state={
            password: '',
            email: '',
            displayName: '',
            website: '',
            linkedin: '',
            company: '',
            role: '' 
        }
    }

    signUp = () => {
        AuthManager.signUp(this.state.email, this.state.password, this.state.displayName, this.state.role, this.state.company, this.state.website, this.state.linkedin)
    }

    login = () => {
        if (this.state.email == '' || this.state.password == '') {
            return alert('One of the fields is empty');
        } else {
            AuthManager.loginFlow(this.state.email, this.state.password)
        }   
     }


     
    render() {

        return (
            <div className="container-fluid">
                <br></br>

               
                username 
                <input onChange={(text) => this.setState({ email : text.target.value })} placeholder="enter your username" />

                password
                <input onChange={(text) => this.setState({ password : text.target.value })} placeholder="enter your password" />


                displayName
                <input onChange={(text) => this.setState({ displayName: text.target.value })} placeholder="enter your dsiplayName" />

                Role
                <input onChange={(text) => this.setState({ role : text.target.value })} placeholder="enter your role" />

                Linkedin
                <input onChange={(text) => this.setState({ linkedin : text.target.value })} placeholder="enter your Linkedin" />

                Website
                <input onChange={(text) => this.setState({ website : text.target.value })} placeholder="enter your site" />

                Company
                <input onChange={(text) => this.setState({ company : text.target.value })} placeholder="enter your company" />

                <Button onClick={this.signUp}> Sign Up </Button>

                <br></br>


                username 
                <input onChange={(text) => this.setState({ email : text.target.value })} placeholder="enter your username" />

                password
                <input onChange={(text) => this.setState({ password : text.target.value })} placeholder="enter your password" />

                <Button onClick={this.login}> Login </Button>

                <br></br>
                <br></br>
                <br></br>


            </div>
        )
    }
}

export default SignIn;