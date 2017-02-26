function ajaxCall(url, type, data) {
  $.ajax({
    url: url,
    type: type,
    data: data,
    success: function(data)
    {
      console.log(data);
    },
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }
   });
}
