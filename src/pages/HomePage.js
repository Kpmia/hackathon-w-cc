import React from 'react'
import { Button } from 'reactstrap';
import AuthManager from '../networking/AuthManager';


class HomePage extends React.Component {
    constructor() {
        super();
        this.state={
            password: '',
            email: '',
            displayName: '',
        }
    }

    signUp = () => {
        AuthManager.signUp(this.state.email, this.state.password, this.state.displayName)
    }

    postUserInfo = () => {
        
    }


    componentDidMount() {


    }

    render() {

        return (
            <div className="container-fluid">
                <br></br>

                <p> Successful Project </p>

                username 
                <input onChange={(text) => this.setState({ email : text.target.value })} placeholder="enter your username" />

                password
                <input onChange={(text) => this.setState({ password : text.target.value })} placeholder="enter your password" />


                displayName
                <input onChange={(text) => this.setState({ displayName: text.target.value })} placeholder="enter your dsiplayName" />

                <Button onClick={this.signUp}> Sign Up </Button>

             
             

            </div>
        )
    }
}

export default HomePage;