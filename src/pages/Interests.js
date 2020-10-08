import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, CardBody } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';
import firebase from 'firebase'
import InterestForm from '../components/InterestForm';
import LoadingScreen from '../components/LoadingScreen';
import { Card } from '@material-ui/core';


class Interests extends React.Component {
    constructor() {
        super();
        this.allUsers= []
        this.state={
            userInfo: [],
            isLoading: true
         
        }
    }

    componentDidMount() {

        db.auth().onAuthStateChanged(user => {
            if (user) {
                this.userInfo = user;
                console.log(user)
                db.firestore().collection('users').doc(user.uid).get().then(res => {
                    console.log(res)
                    this.setState({ userInfo : res.data() })
                    new Promise((resolve) =>
                            setTimeout(
                                () => { resolve('result') },
                        2000)).then(event => {
                            this.setState({ isLoading : false })
                        })
                })
            }
        })
    }
    render() {

       if (this.state.isLoading) {
           return <LoadingScreen />
       }

        return (
            <div className="authBody" style={{background: 'linear-gradient(181.17deg, #8E9DE8 -156.12%, #FFFFFF 74.97%)'}}>  
            <br></br>          
    
            <div className="signInBody">
    
                <br></br>
                <Card style={{height: 550, overflowY: 'scroll', width: 400,  borderRadius: 15, border: 'none', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 16px 0px'}}>
                    <CardBody>

                <InterestForm user={this.state.userInfo} />

                </CardBody>
                </Card>
                </div>

            </div>
        )
    }
}

export default Interests;