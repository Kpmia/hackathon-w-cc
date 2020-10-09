import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, CardBody, Col, Row } from 'reactstrap';
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
import FadeIn from 'react-fade-in';



const channelList = ["Funding", "Mentors", "Off-Topic", "General"]

class HomePage extends React.Component {
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
            isLoading: true,
            getAllUsers: [],
        }
    }




     makePost = () => {
        PostsManager.writePost(this.state.post, this.state.channels, this.userInfo, this.state.extraInfo)
     }

     findConversation = () => {
         db.firestore().collection('conversations').doc(this.userInfo.uid + this.state.targ).get()
     }

     switchChannels = (channel) => {
         this.setState({ channel : channel })
         this.setState({ channels : channel })
     }

     messageUser = () => {
        db.firestore().collection('conversations').doc(this.userInfo.uid + this.state.directMessage).collection('chatone').add({
            message: this.state.personalMessage,
            uid: this.userInfo.uid,
            displayName: this.userInfo.displayName,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
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



        const users = []
        db.firestore().collection('users').get().then(snap => {
            const data = snap.docs.map(doc => doc.data())
            if (data) {
                this.setState({ allUsers : data })
                new Promise((resolve) =>
                        setTimeout(
                            () => { resolve('result') },
                    2000)).then(event => {
                        this.setState({ isLoading : false })
                    })
            }
        });
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
                    <p style={{textAlign: 'center', color: 'rgba(90, 94, 98, 0.67)', fontSize: 15, marginBottom: 30, letterSpacing: ' 0.11em'}}> MENU </p>
                    <div style={{paddingLeft: 30}}>
                    <p style={{fontSize: 15, cursor: 'pointer', marginBottom: 20, color: 'rgba(90, 94, 98, 0.67)', }}> General Channels </p>
                    <p onClick={() => window.location.href = '/saved'} style={{fontSize: 15, cursor: 'pointer', marginBottom: 24, color: 'rgba(90, 94, 98, 0.67)', }}> Client CRM</p>
                    </div>



                    <img style={{position: 'absolute', bottom: 0, left: 0}} src={require('../assets/blob.svg')} />
                </div>

                <div style={{
                    background: '#344BBF',
                    position: 'absolute',
                    width: 180,
                    top: 20,
                    overflowY: 'scroll',
                    padding: 30,
                    marginLeft: 270,
                    height: '96%',
                    bottom: 60,
                    borderRadius: 10,
                }}>

                    <br></br>
                    <br></br>
                    <br></br>


                     <p style={{color: 'white', textAlign: 'center', fontWeight: 600, letterSpacing: '0.11em', marginBottom: 44 }}> CHATS </p>


                {
                    channelList.map(channel => {
                        return (
                            <div>
                                <p style={{cursor: 'pointer', marginBottom: 24, color: 'white', lineHeight: '20px', fontSize: 16}} onClick={() => this.switchChannels(channel)}> {channel} </p>
                            </div>
                        )
                    })
                }

                <br></br>
                <br></br>



             <p style={{color: 'white', textAlign: 'center', fontWeight: 600, marginBottom: 44 , letterSpacing: '0.11em' }}> DIRECTS </p>
              {
                 this.state.allUsers.map(user => {

                     return (
                        <Col style={{marginLeft: 5}} >
                        <Tooltip title={user.displayName}>
                        <Avatar style={{width: 50, height: 50, marginLeft: 5, marginBottom: 5}} src={user.photo} />
                        </Tooltip>
                        </Col>
                     )
                 })
             }




                    {/* <p style={{fontWeight: 'bold', fontSize: 22}}> GENERAL CHATS </p> */}
                </div>

                <div
                style={{
                    marginLeft: 470,
                    padding: 0,
                    top: -10,
                    marginTop: 20,
                    height: 750,
                    overflowY: 'auto',
                    background: 'rgba(255, 255, 255, 0.58)',
                    borderRadius: 26,
                    width: 650,

                }}>
                    <div style={{height: 60, position: 'sticky', top: 0, padding: 30, left: 0, width: '100%', background: ' #F9FAFB'}}>
                    <p style={{fontWeight: 'bold', fontSize: 22, }}> {this.state.channel} </p>
                    </div>

                <div style={{padding: 40}}>

                <FadeIn delay="400">
                <Posts channel={this.state.channel} switchChannel={this.switchChannels} posts={this.state.allPosts} />
                </FadeIn>
                </div>


                <div style={{
                    position: 'sticky',
                    bottom: 20,
                    zIndex: 999,
                    width: '100%',
                    justifyContent: 'center',
                    height: 100,
                    padding: 10
                }}>

                <Card style={{boxShadow: '19px 31px 31px rgba(0, 0, 0, 0.11)', outline: 'none', border: 'none', borderRadius: 10}}>
                    <CardBody>
                        <Input style={{width: '500px'}}  onChange={(text) => this.setState({ post: text.target.value })} placeholder="Share your feelings..." />
                        <Tooltip placeholder="ok" placement="top" TransitionComponent={Zoom}>
                        <img onClick={this.makePost} style={{marginTop: -10, cursor: 'pointer'}} className="float-right" src={require('../assets/makepost.svg')} />
                        </Tooltip>
                    </CardBody>
                </Card>
                </div>


                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.94)',
                    position: 'absolute',
                    boxShadow: '34px 53px 77px rgba(176, 183, 192, 0.4)',
                    borderRadius: 28,
                    padding: 0,
                    top: 80,
                    right: 40,
                    width: 305,
                    height: '75%',
                }}>
                    <div style={{
                        padding: 30}}>

                 
                    </div>

                    <div style={{
                    position: 'sticky',
                    bottom: 30,
                    zIndex: 999,
                    width: '100%',
                    marginTop: -60,
                    justifyContent: 'center',
                    height: 100,
                    padding: 5
                }}>

                <br></br>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>


                <Card style={{boxShadow: '19px 31px 31px rgba(0, 0, 0, 0.11)', outline: 'none', border: 'none', borderRadius: 10}}>
                    <CardBody>
                        <Input style={{width: '160px'}}  placeholder="Share your feelings..." />
                        <Tooltip title="Send a Post" >
                        <img  style={{marginTop: 0, cursor: 'pointer'}} className="float-right" src={require('../assets/senddirect.svg')} />
                        </Tooltip>
                    </CardBody>
                </Card>
                </div>





                </div>



            <div style={{paddingLeft: 500}} className="container-fluid">
                <br></br>

                {/* <Directs allUsers={this.state.allUsers} userInfo={this.userInfo} /> */}


                <br></br>
                <br></br>
                <br></br>





            </div>

            </div>
        )
    }
}

export default HomePage;
