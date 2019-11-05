
	// https://firebase.google.com/docs/firestore/quickstart?authuser=1
	// https://www.oxxostudio.tw/articles/201905/firebase-firestore.html

class FireStore{
	static db;
	// static member = [];
	static user = null;

	static initial(key){
		let crypt = new Crypt({key: key, iv: "project-management"});
		let apiKey = crypt.decrypt("U2FsdGVkX1+xsjJxLdoG8UrHLiL5csQJXBKKf5+DS6CsL36zngVlYeYNbuUxRUZGTSxn/hdOQb8NE5VdB+DlqA==")
		let pid = "jpmanage-245d1";
		firebase.initializeApp({
			apiKey: apiKey,
			authDomain: pid + ".firebaseapp.com",
			databaseURL: "https://" + pid + ".firebaseio.com",
			projectId: pid,
			storageBucket: pid + ".appspot.com",
			messagingSenderId: "590920170766",
		});
		this.db = firebase.firestore();
	}
	static mail(){
		return firebase.auth().currentUser.email;
	}
	static async signIn(email, password){
		try {
			return await firebase.auth().signInWithEmailAndPassword(email, password);
			// console.log(result)
			// console.log(firebase.auth().currentUser)
		} catch(e) {
			throw e;
		}
	}

	static listen() { //監聽, 測試用
		let ref = this.db.collection('CODE'); // 
		ref.onSnapshot(snapshot => {
			snapshot.forEach(doc => {
				console.log(doc.id, doc.data());
			});
		});
	}

	static async insert(tblName, json){
		let date = (new Date()).getTime();
		let ref = this.db.collection(tblName).doc("" + date);
		json.MODIFY_DATE = date;
		let obj = Object.assign({}, json);
		json.PK = date;
		try {
			let x = await ref.set(obj);
		} catch(e) {
			throw e;
		}
		delete obj.PK;
	}

	static async update(tblName, json){
		let date = (new Date()).getTime();
		let ref = this.db.collection(tblName).doc("" + json.PK);
		json.MODIFY_DATE = date;
		let obj = Object.assign({}, json);
		delete obj.PK;
		try {
			let x = await ref.set(obj);
		} catch(e) {
			throw e;
		}
	}
	static async delete(tblName, PK){
		let ref = this.db.collection(tblName).doc("" + PK);
		try {
			let x = await ref.delete();
		} catch(e) {
			throw e;
		}
	}

	static async uploadFile(){ // 己測過文字
		// https://firebase.google.com/docs/storage/web/upload-files?hl=zh-cn
		let ref = firebase.storage().ref().child('images/jim.txt');

		let message = 'This is my message.';
		let task = ref.putString(message).then(function(snapshot) {
			console.log('Uploaded a raw string!');
			console.log(snapshot)
		});
		
	}

	static async downloadFileURL(){ // 測試用 URL
		// https://firebase.google.com/docs/storage/web/download-files?hl=zh-cn
		let ref = firebase.storage().ref().child('images/angel.jpg');
		// let starsRef = storageRef.child('images/stars.jpg');
		// Get the download URL
		ref.getDownloadURL().then(function(url) {
			console.log(url)
			// Insert url into an <img> tag to "download"
		}).catch(function(error) {

			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case 'storage/object-not-found':
					// File doesn't exist
					break;
				case 'storage/unauthorized':
					// User doesn't have permission to access the object
					break;
				case 'storage/canceled':
					// User canceled the upload
					break;
				case 'storage/unknown':
					// Unknown error occurred, inspect the server response
					break;
			}
		});
	}
}