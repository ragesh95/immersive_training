var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('ajax-request');
var nanoajax = require('nanoajax');

function ajaxCall(url) {
  // request.post({
  // url: url,
  // data: "test=fyf"
  // }, function(err, res, body) {
  //   console.log(body);
  // });
  nanoajax.ajax({url: url, method: 'POST', body: 'test=iugiug'},
    function (code, responseText, request) {
      console.log(responseText);
  });
}

function ajaxxCall(url) {
  var subject = "caller name announcer";
  var comment = "Download <a href='http://callernameannouncer.uniqsofts.com'>Caller name announcer</a> to read out caller name, messages and whatsapp notifications";
  var params = "test=sssdsa";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Success\n"+this.responseText);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
  // xhttp.send("subject="+subject+"&comment="+comment);
}

for (let i = 98; i<99; i++) {
  // ajaxCall("http://www.salmonsafe.org/comment/reply/"+i);
  ajaxCall("http://uniqsofts.com/test/check.php");
}
