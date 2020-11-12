<?php
    session_start();
    session_destroy();

    header("Location:/../paradise/index.html");
?>