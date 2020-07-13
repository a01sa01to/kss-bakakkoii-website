// pjax = pushState + Asynchronous JavaScript And XML
window.addEventListener('load',()=>{
    $('a:not([target=_blank])').click(function(){
        $('main').fadeOut(fast);

        const loader = document.createElement('div');
        loader.className = "loader";
        document.body.appendChild(loader);

        $('div.loader').css('top',((window.innerHeight-$('div.loader').innerHeight())/2)+'px');
        $('div.loader').css('left',((window.innerWidth-$('div.loader').innerWidth())/2)+'px');
        $('footer').css('margin-top', '300px');

        let link = $(this).attr('href');
        history.pushState(null, null, link);
        $.ajax({
            url: link,
            type: 'GET'
        }).done((data)=>{
            let main, style, title = new Number();
            for (const a in $(data)) {
                const e = $(data)[a];
                if(e.tagName === "MAIN"){
                    main = a;
                    continue;
                }
                if(e.tagName === "STYLE"){
                    style = a;
                    continue;
                }
                if(e.tagName === "TITLE"){
                    title = a;
                    continue;
                }
            }
            $('main').html($($(data)[main]).html());
            $('style').html($($(data)[style]).html());
            document.title = $($(data)[title]).html() + ' - ' + document.title.split(' - ')[1];
        }).fail(()=>{
            $('main').html('エラーが発生しました。');
            $('style').html('main{font-size: 28px;text-align:center;');
        }).always(()=>{
            $('.loader').fadeOut();
            $('footer').css('margin-top', '0px');
            document.body.removeChild(loader);
            document.body.removeChild(loaderTxt);
            $('main').fadeIn();
        });
        return false;
    });
});