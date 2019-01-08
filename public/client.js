const button = document.getElementById('SubmitBtn');

const editable = false;


function buildUrl(url, parameters) {
    let qs = "";
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            qs +=
                encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }

    return url;
}

button.addEventListener('click', function(e) {
  var apikey = document.getElementsByName('API-Key')[0].value;
  getDocuments(apikey)
});

function deleteDocument(id){
  //TODO: creat check api key function
  var apikey = document.getElementsByName('API-Key')[0].value;

  fetch(buildUrl("/deleteDocument/", {
        apikey: apikey,
        id: id
    }), {method: 'GET'}
      )
      .then(function (response) {
        if(response.ok) return response.json();
        console.log(response);
        throw new Error('Request failed.');
  })
    .then(function(data) {
      console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });
}

function sendDocument(id, title, name, section, url){
  var apikey = document.getElementsByName('API-Key')[0].value;
  fetch(buildUrl("/sendDocument/", {
        apikey: apikey,
        id: id,
        title: title,
        name: name,
        section: section,
        url: url
    }), {method: 'GET'}
      )
      .then(function (response) {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request failed.');
  })
    .then(function(data) {
      console.log(data)
  })
  .catch(function(error) {
  });

}

function getDocuments(apikey){
  fetch(buildUrl("/getDocuments/", {
        apikey: apikey,
    }), {method: 'GET'}
      )
      .then(function (response) {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request failed.');
  })
    .then(function(data) {

    var JSONservices = JSON.parse(data.body);

    if (JSONservices == [] ){
      alert("no results");
      $('#DynamicTable').SetEditable({ $addButton: $('#addNewRow'), onEdit: function() {console.log("edited")}, });
    }
    else if (JSONservices.error == "You need to sign in or sign up before continuing.") {
      alert("You need to enter your authentication token before continuing.");
    }
    else if (JSONservices.error == "Invalid authentication token.") {
      alert("Invalid authentication token.");
    }
    else{
      generateDynamicTable(JSONservices);
    }

  })
  .catch(function(error) {
    console.log(error);
  });

}

function generateDynamicTable(JSONservices){

		var noOfServices = Object.keys(JSONservices).length;

			// retrieve column header ('external_id', 'engine_id', 'document_type_id', 'id', 'updated_at', ...)

			var col = []; // define an empty array
			for (var i = 0; i < noOfServices; i++) {
				for (var key in JSONservices[i]) {
					if (col.indexOf(key) === -1) {
						col.push(key);
					}
				}
			}
			// CREATE TABLE BODY .
			var tBody = document.createElement("tbody");

			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
			for (var i = 0; i < noOfServices; i++) {

					var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .

					for (var j = 0; j < col.length; j++) {
            if(!(col[j].match(/^(engine_id|document_type_id|updated_at|_id|id)$/))){
						var td = document.createElement("td");
						td.innerHTML = JSONservices[i][col[j]];
						bRow.appendChild(td);
              }
					}
					tBody.appendChild(bRow)

			}

			// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
			var dynamicTable = document.getElementById("DynamicTable");
      var old_tBody = document.getElementById("DynamicTable_tbody");
      if(old_tBody!=null){
      old_tBody.innerHTML = tBody.innerHTML;
      }

    $('#DynamicTable').SetEditable();


  }
