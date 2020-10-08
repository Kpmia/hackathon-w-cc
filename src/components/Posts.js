import React, {useEffect, useState} from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledAlert, UncontrolledButtonDropdown } from 'reactstrap';
import db from '../firebase';
import PostsManager from '../networking/PostsManager';


const Posts = ({...props}) =>  {
    const [posts, updatePost] = useState([])


    useEffect(async() => {
        const unsubscribe = db.firestore().collection('posts').orderBy("timestamp","asc").onSnapshot(snap => {
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
          
            {
                posts.length != 0 ?
                    posts.map(post => {
                        if(post.channel == props.channel) {
                            console.log(post)
                            return (
                                <div onClick={() => console.log(post)}>
                                <p>  <p style={{color: ' #322D2D', fontSize: 15, fontWeight: '500',  marginBottom: 2}}> {post.displayName} </p>
                                    <p style={{color: '#B4B4B4',fontSize: 14, marginBottom: 2}}> {post.role} @  {post.company}  {toDateTime(post.timestamp.seconds).getUTCHours() +  ":" + toDateTime(post.timestamp.seconds).getUTCMinutes()} </p>
                                    <p style={{color: '#787474', lineHeight: '22px', fontSize: 15}}>{post.message} </p>
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