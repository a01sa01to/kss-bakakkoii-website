const stylesheet = document.createElement("link");
stylesheet.href = "/css/news_list.css";
stylesheet.rel = "stylesheet";
document.head.appendChild(stylesheet);
var moveDirectory;

window.addEventListener('load',()=>{
    // News Appender
    function newsAppend(url=new String){
        const documentURI = document.location.pathname.replace('index.html','');
        if(!(url.includes(documentURI))){
            return null;
        }
        url = url.replace(documentURI,'');
        url = './' + url;
        $.ajax({
            url: url,
            cache: true
        }).then((data)=>{
            let ttl = $(data);
            let enTtl = new String;
            let update = $(data).find('p.upDate').text();
            let iconPath = new String;
            let tNo,enNo = new Number;
            for(let i=0;i<ttl.length;i++){
                if(ttl[i].tagName === "TITLE"){
                    tNo = i;
                }
                else if(ttl[i].tagName === "SCRIPT" && ttl[i].innerText.includes('enTitle')){
                    enNo = i;
                }
                else if(ttl[i].tagName === "META"){
                    for(let j=0;j<ttl[i].attributes.length;j++){
                        if(ttl[i].attributes[j].value === "og:image"){
                            iconPath = ttl[i].content.replace('https://kss-bakakkoii.azurewebsites.net','');
                        }
                    }
                }
            }
            ttl = ttl[tNo].innerText;
            enTtl = $(data)[enNo].innerText.split('enTitle(')[1].split(');')[0].replace('"','').replace('"','').replace("'","").replace("'","");
            /*
            <li>
                <img src="/img/news/2018/10/homeScreen/icon.jpg">
                <p class="title">Title</p>
                <p class="date">2018.10.05</p>
                <p class="url">/news/2018/10/homeScreen.html</p>
            </li>
            */
            let appendHtml = '<li>';
            appendHtml += '<img src="' + iconPath + '">';
            if(document.location.search.substring(1).includes('lang=en')){
                appendHtml += '<p class="title">' + enTtl + '</p>';
            }
            else{
                appendHtml += '<p class="title">' + ttl + '</p>';
            }
            appendHtml += '<p class="date">' + update + '</p>';
            appendHtml += '<p class="url">' + url + '</p>';
            appendHtml += '</li>';

            if(document.location.search.substring(1).includes('lang=en')){
                $('main ul.en').append(appendHtml);
            }
            else{
                $('main ul.ja').append(appendHtml);
            }
        });
    }

    // News List
    newsAppend('/news/2018/10/homeScreen.html');

    // News Click to jump
    setTimeout(()=>{
    $('main ul li').click(function(){
        if(document.location.search.substring(1).includes('lang=en')){
            $(this).find('p.url').text($(this).find('p.url').text() + "?lang=en")
        }
        document.location.href = $(this).find('p.url').text();
    });    
    },500);

    moveDirectory = (ym)=>{
        let url;
        if(document.location.search.substring(1).includes('lang=en')){
            url = $('p.jump.en select#'+ym).val();
            url += "?lang=en";
        }
        else{
            url = $('p.jump.ja select#'+ym).val();
        }
        location.href = url;
    }
});
