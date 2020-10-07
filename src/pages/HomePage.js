import React from 'react'
import { Button } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';


class HomePage extends React.Component {
    constructor() {
        super();
        this.userInfo = []
        this.state={
            password: '',
            email: '',
            displayName: '',
            post: '',
            allUsers: [],
            allPosts: []
        }
    }

    signUp = () => {
        AuthManager.signUp(this.state.email, this.state.password, this.state.displayName)
    }

    login = () => {
        if (this.state.email == '' || this.state.password == '') {
            return alert('One of the fields is empty');
        } else {
            AuthManager.loginFlow(this.state.email, this.state.password)
        }   
     }

     makePost = () => {
        PostsManager.writePost(this.state.post, "Funding", this.userInfo.uid)
     }




    componentDidMount() {

        db.auth().onAuthStateChanged(async(user) => {
            if (user) {
                this.userInfo = user;
            }    
        })
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

                <br></br>


                username 
                <input onChange={(text) => this.setState({ email : text.target.value })} placeholder="enter your username" />

                password
                <input onChange={(text) => this.setState({ password : text.target.value })} placeholder="enter your password" />

                <Button onClick={this.login}> Login </Button>

                <br></br>
                <br></br>
                <br></br>

                <input onChange={(text) => this.setState({ post: text.target.value })} placeholder="write a post" />

                <Button onClick={this.makePost}> Make post </Button>

                <Posts posts={this.state.allPosts} />

            </div>
        )
    }
}

export default HomePage;