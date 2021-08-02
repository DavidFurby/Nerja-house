import firebase from 'firebase/app'
import 'firebase/firestore'
import { UseUser } from '../../utils/firebase/useUser'
const ReadToCloudFirestore = () => {

    let {user} = UseUser(); 
    const readData = () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc(user.id) // leave as .doc() for a random unique doc name to be assigned
                .onSnapshot(function (doc) {
                    (doc.data());
                })
            alert("Data was successfully read")
        } catch (error) {
            (error);
            alert(error);
        }
    }

    return (
        <button onClick={readData} style={{ width: '100%' }}>Read Data from Cloud Firestore</button>
    )
}

export default ReadToCloudFirestore