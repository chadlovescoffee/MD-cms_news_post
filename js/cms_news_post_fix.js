
cms_news_post = {

  app: function() {

    // Required Js
    var required_js = 'js/materialize.min.js';

    // Append Required JS
    if (!$('head script[src="' + required_js + '"]').length > 0) {
      $('head').append('<script type="text/javascript" src="' + required_js + '"></script>');
    }

    // Required CSS
    var required_css = [
      'http://fonts.googleapis.com/icon?family=Material+Icons',
      'css/materialize.min.css',
      'css/cms_news_post.min.css'
    ];


    // Append Required CSS
    var i = 0;
    var css_html = '';

    $(required_css).each(function () {
      if (!$('head link[href="' + required_css[i] + '"]').length > 0) {
        css_html += '<link href="' + required_css[i] + '" rel="stylesheet">';
      }
      ++i;
    });

    $('head').append(css_html);


    //timezone
    var timezone = 18000;


    // Get Post ID
    var split_one = window.location.href.split("news/");
    var split_two = split_one[1].split("/");
    var post_id = split_two[0];




    $.ajax({
        url: 'http://www.warnermusic.ca/feeds/blog_json.php',
        jsonp: "callback",
        dataType: "jsonp",

        data: {
            artist_id: cms_news_post_setup.artist_id,
            include: 'artist',
            blog_id: post_id,
            ps: 1
        },

        success: function (news_post) {

          // console.log(news_post);

          // dateformat
          var epoch_date = parseInt(news_post.blogs[0].timestamp) + timezone;
          var string_date = new Date(0);
          string_date.setUTCSeconds(epoch_date);
          var long_date = string_date.toString();
          var split_long = long_date.split(" ");
          var formatted_date = split_long[1] + " " + split_long[2] + ", " + split_long[3];

          var news_html =
              '<div class="cms_news_post" style="display: none;">' +
              '   <div class="upper column_wrapper">' +
              '       <div class="photo">' +
              '           <img src="http://images.warnermusiccanada.com/prepareimage.php?width=650&height=650&blog_id=' + post_id + '&type=crop">' +
              '       </div>' +
              '       <div class="meta">' +
              '               <div class="date">' + formatted_date + '</div>' +
              '               <h4>' + news_post.blogs[0].title + '</h4>' +
              '       </div>' +
              '   </div>' +
              '   <div class="article">' +
              '       <p>' + news_post.blogs[0].body + '</p>' +
              '   </div>' +
              '</div>'
              ;

            $(cms_news_post_setup.destination).prepend(news_html);
        }
    });


    // Build News Id Array
        $.ajax({
            url: "http://www.warnermusic.ca/feeds/blog_json.php",
            jsonp: "callback",
            dataType: "jsonp",

            data: {
                artist_id: cms_news_post_setup.artist_id,
                include: 'artist',
                ps: 999
            },

            success: function (cms_news) {

              // console.log(cms_news);

                // Build News Id Array
                var news_id_array = [];
                var i = 0;

                $(cms_news.blogs).each(function () {
                    news_id_array.push(cms_news.blogs[i].id);
                    ++i;
                });

                var this_news = parseInt(news_id_array.indexOf(post_id));
                var total_news = news_id_array.length;

                var html_template =
                        '<div class="cms_news_more column_wrapper" style="display: none;">' +
                        '   <div class="previous">' +
                        '   </div>' +
                        '   <div class="next">' +
                        '   </div>' +
                        '</div>'
                    ;

                $(cms_news_post_setup.more_news_destination).html(html_template);


                // Next News
                if (this_news != 0) {

                    // Next Formatted Date
                    var next_epoch_date = parseInt(cms_news.blogs[this_news - 1].timestamp) + timezone;
                    var next_string_date = new Date(0);
                    next_string_date.setUTCSeconds(next_epoch_date);
                    var next_long_date = next_string_date.toString();
                    var next_split_long = next_long_date.split(" ");
                    var next_formatted_date = next_split_long[1] + " " + next_split_long[2] + ", " + next_split_long[3];

                    var next_html =
                    '   <a href="/news/' + cms_news.blogs[this_news - 1].id + '/' + cms_news.blogs[this_news - 1].title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '">' +
                    '       <h5 class="heading">Next Post</h5>' +
                    '       <div class="column_wrapper">' +
                    '           <div class="photo">' +
                    '               <img src="http://images.warnermusiccanada.com/prepareimage.php?width=400&height=400&blog_id=' + cms_news.blogs[this_news - 1].id + '&type=crop">' +
                    '           </div>' +
                    '           <div class="meta">' +
                    '               <div class="date">' + next_formatted_date + '</div>' +
                    '               <h5 class="title">' + cms_news.blogs[this_news - 1].title + '</h5>' +
                    '           </div>' +
                    '       </div>' +
                    '   </a>'
                    ;

                    $('.cms_news_more .next').append(next_html);
                }



                // Previous News
                if (this_news != total_news - 1) {

                    // Previous Formatted Date
                    var previous_epoch_date = parseInt(cms_news.blogs[this_news + 1].timestamp) + timezone;
                    var previous_string_date = new Date(0);
                    previous_string_date.setUTCSeconds(previous_epoch_date);
                    var previous_long_date = previous_string_date.toString();
                    var previous_split_long = previous_long_date.split(" ");
                    var previous_formatted_date = previous_split_long[1] + " " + previous_split_long[2] + ", " + previous_split_long[3];

                    var previous_html =
                        '   <a href="/news/' + cms_news.blogs[this_news + 1].id + '/' + cms_news.blogs[this_news + 1].title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '">' +
                        '       <h5 class="heading">Previous Post</h5>' +
                        '       <div class="column_wrapper">' +
                        '           <div class="photo">' +
                        '               <img src="http://images.warnermusiccanada.com/prepareimage.php?width=400&height=400&blog_id=' + cms_news.blogs[this_news + 1].id + '&type=crop">' +
                        '           </div>' +
                        '           <div class="meta">' +
                        '               <div class="date">' + previous_formatted_date + '</div>' +
                        '               <h5 class="title">' + cms_news.blogs[this_news + 1].title + '</h5>' +
                        '           </div>' +
                        '       </div>' +
                        '   </a>'
                        ;

                    $('.cms_news_more .previous').append(previous_html);
                }

            }
        });









  } //end app

};
