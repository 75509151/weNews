<!DOCTYPE html>
<html lang="${request.locale_name}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="pyramid web application">
    <meta name="author" content="Pylons Project">
    <link rel="shortcut icon" href="${request.static_url('wenewsserver:static/pyramid-16x16.png')}">

    <title> ${title}</title>

    <!-- Bootstrap core CSS -->
    <link href="//oss.maxcdn.com/libs/twitter-bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this scaffold -->
    <link href="${request.static_url('wenewsserver:static/theme.css')}" rel="stylesheet">
    <style type="text/css">    
      /*div {width:500px; border:1px #000000 solid}*/
      ul {list-style-type:none;}
      /*li {display:inline;}*/
    </style>
  </head>

  <body>
  <form method="post" action=${ref}>
    <ul>
      <li>
        <label for="user_name">name:</label>
      </li>
      <li>
        <input type="text" name="user_name" value="music"/>
      </li>
      <li>
        <label for="user_pw">password:</label>
      </li>
      <li>
        <input type="password" name="user_pw" value="123456"/>
      </li>
      <li>
        <input type="submit" name="commit" value="commit">  
      </li>
        
    </ul>
    
    <input name="api" value="sign_in" style="display:none">
    
  </form>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="//oss.maxcdn.com/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="//oss.maxcdn.com/libs/twitter-bootstrap/3.0.3/js/bootstrap.min.js"></script>
  </body>
</html>
