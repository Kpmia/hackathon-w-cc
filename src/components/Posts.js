import React, {useEffect, useState} from 'react';
import db from '../firebase';
import PostsManager from '../networking/PostsManager';


const Posts = ({...props}) =>  {
    const [posts, updatePost] = useState([])

    useEffect(async() => {

        const unsubscribe = db.firestore().collection('posts').orderBy("timestamp","desc").onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            if (data) {
                updatePost(data)
            }
          });
   
          return () => unsubscribe()
        
    }, [])



    console.log(posts)

    return (
        <div>
            Posts
            {
                posts.length != 0 ?
                    posts.map(post => {
                
                        return (
                            <div>
                            <p> {post.message} </p>
                            </div>
                        )
                    })
                : null
            }
        </div>
    )
}

export default Posts;