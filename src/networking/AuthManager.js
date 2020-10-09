const { default: db } = require("../firebase")


const AuthManager = {

    loginFlow: async(email, password) => {
        try {
            await db.auth().signInWithEmailAndPassword(email, password).then(event => {
                if (event) {
                    window.location.href = '/'
                }
            })
        } catch (err) {
            return alert(err)
        }
    },

    signUp: async(email, password, displayName, role, companyName, website, linkedin) => {
        try {
            await db.auth().createUserWithEmailAndPassword(email, password).then(result => {
                db.firestore().collection('users').doc(result.user.uid).set({
                    email: email,
                    companyName: companyName,
                    website: website,
                    linkedin: linkedin,
                    photo: result.user.photoURL,
                    uid: result.user.uid,
                    displayName: displayName,
                    role: role
                })
                result.user.updateProfile({
                    displayName: displayName
                }).then(event => {
                    window.location.href = '/interests'
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