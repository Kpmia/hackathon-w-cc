import React from 'react'
import { Button, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem } from 'reactstrap';
import Posts from '../components/Posts';
import db from '../firebase';
import AuthManager from '../networking/AuthManager';
import PostsManager from '../networking/PostsManager';
import ProfileInfo from '../networking/ProfileInfo';
import firebase from 'firebase'
import InterestForm from '../components/InterestForm';
import LoadingScreen from '../components/LoadingScreen';


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
            <div className="container-fluid">
                intrestss

                <InterestForm user={this.state.userInfo} />

            </div>
        )
    }
}

export default Interests;