// !! IMPORTANT !! //
// Add this file before load.js
document.title += " | News";
let commonCss = document.createElement("link");
commonCss.href = "/css/news_common.css";
commonCss.rel = "stylesheet";
document.head.appendChild(commonCss);

let images = document.querySelectorAll('img');
for(let i = 0; i < images.length; i++){
    images[i].addEventListener('click',()=>{
        window.open(images[i].getAttribute('src'));
    });
}

window.addEventListener('load', ()=>{
    $('p.jump').click(()=>{
        location.href = "/news/"
    })
})