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

    writePost: async(message, channel, userInfo, extraInfo) => {
        console.log(extraInfo.companyName)
        db.firestore().collection('posts').add({
            message: message,
            channel: channel,
            uid: userInfo.uid,
            company: extraInfo.companyName ? extraInfo.companyName :  "",
            role: extraInfo.role ? extraInfo.role :  "",
            displayName: userInfo.displayName,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
    }
}

export default PostsManager;