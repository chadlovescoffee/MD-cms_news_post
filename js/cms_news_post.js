cms_news_post = {
    app: function() {
        var s = "js/materialize.min.js";
        !$('head script[src="' + s + '"]').length > 0 && $("head").append('<script type="text/javascript" src="' + s + '"></script>');
        var e = ["http://fonts.googleapis.com/icon?family=Material+Icons", "css/materialize.min.css", "css/cms_news_post.min.css"],
            t = 0,
            a = "";
        $(e).each(function() {
            !$('head link[href="' + e[t] + '"]').length > 0 && (a += '<link href="' + e[t] + '" rel="stylesheet">'), ++t
        }), $("head").append(a);
        var i = 18e3,
            p = window.location.href.split("="),
            o = p[1].split("&"),
            c = o[0];
        console.log(c), $.ajax({
            url: "http://www.warnermusic.ca/feeds/blog_json.php",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                artist_id: cms_news_post_setup.artist_id,
                include: "artist",
                blog_id: c,
                ps: 1
            },
            success: function(s) {
                var e = parseInt(s.blogs[0].timestamp) + i,
                    t = new Date(0);
                t.setUTCSeconds(e);
                var a = t.toString(),
                    p = a.split(" "),
                    o = p[1] + " " + p[2] + ", " + p[3],
                    l = '<div class="cms_news_post" style="display: none;">   <div class="upper column_wrapper">       <div class="photo">           <img src="http://images.warnermusiccanada.com/prepareimage.php?width=650&height=650&blog_id=' + c + '&type=crop">       </div>       <div class="meta">               <div class="date">' + o + "</div>               <h4>" + s.blogs[0].title + '</h4>       </div>   </div>   <div class="article">       <p>' + s.blogs[0].body + "</p>   </div></div>";
                $(cms_news_post_setup.destination).prepend(l)
            }
        }), $.ajax({
            url: "http://www.warnermusic.ca/feeds/blog_json.php",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                artist_id: cms_news_post_setup.artist_id,
                include: "artist",
                ps: 999
            },
            success: function(s) {
                var e = [],
                    t = 0;
                $(s.blogs).each(function() {
                    e.push(s.blogs[t].id), ++t
                });
                var a = parseInt(e.indexOf(c)),
                    p = e.length,
                    o = '<div class="cms_news_more column_wrapper" style="display: none;">   <div class="previous">   </div>   <div class="next">   </div></div>';
                if ($(cms_news_post_setup.more_news_destination).html(o), 0 != a) {
                    var l = parseInt(s.blogs[a - 1].timestamp) + i,
                        d = new Date(0);
                    d.setUTCSeconds(l);
                    var n = d.toString(),
                        r = n.split(" "),
                        h = r[1] + " " + r[2] + ", " + r[3],
                        m = '    <h5 class="heading">Next Post</h5>    <a href="post.php?id=' + s.blogs[a - 1].id + "&title=" + s.blogs[a - 1].title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + '">       <div class="column_wrapper">           <div class="photo">               <img src="http://images.warnermusiccanada.com/prepareimage.php?width=400&height=400&blog_id=' + s.blogs[a - 1].id + '&type=crop">           </div>           <div class="meta">               <div class="date">' + h + '</div>               <h5 class="title">' + s.blogs[a - 1].title + "</h5>           </div>       </div>   </a>";
                    $(".cms_news_more .next").append(m)
                }
                if (a != p - 1) {
                    var v = parseInt(s.blogs[a + 1].timestamp) + i,
                        g = new Date(0);
                    g.setUTCSeconds(v);
                    var _ = g.toString(),
                        w = _.split(" "),
                        u = w[1] + " " + w[2] + ", " + w[3],
                        b = '    <h5 class="heading">Previous Post</h5>    <a href="post.php?id=' + s.blogs[a + 1].id + "&title=" + s.blogs[a + 1].title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + '">       <div class="column_wrapper">           <div class="photo">               <img src="http://images.warnermusiccanada.com/prepareimage.php?width=400&height=400&blog_id=' + s.blogs[a + 1].id + '&type=crop">           </div>           <div class="meta">               <div class="date">' + u + '</div>               <h5 class="title">' + s.blogs[a + 1].title + "</h5>           </div>       </div>   </a>";
                    $(".cms_news_more .previous").append(b)
                }
            }
        })
    }
};
