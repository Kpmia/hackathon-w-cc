const { default: db } = require("../firebase")


const AuthManager = {

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
    }
}

export default AuthManager;