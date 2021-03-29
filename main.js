function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
function getbbdata(){
    //var bbsurl = "https://daodao-three.vercel.app/api?q=10" //这里填写你的api地址

    var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
    httpRequest.open('GET', bbsurl, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    httpRequest.send();//第三步：发送请求  将请求参数写在URL中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;//获取到json字符串，还需解析
            var obj = eval('(' + json + ')');
            // console.log(obj.data)
            const bbArray = obj.map(e => {
                return {
                    'date': getLocalTime(e.date.$date),
                    'content': e.content,
                    'from': e.from
                }
            })
            // console.log(fundsArray)
            generateBBHtml(bbArray)
        }
    };
}


var generateBBHtml = array => {
    var $dom = document.querySelector('#bber-talk');
    var result = '';

    if (array.length) {
        for (let i = 0; i < 10; i++) {
            var flag_daodao = true
            console.log(fliter_daodao)
            for (item of fliter_daodao){
                if(array[i].content.indexOf(item) >= 0){
                    flag_daodao = false
                }
            }
            if(flag_daodao){
                result += `<div class='li-style swiper-slide'>${array[i].content}</div>`;
            }
        }
    } else {
        result += '!{_p("aside.card_funds.zero")}';
    }

    var $dom = document.querySelector('#bber-talk');
    $dom.innerHTML = result;
    window.lazyLoadInstance && window.lazyLoadInstance.update();
    window.pjax && window.pjax.refresh($dom);
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
    });
}
var bbInit = () => {
// console.log('运行')
    if (document.querySelector('#bber-talk')) {
        const data = saveToLocal.get('zhheo-bb');
        if (data) {
            generateBBHtml(JSON.parse(data))
        } else {
            getbbdata()
        };
    }
}

bbInit();
document.addEventListener('pjax:complete', bbInit);