const query=document.location.search.substring(1);

// Add to HomeScreen
let manifest = document.createElement('link');
let appleicon = document.createElement('meta');
if(document.location.search.substring(1).includes("lang=en")){
    manifest.href = "/manifestEn.json";
    appleicon.content = "KSS Bakakkoii Series";
}
else{
    manifest.href = "/manifestJa.json";
    appleicon.content = "古河中等ばかっこいいシリーズ";
}
appleicon.name = "apple-mobile-web-app-title";
manifest.rel = "manifest";
document.head.appendChild(manifest);
document.head.appendChild(appleicon);

fetch('/haf/common.html').then((r)=>{return r.text()}).then((t)=>{document.head.innerHTML += t});

fetch('/js/jquery-3-2-1.js').then((r)=>{return r.text()}).then((t)=>{eval(t)}).then(()=>{
    fetch('/dev/index.php?tool=style&style=ripple&type=all').then((r)=>{return r.text()}).then((t)=>{eval(t)});
    fetch('/dev/index.php?tool=style&style=go-top&type=all').then((r)=>{return r.text()}).then((t)=>{eval(t)});
    fetch('/dev/index.php?tool=style&style=scroll-fadein&type=all').then((r)=>{return r.text()}).then((t)=>{eval(t)});

    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-115062917-1');

    // Menu
    $("footer").load("/haf/footer.html");
    $("header").load("/haf/header.html");

    //Add to Home Screen
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register("serviceWorker.js").then((registration)=>{
            console.log("serviceWorker registed.");
        }).catch((error)=>{
            console.warn("serviceWorker error.",error);
        });
    }
});

window.addEventListener('load',()=>{
    if(query.indexOf("lang=en")>-1){
        $(".ja").remove();

        $('option[value=ja]').removeAttr('selected');
        $('option[value=en]').attr('selected','selected');
        //Link into English
        $(".en a, p.en ").each((i,e)=>{
            var obj=$(e);
            var link=obj.attr("href");
            if(link !== undefined && link.indexOf("javascript:") === -1 && link.indexOf('ntab:') === -1){
                obj.attr("href",link+"?lang=en");
            }
        });
    }
    else{
        $('.en').remove();
    }

    // header.html adjustment
    const ua = window.navigator.userAgent;
    if(ua.indexOf("Android")>-1 || ua.indexOf("iPhone")>-1){
        var header_height = $('header table').outerHeight() + $('header p#time').outerHeight();
        var device_height = window.innerHeight;
        var menu_height = device_height - header_height;
        $('header div#list').outerHeight(menu_height);
    }

    // Open in New Tab if link starts "ntab:"

    $('[href]').each(function(){
        var href = $(this).attr('href');
        var newTab = href.indexOf('ntab:')>-1;
        if(newTab){
            href = href.replace('ntab:',"");
            $(this).attr('target','_blank');
        }
    });

    // Tweets
    $('twitter-widget.twitter-tweet.twitter-tweet-rendered').css('margin','auto');
    $('twitter-widget.twitter-tweet.twitter-tweet-rendered').addClass('fadein');
});

// Prohibit Right-Click
window.document.oncontextmenu = ()=>{return false;};

// Add Desc to title
document.title+=" - 古河中等ばかっこいいシリーズ";

// Title for English user
function enTitle(ttl){
    if(document.location.search.substring(1).indexOf("lang=en")>-1){
        document.title=ttl+" - KSS Bakakkoii Series";
    }
}


fetch('/haf/cookieconsent_3.1.0/cookieconsent.min.js').then(r=>r.text()).then(t=>eval(t)).then(()=>{
    window.addEventListener("load", function(){
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                "background": "#eeeeee",
                "text": "#444444"
                },
                "button": {
                "background": "#014715",
                "text": "#ffffff"
                }
            },
            "theme": "edgeless",
            "content": {
                "message": "当サイトでは、利便性の向上を目的として、Cookieを使用しています。引き続き当サイトを利用・閲覧することで、Cookieの使用に同意したことになります。",
                "dismiss": "同意して続ける",
                "link": "詳しくはこちらをご覧ください。(外部サイト・英語)"
            }
        })
    });
});