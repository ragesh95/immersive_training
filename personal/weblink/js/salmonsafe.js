function salmonSafe() {
  let url = "http://uniqsofts.com/test/check.php";
  let type = "POST";
  let data = {
    test : "check"
  };
  ajaxCall(url, type, data);
}
