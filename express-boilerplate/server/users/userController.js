login: function(req, res) {
      res.json({responseText:'authenticated'});
   },

   logout: function(req, res){
     console.log('Session deleted');
     req.session.destroy();
     res.send({redirect: '/'});
   }
