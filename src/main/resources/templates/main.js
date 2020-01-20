let formElements = [];
let changedFields = [];
let dataJson = {};
let prefix = 'http://localhost:8089/';
$(document).ready(function () {



	$('#testForm input,#testForm select').each(function () {
		let thisEle = $(this);
		formElements.push(thisEle);

		console.log("formElements ", formElements);
	});


	$('#testForm input,#testForm select').change(function () {
		let alreadyExists = false;

		if (changedFields.length > 0) {
			for (let c of changedFields) {
				if ($(this)[0].name == c[0].name) {
					alreadyExists = true;
				}
				if (alreadyExists) {
					changedFields.pop(c);
					console.log("c popped", c);
				}
			}
		}

		changedFields.push($(this));
		console.log("this changed", $(this));
		console.log("changedFields ", changedFields);
	});

	// $("#saveBtn").submit(function () {
	//     console.log("changedFields ", changedFields[0][0]["name"]);
	//     alert("i'm working");

	//     dataJson[changedFields[0][0]["name"]] = changedFields[0][0]["value"];
	//     console.log("dataJson dataJson ", dataJson);

	//     alert('product updated!!!');
	/* $("#subBtn").click(function () {
                     for (let f of formElements) {
                         for (let c of changedFields) {
                             console.log("loop");
                             if (f[0].name == c[0].name) {
                                 console.log("samee ", f[0].name);
                                 if (f[0].value != c[0].value) {
                                     console.log("changed ", f);
                                 }
                                 else {
                                     console.log("no change ", f);
                                 }
                             }
                         }
                     }
                 }); */
	// });

});


function submitClick(){
	if(changedFields.length == 0){
		console.log("Nothing Updated");
		alert("Nothing edited");
	}
	else{

		// default id
		dataJson[formElements[0][0]["name"]] = formElements[0][0]["value"];

		// chnaged
		for (let modify of changedFields) {
			dataJson[modify[0]["name"]] = modify[0]["value"];
			console.log("dataJson dataJson ", dataJson);
		}
//		alert('product updated!!!');

		$.ajax({
			type: 'POST',
			url:  prefix + '/update',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(dataJson),
			dataType: 'json',
			async: true,
			success: function(result) {
//				alert('product updated!!!');

			},
			error: function(jqXHR, textStatus, errorThrown) {
//				alert('product not updated!!!');
				window.location.href = '/';
			}
		});
	}}