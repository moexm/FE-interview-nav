const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last');
const xObject = JSON.parse(localStorage.getItem('x'));
console.log(xObject)
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
    hashmap.forEach(node => {
        const $li = $(`<li class="site">
                        <a href="${node.link}">
                            <div class="logo">${node.logo}</div>
                            <div class="link"> ${removeX(node.link)}</div>
                        </a>
                    </li>`)
        $li.insertBefore($lastLi)
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

