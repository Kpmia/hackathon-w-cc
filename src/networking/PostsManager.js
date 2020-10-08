import firebase from 'firebase'


const { default: db } = require("../firebase")
const { default: ProfileInfo } = require("./ProfileInfo")


const PostsManager = {



    getAllPosts: async() => {
    },

    updatePost: async(pid, message, uid) => {

    },

    startDirectMessage: async(uid, displayName, directUid, message) => {
        db.firestore().collection('conversations').add(uid + directUid).add({
            message: message,
            displayName: displayName,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
    },

    writePost: async(message, channel, userInfo) => {
        db.firestore().collection('posts').add({
            message: message,
            channel: channel,
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
    }
}

export default PostsManager;