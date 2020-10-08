import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, CardBody, Input, Row, Col } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';
import firebase from 'firebase'
import { Card, Switch } from '@material-ui/core';


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
            role: '' ,
            login: true
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
            <div className="authBody" style={{background: 'linear-gradient(181.17deg, #8E9DE8 -156.12%, #FFFFFF 74.97%)'}}>  
            <br></br>          
    
            <div className="signInBody">
    
                <br></br>

               
                <Card style={{height: 500, width: 400,  borderRadius: 15, border: 'none', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 16px 0px'}}>
                    <CardBody style={{padding: 50}}>

                    <Row style={{justifyContent: 'center'}}>
                        <img width={40} src={require('../assets/login.svg')} />
                     </Row>


                     {
                         this.state.login? 

                         <div>
                             <br></br>
                             <br></br>
                             <br></br>

                               Email
                            <Input style={{marginBottom: 7}} onChange={(text) => this.setState({ email : text.target.value })} placeholder="" />

                        Password
                        <Input type="password" onChange={(text) => this.setState({ password : text.target.value })} placeholder="" />

                <br></br>
                <br></br>
                <Row style={{justifyContent: 'center'}}>
                <Button className="btn-block" style={{ fontSize: 14, width: 200, fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}} onClick={this.login}> Login </Button>
                </Row>

                         </div>
                     


                         :

                         <div>
                


                Email
                <Input style={{marginBottom: 7}} onChange={(text) => this.setState({ email : text.target.value })} placeholder="" />

                Password
                <Input style={{marginBottom: 7}} type="password" onChange={(text) => this.setState({ password : text.target.value })} placeholder="" />

                Full Name
                <Input onChange={(text) => this.setState({ displayName: text.target.value })} placeholder="" />

                <Row>
                    <Col>

                
                <UncontrolledButtonDropdown style={{marginTop: 10, background: 'none', outline: 'none'}}>
                    <DropdownToggle> {this.state.role? this.state.role : "Choose a role" }</DropdownToggle>
                    <DropdownMenu onClick={(value) => this.setState({ role : value.target.value })}>
                        <DropdownItem value="investor"> investor </DropdownItem>
                        <DropdownItem value="owner"> owner </DropdownItem>
                        <DropdownItem value="mentor"> mentor </DropdownItem>

                    </DropdownMenu>
                </UncontrolledButtonDropdown>

                </Col>
                <Col>
                Company Name
                <Input style={{marginTop: 7}} onChange={(text) => this.setState({ company : text.target.value })} placeholder="" />
                </Col>

                </Row>

                <Row>
                    <Col>
                Linkedin Link
                <Input style={{marginBottom: 7}} onChange={(text) => this.setState({ linkedin : text.target.value })} placeholder="" />
                </Col>
                <Col>
                Website
                <Input style={{marginBottom: 7}} onChange={(text) => this.setState({ website : text.target.value })} placeholder="enter your site" />
                </Col>
                </Row>
                <br></br>
                <Row style={{justifyContent: 'center'}}>
                <Button className="btn-block" style={{ fontSize: 14, width: 200, fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}} onClick={this.signUp}> Sign Up </Button>
                </Row>
                     </div> }

                <br></br>
                <Row style={{justifyContent: 'center'}}>
                <Switch onChange={() => this.setState({ login : !this.state.login })}  color="primary" />
                </Row>


                {/* username 
                <input onChange={(text) => this.setState({ email : text.target.value })} placeholder="enter your username" />

                password
                <input onChange={(text) => this.setState({ password : text.target.value })} placeholder="enter your password" />

                <Button onClick={this.login}> Login </Button> */}

                <br></br>
                <br></br>
                <br></br>
                
                </CardBody>

            </Card>


                </div>

             

            </div>
        )
    }
}

export default SignIn;