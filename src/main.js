const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last');
const xObject = JSON.parse(localStorage.getItem('x'));
const hashmap = xObject || [
    { logo: 'a', logoType: 'url', link: 'https://www.acfun.cn' },
    { logo: 'b', logoType: 'img', link: 'http://bilibili.com' },
]

//简化URL
const removeX = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}


const render = () => {

    $siteList.find('li:not(.last)').remove();
    hashmap.forEach((node, index) => {
        const $li = $(` <li class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link"> ${removeX(node.link)}</div>
                            <div class="close"> 
                                <svg class="icon" >
                                <use xlink:href="#icon-close"></use>
                                </svg>
                            </div>
                    </li>`)
        $li.insertBefore($lastLi)

        // 代替<a>标签, 有问题
        $li.on('click', () => {
            window.open(node.link);
        })
        $li.on('click', '.close', (e) => {
            console.log(index + 'stop')
            e.stopPropagation();
            hashmap.splice(index, 1);
            render();
        })

    })
}

render();

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加什么网站');

    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }

    hashmap.push({
        logo: removeX(url)[0],
        logoType: "url",
        link: url
    })
    render();
})



window.onbeforeunload = () => {
    console.log(hashmap)
    const string = JSON.stringify(hashmap)
    localStorage.setItem('x', string)

}

// 键盘事件， 快捷打开
$(document).on('keypress', (e) => {
    const { key } = e;
    for (let i = 0; i < hashmap.length; i++) {

        if (hashmap[i].logo.toLowerCase() === key) {

            window.open(hashmap[i].link);
        }
    }
})

