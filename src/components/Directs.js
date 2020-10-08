import React, { useState, useEffect } from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import db from '../firebase';
import firebase from 'firebase';

const Directs = ({...props}) => {
    const [posts, getAll] = useState([])
    const [message, writeMsg] = useState('')
    const [targetUser, findUser] = useState('')



    const writeMessage = () => {
        console.log('here')
        console.log(props.userInfo.uid)
        db.firestore().collection('conversations').doc(props.userInfo.uid + targetUser).collection('conversations').add({
            message: message,
            uid: props.userInfo.uid,
            displayName: props.userInfo.displayName,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
    }

    
    useEffect(async() => {
        const unsubscribe = db.firestore().collection('conversations').doc(props.userInfo.uid + targetUser).collection('conversations').orderBy("timestamp","desc").onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            if (data) {
                getAll(data)
            }
            console.log(posts)
          });
          return () => unsubscribe()
    }, [])
    function toDateTime(secs) {
        var t = new Date(1970, 0, 1); 
        t.setSeconds(secs);
        return t;
    }


    return (
        <div 
        style={{
            top: 0,
            right: 0,
            position: 'absolute',
            height: 600,
            width: 500,
            overflowY: 'auto',
            padding: 100
        }}>
        
    <UncontrolledButtonDropdown>
            <DropdownToggle> {targetUser}</DropdownToggle>
            <DropdownMenu>
                {
                    props.allUsers.map(user => {
                        return (
                        <DropdownItem  onClick={() => findUser(user.uid)} value={user.uid}> {user.displayName}  | {user.role} </DropdownItem>
                        )
                    })
                }
            </DropdownMenu>
        </UncontrolledButtonDropdown>

        <br></br>
        <br></br>

        {
                posts.length != 0 ?
                    posts.map(post => {
                        console.log(post)
                            return (
                                <div onClick={() => console.log(post)}>
                                <p>  <p> Username: {post.displayName} </p>
                                    <p> Timestamp {toDateTime(post.timestamp.seconds).getUTCHours() +  ":" + toDateTime(post.timestamp.seconds).getUTCMinutes()} </p>
                                    <p> Message: {post.message} </p>
                                </p>
                                </div>
                            )
                        
                        })
                : null
            }



        <input onChange={(text) => writeMsg(text.target.value)}  placeholder="Send a Message" />
        <br></br>
        <br></br>


            <Button onClick={writeMessage}> Send </Button>
        
        </div>
    )
}

export default Directs;