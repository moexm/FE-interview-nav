const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last');
const xObject = JSON.parse(localStorage.getItem('x'));
const hashmap = xObject || [
    { logo: 'a', link: 'https://www.acfun.cn' },
    { logo: './images/bilibili.png', link: 'http://bilibili.com' },
]


const render = () => {

    $siteList.find('li:not(.last)').remove();
    hashmap.forEach(node => {
        const $li = $(`<li class="site">
                        <a href="${node.link}">
                            <div class="logo">${node.logo[0]}</div>
                            <div class="link">${node.link}</div>
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
    console.log(url);
    hashmap.push({ logo: url.slice(9)[0], link: url })
    render();
})



window.onbeforeunload = () => {
    console.log(hashmap)
    const string = JSON.stringify(hashmap)
    localStorage.setItem('x', string)

}

