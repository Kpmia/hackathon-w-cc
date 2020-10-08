import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, CardBody } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';
import firebase from 'firebase'
import Directs from '../components/Directs';
import LoadingScreen from '../components/LoadingScreen';
import { Avatar, Input, Tooltip, Zoom } from '@material-ui/core';
import { Card } from '@material-ui/core';



const channelList = ["Funding", "Mentors", "Off-Topic", "General"]

class Saved extends React.Component {
    constructor() {
        super();
        this.userInfo = []
        this.allUsers= []
        this.state={
            displayName: '',
            post: '',
            allUsers: [],
            extraInfo: [],
            channels: 'Funding',
            channel: 'Funding',
            personalMessage: '',
            directMessage: '',
            allMessages: '', 
            isLoading: true
        }
    }

 


    componentDidMount() {

        db.auth().onAuthStateChanged(async(user) => {
            if (user) {
                this.userInfo = user;
                db.firestore().collection('users').doc(user.uid).get().then(snap => {
                    this.setState({ extraInfo : snap.data() })
                })
            }
        })
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingScreen />
        }
      

        return (
            <div style={{background: 'linear-gradient(112.68deg, #F5F6F9 18.37%, #EFF0F4 50.92%, #E5E7ED 98.49%)', overflowY: 'hidden'}}>


                <Avatar style={{position: 'absolute', top: 20, right: 60}} src={this.userInfo.photoURL} />
                <div 
                style={{
                    background: 'white',
                    width: 260,
                    height: '100%',
                    top: 0,
                    position: 'fixed',
                    padding: 20,
                    borderRadius: 27,
                    boxShadow: '11px 4px 56px rgba(0, 0, 0, 0.05)'
                }}>
                    <img src={require('../assets/logo.svg')} />

                    <br></br>
                    <p> MENU </p>
                    <p> MENU </p>
                    <p> MENU </p>
                    <p> MENU </p>

                   

                    <img style={{position: 'absolute', bottom: 0, left: 0}} src={require('../assets/blob.svg')} />
                </div>

                <div style={{
                    background: '#344BBF',
                    position: 'absolute',
                    width: 180,
                    top: 20,
                    padding: 30,
                    marginLeft: 270,
                    height: '96%',
                    bottom: 60,
                    borderRadius: 10,
                }}>

                   
            
              
                


            </div>
            </div>
        )
    }
}

export default Saved;