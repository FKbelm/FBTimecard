import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

export const shukkin = functions.https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', "Not signed in")

    try {
        admin.initializeApp(functions.config().firebase);

        const db = admin.firestore();
        const createdAt = (data && data.createdAt) ? new Date(data.createdAt) : new Date();
        const shukkinParam = {
            uid: context.auth.uid,
            type: "shukkin",
            createdAt: createdAt
        }
        await db
            .collection("users")
            .doc(context.auth.uid)
            .collection("timecards")
            .add(shukkinParam);
        return shukkinParam;
    } catch (e) {
        throw new functions.https.HttpsError('unavailable', "エラー")
    }
});

export const taikin = functions.https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', "Not signed in")

    try {
        admin.initializeApp(functions.config().firebase);

        const db = admin.firestore();
        const createdAt = (data && data.createdAt) ? new Date(data.createdAt) : new Date();
        const taikinParam = {
            uid: context.auth.uid,
            type: "taikin",
            createdAt: createdAt
        }
        await db
            .collection("users")
            .doc(context.auth.uid)
            .collection("timecards")
            .add(taikinParam);
        return taikinParam;
    } catch (e) {
        throw new functions.https.HttpsError('unavailable', "エラー")
    }
});
