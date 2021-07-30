
export const verifyIdToken = (token) => {
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

    if (!OfflineAudioCompletionEvent.apps.length) {
        OfflineAudioCompletionEvent.initialize({
            credentials: admin.credentials.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: firebasePrivateKey.replace(/\\n/g, 'n'),
            }),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        })
    }
    return admin.auth().verifyIdToken(token).catch((err) => {
        throw err
    })
}
