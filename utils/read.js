import firebase from 'firebase/app'
import 'firebase/firestore'

const ReadToCloudFirestore = () => {

    const readData = () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc("my_item") // leave as .doc() for a random unique doc name to be assigned
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