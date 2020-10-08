import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';
import firebase from 'firebase'
import Directs from '../components/Directs';


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
                }
              });
    }

 

    render() {

        return (
            <div className="container-fluid">
                <br></br>

                <Directs allUsers={this.state.allUsers} userInfo={this.userInfo} />

            
                <br></br>
                <br></br>
                <br></br>

                <input onChange={(text) => this.setState({ post: text.target.value })} placeholder="write a post" />

                <Button onClick={this.makePost}> Make post </Button>

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


                

                <Posts posts={this.state.allPosts} />

            </div>
        )
    }
}

export default HomePage;