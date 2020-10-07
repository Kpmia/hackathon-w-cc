import firebase from 'firebase'


const { default: db } = require("../firebase")
const { default: ProfileInfo } = require("./ProfileInfo")


const PostsManager = {



    getAllPosts: async() => {
    },

    updatePost: async(pid, message, uid) => {

    },

    writePost: async(message, channel, uid) => {
        db.firestore().collection('posts').add({
            message: message,
            channel: channel,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())

        })
    }
}

export default PostsManager;