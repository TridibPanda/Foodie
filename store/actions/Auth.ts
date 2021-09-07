import Firebase, { db } from '../../config/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET = 'GET';
export const VIEW = 'VIEW';
export const LOCAL = 'LOCAL';

//signup
export const signup = (name: string, email: string, password: string, phone: string | any) => {
    return (dispatch: Object | any) => {
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result: any) => {
                console.log(result);
                db.collection('Users')
                    .doc(`${result.user.uid}`)
                    .set({
                        name: name,
                        email: email,
                        phone: phone,
                        uid: result.user.uid,
                    })
                    .then(() => {
                        console.log('Document saved');
                        AsyncStorage.setItem('uid', result.user.uid);
                        dispatch({ type: SIGNUP, uid: result.user.uid })
                    })
                    .catch((error) => {
                        console.error('Error adding document: ', error);
                    });
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    }
};

//login
export const login = (email: string, password: string) => {
    return (dispatch: Object | any) => {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((result: any) => {
                AsyncStorage.setItem('uid', result.user.uid);
                dispatch({ type: LOGIN, uid: result.user.uid })
            })
            .catch((error) => alert(error));
    }
};

//logout
export const logout = () => {
    return (dispatch: Object | any) => {
        Firebase.auth()
            .signOut()
            .then(async () => {
                await AsyncStorage.removeItem('uid');
                await AsyncStorage.removeItem("Bookmarks");
                await AsyncStorage.removeItem("Recent");
                dispatch({ type: LOGOUT, uid: '' })
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

//local storage
export const local = () => {
    return async (dispatch: Object | any) => {
        const userId = await AsyncStorage.getItem('uid');
        dispatch({ type: LOCAL, uid: userId })
    }
};

// get your profile
export const get = () => {
    return async (dispatch: Object | any) => {
        const userId = await AsyncStorage.getItem('uid');
        db.collection('Users')
            .doc(`${userId}`)
            .get().then((doc) => {
                dispatch({ type: GET, details: doc.data() })
            }).catch((error) => {
                console.log(error);
            })
    }
};

// view other profile
export const view = (userId: string) => {
    return async (dispatch: Object | any) => {
        db.collection('Users')
            .doc(`${userId}`)
            .get().then((doc) => {
                dispatch({ type: VIEW, details: doc.data() })
            }).catch((error) => {
                console.log(error);
            })
    }
};

//forget password
export const forget = (email: string) => {
    Firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            // Email sent.
            alert(`Link has been sent to this email address - ${email}`);
        })
        .catch(function (error) {
            // An error happened.
            alert(error);
        });
};

