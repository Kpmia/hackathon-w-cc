import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';
import firebase from 'firebase'
import Directs from '../components/Directs';
import LoadingScreen from '../components/LoadingScreen';


class HomePage extends React.Component {
    constructor() {
        super();
        this.userInfo = []
        this.allUsers= []
        this.state={
            displayName: '',
            post: '',
            allUsers: [],
            channels: '',
            personalMessage: '',
            directMessage: '',
            allMessages: '', 
            isLoading: true
        }
    }

 


     makePost = () => {
        PostsManager.writePost(this.state.post, this.state.channels, this.userInfo)
     }

     findConversation = () => {
         db.firestore().collection('conversations').doc(this.userInfo.uid + this.state.targ).get()
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
            <div style={{background: 'linear-gradient(112.68deg, #F5F6F9 18.37%, #EFF0F4 50.92%, #E5E7ED 98.49%)'}}>
sfsdf
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
                    marginLeft: 270,
                    height: '100%',
                    bottom: 60,
                    borderRadius: 10,
                }}>
                      <UncontrolledButtonDropdown>
                    <DropdownToggle> { this.state.channels ? this.state.channels : "Channel: Channels"}  </DropdownToggle>
                    <DropdownMenu onClick={(val) => this.setState({ channels : val.target.value })}>
                        <DropdownItem value="Funding"> Funding </DropdownItem>
                        <DropdownItem value="Mentors"> Mentors </DropdownItem>
                        <DropdownItem value="Events"> Events </DropdownItem>
                        <DropdownItem value="Off-Topic"> Off-Topic </DropdownItem>
                        <DropdownItem value="General"> General </DropdownItem>
                    </DropdownMenu>


                </UncontrolledButtonDropdown>



                    {/* <p style={{fontWeight: 'bold', fontSize: 22}}> GENERAL CHATS </p> */}
                </div>

                <div 
                style={{
                    marginLeft: 470,
                    padding: 20,
                    top: 20,
                    marginTop: 20,
                    height: 600,
                    overflowY: 'auto',
                    background: 'rgba(255, 255, 255, 0.58)',
                    borderRadius: 26, 
                    width: 550,
                    
                }}>
                    <br></br>
                    <p style={{fontWeight: 'bold', fontSize: 22}}> General </p>
                <Posts posts={this.state.allPosts} />

                <input onChange={(text) => this.setState({ post: text.target.value })} placeholder="write a post" />

                <Button onClick={this.makePost}> Make post </Button>


                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.94)',
                    position: 'absolute',
                    boxShadow: '34px 53px 77px rgba(176, 183, 192, 0.4)',
                    borderRadius: 28,
                    top: 100,
                    right: 40,
                    width: 285,
                    height: '80%',
                }}>

                    <p> GENERAL CHATS </p>
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