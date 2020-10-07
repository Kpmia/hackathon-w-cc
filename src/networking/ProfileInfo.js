
const { default: db } = require("../firebase")

const PostsManager = {

    writePost: async(message, uid) => {

        db.firestore().collection('posts').add({
            message: message,
            uid

        })
        
    }
}