<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
    $password = $_GET["password"];
    if ($password == 1111) {
      echo "admin";
    }else {
      echo "user";
    }
     ?>
  </body>
</html>
