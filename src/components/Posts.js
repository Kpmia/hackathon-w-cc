import React, {useEffect, useState} from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledAlert, UncontrolledButtonDropdown } from 'reactstrap';
import db from '../firebase';
import PostsManager from '../networking/PostsManager';


const Posts = ({...props}) =>  {
    const [posts, updatePost] = useState([])
    const [channel, chooseChannel] = useState('Funding')


    useEffect(async() => {
        const unsubscribe = db.firestore().collection('posts').orderBy("timestamp","desc").onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            if (data) {
                updatePost(data)
            }
          });
          return () => unsubscribe()
    }, [])

    function toDateTime(secs) {
        var t = new Date(1970, 0, 1); 
        t.setSeconds(secs);
        return t;
    }

    return (
        <div>
           <UncontrolledButtonDropdown>
               <DropdownToggle> { channel ? channel : "Choose Channels" }</DropdownToggle>
               <DropdownMenu onClick={(chat) => chooseChannel(chat.target.value)}>
               <DropdownItem value="Funding"> Funding </DropdownItem>
                        <DropdownItem value="Mentors"> Mentors </DropdownItem>
                        <DropdownItem value="Events"> Events </DropdownItem>
                        <DropdownItem value="Off-Topic"> Off-Topic </DropdownItem>
                        <DropdownItem value="General"> General </DropdownItem>
               </DropdownMenu>
           </UncontrolledButtonDropdown>
            {
                posts.length != 0 ?
                    posts.map(post => {
                        if(post.channel == channel) {
                            return (
                                <div onClick={() => console.log(post)}>
                                <p>  <p> Username: {post.displayName} </p>
                                    <p> Timestamp {toDateTime(post.timestamp.seconds).getUTCHours() +  ":" + toDateTime(post.timestamp.seconds).getUTCMinutes()} </p>
                                    <p> Message: {post.message} </p>
                                </p>
                                </div>
                            )
                        }
                        })
                : null
            }
        </div>
    )
}

export default Posts;