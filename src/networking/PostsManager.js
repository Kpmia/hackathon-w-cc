const { default: db } = require("../firebase")
const { default: ProfileInfo } = require("./ProfileInfo")


const PostsManager = {


    getAllPosts: async() => {
        return await db.firestore().collection('posts').get()
    },

    updatePost: async(pid, message, uid) => {

    },

    writePost: async(message, channel, uid) => {

        db.firestore().collection('posts').add({
            message: message,
            channel: channel,
        })
    }
}

export default PostsManager;