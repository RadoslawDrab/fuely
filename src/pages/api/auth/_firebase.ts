import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyAtg8qAfoguxzSkHXIEzg4kTF-g7w4y4G4',
	authDomain: 'fuely-app.firebaseapp.com',
	databaseURL: 'https://fuely-app-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'fuely-app',
	storageBucket: 'fuely-app.appspot.com',
	messagingSenderId: '202397902963',
	appId: '1:202397902963:web:48fef5398d485c1130e206',
	measurementId: 'G-CWXDPY7FZZ'
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export default ref(database)
