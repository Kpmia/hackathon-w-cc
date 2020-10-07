const { default: db } = require("../firebase")


const AuthManager = {

    loginFlow: async(email, password) => {
        try {
            await db.auth().signInWithEmailAndPassword(email, password)
            return window.location.href = '/';
        } catch (err) {
            return alert(err)
        }
    },

    signUp: async(email, password, displayName) => {
        try {
            await db.auth().createUserWithEmailAndPassword(email, password).then(result => {
                result.user.updateProfile({
                    displayName: displayName
                })
                db.firestore().collection('users').add({
                    email: email,
                    displayName: displayName,
                    role: 'investor'
                })
            })
        } catch (err) {
            return alert(err);
        }
    },

    updateInterests: async(userInfo, interests) => {
        try {
            await 
                db.firestore().collection('users').add({
                    email: userInfo.email,
                    displayName: userInfo.displayName,
                    interests: interests
                })
        } catch (err) {
            return alert(err);
        }
    }


}

export default AuthManager;