import firebase from 'firebase/app'
import 'firebase/firestore'
import { useUser } from '../../utils/firebase/useUser'
const ReadToCloudFirestore = () => {

    let {user} = useUser(); 
    const readData = () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc(user.id) // leave as .doc() for a random unique doc name to be assigned
                .onSnapshot(function (doc) {
                    console.log(doc.data());
                })
            alert("Data was successfully read")
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <button onClick={readData} style={{ width: '100%' }}>Read Data from Cloud Firestore</button>
    )
}

export default ReadToCloudFirestore