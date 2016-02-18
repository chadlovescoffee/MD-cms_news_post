<html>

<?php
$intBlogID=$_REQUEST['id'];

$json=file_get_contents('http://www.warnermusic.ca/feeds/blog_json.php?blog_id=' . $intBlogID . '&artist_id=351&include=artist');
$data=json_decode($json);
?>


<head>
    <meta property="og:site_name" content="Scott Helman"/>
    <meta property="og:url" content="http://<?php=$_SERVER['HTTP_HOST']?><?php=$_SERVER['REQUEST_URI']?>"/>
    <meta property="og:title" content="<?php=$data->blogs[0]->title?>"/>
    <meta property="og:description" content="<?php=$data->blogs[0]->title?>"/>
    <meta property="og:image" content="<?php=$data->blogs[0]->imageurl?>"/>
    <meta property="og:type" content="website"/>
</head>

  <body>

    <div class="cms_news_post_container">
      <div class="post_id" style="display:none;"><?php=$intBlogID?></div>
      <div class="more_news"></div>
    </div>


    <!-- cms-news-->
    <script>
      var cms_news_post_setup = {
          'destination': '.cms_news_post_container',
          'more_news_destination': '.cms_news_post_container .more_news',
          'artist_id': 351,
          'news_id': $('.cms_news_post_container .post_id').html(),
          'site': 'artist'
      };


      console.log(artist_id);

      $.getScript('js/cms_news_post.min.js', function(){
        cms_news_post.app();
      });
    </script>






  </body>
</html>
