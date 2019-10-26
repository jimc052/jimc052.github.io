
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
			// appId: "1:590920170766:web:4c11dec6ebd4dfe6d7eb5f"
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
	static query() { // 測試用
		let ref = this.db.collection('CODE');
		ref.get().then(querySnapshot => {
			querySnapshot.forEach(doc => {
				console.log(doc.id, doc.data());
			});
		});
	}
	static listen() { //監聽, 測試用
		let ref = this.db.collection('CODE'); // 
		ref.onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => {
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

	static async defaultCode(){
		let arr = [
			{CD_KIND: "部門", CD_NAME: "RD", CD_KEY: "0"},
			{CD_KIND: "部門", CD_NAME: "PM", CD_KEY: "1"},
			{CD_KIND: "部門", CD_NAME: "客服", CD_KEY: "2"},
			{CD_KIND: "職務", CD_NAME: "主管", CD_KEY: "0"},
			{CD_KIND: "職務", CD_NAME: "工程師", CD_KEY: "1"},
			{CD_KIND: "職務", CD_NAME: "助理", CD_KEY: "2"},
			{CD_KIND: "進度", CD_NAME: "評估中", CD_KEY: "00"},
			{CD_KIND: "進度", CD_NAME: "待處理", CD_KEY: "01"},
			{CD_KIND: "進度", CD_NAME: "進行中", CD_KEY: "10"},
			{CD_KIND: "進度", CD_NAME: "本週工作", CD_KEY: "20"},
			{CD_KIND: "進度", CD_NAME: "Pending", CD_KEY: "P"},
			{CD_KIND: "進度", CD_NAME: "待修正", CD_KEY: "Q"},
			{CD_KIND: "進度", CD_NAME: "待測試", CD_KEY: "W"},
			{CD_KIND: "進度", CD_NAME: "已完成", CD_KEY: "Z"},
		];

		for(let i = 0; i < arr.length; i++) {
			let d = (new Date()).getTime();
			let ref = this.db.collection('CODE').doc("" + d);
			try {
				await ref.set(Object.assign({MODIFY_DATE: d, ACTIVE: "Y"}, arr[i] ), {merge: true});
			} catch(e) {
				console.log(e)
			}
		}
	}

	static async defaultUser(){
		let arr = [
			{USR_NAME: "吳經綸", DEP: "RD", JOB: "主管", MAIL: "allen"},
			{USR_NAME: "陳進明", DEP: "RD", JOB: "工程師", MAIL: "jimc"},
			{USR_NAME: "tony", DEP: "PM", JOB: "主管", MAIL: "tony"},
			{USR_NAME: "sandy", DEP: "PM", JOB: "工程師", MAIL: "sandy"},
			{USR_NAME: "marcoto", DEP: "PM", JOB: "工程師", MAIL: "marcoto"},
		];

		for(let i = 0; i < arr.length; i++) {
			let d = (new Date()).getTime();
			let ref = this.db.collection('USER').doc("" + d);
			try {
				let x = await ref.set(Object.assign({MODIFY_DATE: d, ACTIVE: "Y"}, arr[i] ), {merge: true});
				console.log(x)
			} catch(e) {
				console.log(e)
			}
		}
	}
	static async uploadFile(){
		// https://firebase.google.com/docs/storage/web/upload-files?hl=zh-cn
		let ref = firebase.storage().ref().child('images/jim.txt');

		let message = 'This is my message.';
		let task = ref.putString(message).then(function(snapshot) {
			console.log('Uploaded a raw string!');
			console.log(snapshot)
		});
		/*
		task.on('state_changed', function(snapshot){
			let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
			}
		}, function(error) {
			// Handle unsuccessful uploads
		}, function() {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				console.log('File available at', downloadURL);
			});
		});
		*/
	}

	static async downloadFileURL(){ // URL
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