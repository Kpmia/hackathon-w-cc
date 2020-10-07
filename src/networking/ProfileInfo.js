
const { default: db } = require("../firebase")

const ProfileInfo = {


    getAllUsers: async() => {
        return (await db.firestore().collection('users').get()).docs
    },

    getSpecificUserInfo: async(uid) => {
        return await db.firestore().collection('users').doc(uid).get();
    }

}

export default ProfileInfo;