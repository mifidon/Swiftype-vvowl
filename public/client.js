const button = document.getElementById('SubmitBtn');
const loader = document.getElementById('loader');

const editable = false;

//Function for building request parameters
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

//Button(Submit) get all documents
button.addEventListener('click', function(e) {
  refreshTable();
});

//function fresh table
function refreshTable(){
var old_tBody = document.getElementById("DynamicTable_tbody");
old_tBody.innerHTML = "";
var apikey = document.getElementsByName('API-Key')[0].value;
loader.style.display = 'block';
getDocuments(apikey)

}
//function delete document
function deleteDocument(id){
  var apikey = document.getElementsByName('API-Key')[0].value;
  fetch(buildUrl("/deleteDocument/", {
        apikey: apikey,
        id: id
    }), {method: 'GET'}
      )
      .then(function (response) {
        if(response.ok){
          refreshTable();
          return response.json();
        }
        throw new Error('Request failed.');
  })
    .then(function(data) {
  })
  .catch(function(error) {
  });
}

//fucntion send document
function sendDocument(id, title, name, section, url, alexa_response){
  var apikey = document.getElementsByName('API-Key')[0].value;
  fetch(buildUrl("/sendDocument/", {
        apikey: apikey,
        id: id,
        title: title,
        name: name,
        section: section,
        url: url,
        alexa_response: alexa_response
    }), {method: 'GET'}
      )
      .then(function (response) {
        if(response.ok){
          alert("document has been saved");
          refreshTable();
          return response.json();
        }
        throw new Error('Request failed.');
  })
    .then(function(data) {
      var JSONservices = JSON.parse(data.body);
      alert("document has been send");
    console.log(JSONservices);
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
          loader.style.display = 'none';
          return response.json();
        }
        throw new Error('Request failed.');
  })
    .then(function(data) {

    var JSONservices = JSON.parse(data.body);

    if (JSONservices == [] ){
      alert("no results");
      $('#DynamicTable').SetEditable();
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
    //sorting services by external_id
   JSONservices.sort(function(obj1, obj2) {
    return obj1.external_id - obj2.external_id;
});

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

          var td = document.createElement("td");
          td.innerHTML = JSONservices[i].external_id;
          bRow.appendChild(td);
          var td = document.createElement("td");
          td.innerHTML = JSONservices[i].title;
          bRow.appendChild(td);
          var td = document.createElement("td");
          td.innerHTML = JSONservices[i].name;
          bRow.appendChild(td);
          var td = document.createElement("td");
          td.innerHTML = JSONservices[i].section;
          bRow.appendChild(td);
          var td = document.createElement("td");
          td.innerHTML = JSONservices[i].url;
          bRow.appendChild(td);
          var td = document.createElement("td");
          td.innerHTML = JSONservices[i].alexa_response;
          bRow.appendChild(td);

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
