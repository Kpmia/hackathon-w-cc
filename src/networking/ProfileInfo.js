
const { default: db } = require("../firebase")

const ProfileInfo = {


    getAllUsers: async() => {
        return db.firestore().collection('users').onSnapshot
    },

    getSpecificUserInfo: async(uid) => {
        return await db.firestore().collection('users').doc(uid).get();
    }

}

export default ProfileInfo;