class Sqlite{
	constructor(){
		let self = this;
		this.version = "20191007";
		this.db = window.openDatabase("project", '1.0', '', 10*1000*1000);

		this.db.transaction(function(tx){
			
		});
	}

	initial(){
		let version = window.localStorage["dbVersion"];
		version = typeof version == "string" ? version : "";
		let arr = [], sql = "", tx, self = this;
		if(this.version > version) {
			arr.push("CREATE TABLE if not exists USER(PK int NOT NULL, USR_NAME nvarchar(10) NOT NULL," +
				"DEP nvarchar(10), JOB nvarchar(10), MAIL nvarchar(30), MEMO text, ACTIVE nvarchar(1) default 'Y', " +
				"MODIFY_DATE int NOT NULL, " +
				"PRIMARY KEY (PK) )");

				arr.push("CREATE TABLE if not exists PROJECT(PK int NOT NULL, PRJ_NAME nvarchar(10) NOT NULL," +
				"MEMBER text, VERSION nvarchar(50), MEMO text, ACTIVE nvarchar(1) default 'Y', " +
				"MODIFY_DATE int NOT NULL, " +
				"PRIMARY KEY (PK) )");
	
			arr.push("CREATE TABLE if not exists CODE(PK int NOT NULL, CD_KIND nvarchar(20) NOT NULL," +
				"CD_NAME nvarchar(20) NOT NULL, CD_KEY nvarchar(20) NOT NULL, MEMO text, ACTIVE nvarchar(1) default 'Y', " +
				"MODIFY_DATE int NOT NULL, " +
				"PRIMARY KEY (PK) )");
		}
		return new Promise( (success, error) => {
			self.db.transaction((_tx) => {
				tx = _tx;
				execute(0);
			});
	
			function execute( index ){
				if( index >= arr.length){
					window.localStorage["dbVersion"] = self.version;
					success();
					return;
				}
				//console.log(index + ": " + arr[index] );
				tx.executeSql(arr[index], null, function(){
					execute( index + 1 );							
				}, function(tx, e){
					console.log(e.message);
					console.log(arr[index])
					error(e.message);
				});
			};
		});
	}

	convertToInsert(tblName, json){
		let values = [], s1 = "", s2 = "";
		let date = (new Date()).getTime();
		if(typeof json.PK == "undefined") json.PK = date;
		json.MODIFY_DATE = date;
		for(let key in json) {
			s1 += (s1.length > 0 ? ", " : "") + key;
			s2 += (s2.length > 0 ? ", " : "") + "?";
			values.push(json[key]);
		}
		return {sql: "Insert Into " + tblName + "(" + s1 + ") values(" + s2 + ")", values};
	}

	execute(sql, value){
		let self = this;
		return new Promise( (success, error) => {
			self.db.transaction((tx) => {
				tx.executeSql(sql, value, 
				(tx, results)=>{
					if(sql.toUpperCase().indexOf("SELECT ") == 0)
						success(results.rows)
					else 
						success(results.rowsAffected);
				}, (tx, e)=>{
					error(e)
					console.log(e)
					vm.showMessage("SQL Error：", e.message, sql);
				});
			});
		});
	}
}

window.sqlite = new Sqlite();