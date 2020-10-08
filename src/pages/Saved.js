import React from 'react'
import { Button, DropdownMenu, DropdownToggle, Row, Col, UncontrolledButtonDropdown, DropdownItem, CardBody } from 'reactstrap';
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
                    this.setState({ isLoading : false })
                })
            }
        })
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingScreen />
        }
      

        return (
            <div style={{background: 'linear-gradient(112.68deg, #F5F6F9 18.37%, #EFF0F4 50.92%, #E5E7ED 98.49%)', height: '100vh', overflowY: 'auto'}}>


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
                    <p onClick={() => window.location.href = '/'} style={{fontSize: 15, cursor: 'pointer', marginBottom: 20, color: 'rgba(90, 94, 98, 0.67)', }}> General Channels </p>
                    <p onClick={() => window.location.href = '/saved'} style={{fontSize: 15, cursor: 'pointer', marginBottom: 24, color: 'rgba(90, 94, 98, 0.67)', }}> Client CRM</p>

                   </div>

                    <img style={{position: 'absolute', bottom: 0, left: 0}} src={require('../assets/blob.svg')} />
                </div>

                <div style={{paddingLeft: 300, paddingTop: 80, overflowY: 'auto', paddingRight: 80}}>
                <p style={{fontWeight: 'bold', fontSize: 22, }}> Saved Clients <Button onClick={() => window.location.href = '/interests'}  style={{ fontSize: 14, marginLeft: 10,  fontWeight: 400, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}} > Make More Matches </Button>
 </p>
                {
                    this.state.extraInfo["saved"] ? 

                <Row>

                        {
                            this.state.extraInfo["saved"].map(user => {
                                return (
                                <Col sm={5} className="mb-3">
                                 <Card style={{overflowY: 'scroll', borderRadius: 15, border: 'none', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 16px 0px'}}>
                                    <CardBody>
                                    <p style={{position: 'absolute', color: '#4B4D5B'}} className="float-right">{user.prob}% Match </p>

                                    <div>
                                    <FadeIn>

                                    <Row style={{justifyContent: 'center'}}>
                                    <img src={require('../assets/matcheduser.svg')} />
                                    </Row>
                                    <p style={{color: '#4B4D5B', textAlign: 'center', fontSize: 22, fontWeight: 600, marginBottom: 8}}> {user.displayName}</p>
                                    <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 17, fontWeight: 300, marginBottom: 2}}>  {user.role} @ {user.companyName}</p>

                                    <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 14, fontWeight: 300,}}> About </p>
                                    <Row>
                                    {Object.values(user.interests).map(interest => {

                                        return (
                                            <Col>
                                            <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>{interest}</p>
                                            </Col>
                                        )
                                    })}
                                    </Row>
                                    <br></br>


                                    <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 16, fontWeight: 300, marginBottom: 0}}>
                                    Business Site: {user.website}  </p>
                                    <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 16, fontWeight: 300,}}>
                                    Linkedin: {user.linkedin} 
                                    </p>


                                    
                                     




                                    </FadeIn>
                                    </div>


                                </CardBody>
                                </Card>
                                </Col>
                                )
                            })
                        }

</Row>





                    : null
                }
                </div>

            </div>
        )
    }
}

export default Saved;