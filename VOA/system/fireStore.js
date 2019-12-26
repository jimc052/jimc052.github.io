
	// https://firebase.google.com/docs/firestore/quickstart?authuser=1
	// https://www.oxxostudio.tw/articles/201905/firebase-firestore.html
  // https://t.codebug.vip/questions-1920875.htm
  class FireStore{
    static db;
    static user = null;
  
    static initial(key){
      var firebaseConfig = {
        apiKey: "AIzaSyBLvDLmJ6p9Ko44Q2gNt0NLgTqu1ewnBR8",
        authDomain: "jvoa-3c784.firebaseapp.com",
        databaseURL: "https://jvoa-3c784.firebaseio.com",
        projectId: "jvoa-3c784",
        storageBucket: "jvoa-3c784.appspot.com",
        // messagingSenderId: "837844936578",
        appId: "1:837844936578:web:dc0cef8a726eb73946519b",
        // measurementId: "G-ZYH5ZW448S"
      };

      firebase.initializeApp(firebaseConfig);
      this.db = firebase.firestore();
    }
    static mail(){
      return firebase.auth().currentUser.email;
    }
    static uid(){
      return firebase.auth().currentUser.uid;
    }
    static async signIn(email, password){
      try {
        let result = await firebase.auth().signInWithEmailAndPassword(email, password);
        return result;
      } catch(e) {
        throw e;
      }
    }

    static async update(json){
      let date = (new Date()).getTime(); // /" + report
      let ref = this.db.collection("VOA").doc("" + json.key);
      json.modifyDate = date;
      let obj = Object.assign({}, json);
      delete obj.key;
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
  
    static async uploadString(fileName, data){ // 不知為何又不能用了
      // https://firebase.google.com/docs/storage/web/upload-files?hl=zh-cn
      return new Promise( (success, error) => {
        let ref = firebase.storage().ref().child(fileName);
        let task = ref.putString(data, 'data_url');
        task.on('state_changed', function(snapshot){
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
          if(progress == 100) {
            success();
          }
        }, function(err) {
          // Handle unsuccessful uploads
          error(err)
        }, function() {
          // Handle successful uploads on complete
          // task.snapshot.ref
          // .getDownloadURL()
          // .then(function (downloadURL) {
          //     console.log("downloadURL: " + downloadURL);
          // });
        });
      });
    }

    static async uploadFile(file){ // 不知為何又不能用了
      // https://firebase.google.com/docs/storage/web/upload-files?hl=zh-cn
      let ref = firebase.storage().ref().child('mp3/'+file.name);
      let task = ref.put(file); 
      task.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      });
      
    }
  
    static async downloadFileURL(fileName){ // ok 可以用
      // https://firebase.google.com/docs/storage/web/download-files?hl=zh-cn
      return new Promise( (success, error) => {

        let ref = firebase.storage().ref().child(fileName);
        ref.getDownloadURL().then(function(url) {
          success(url)
          // Insert url into an <img> tag to "download"
        }).catch(function(err) {
          switch (err.code) {
            case 'storage/object-not-found':
              error("File doesn't exist")
              break;
            case 'storage/unauthorized':
              error("User doesn't have permission to access the object")
              break;
            case 'storage/canceled':
              error("User canceled the upload")
              break;
            case 'storage/unknown':
              error("Unknown error occurred, inspect the server response")
              break;
          }
        });
      });
    }
  }