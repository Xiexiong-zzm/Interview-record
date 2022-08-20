const path = require('path')

module.exports = {
    lang: 'zh-CN',
    title: '面试题收集',
    description: '收录了常见的面试题，希望能帮助到你',
    base: '/interview/',
    theme: '@vuepress/theme-default',
    themeConfig: {
        displayAllHeaders: true,
        logo: '/biker.svg',
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: '首页', link: '/' },
            { text: '面试', link: '/md/interview/es6/' },
            { text: '关于', link: '/md/about/' },
            { text: '仓库', link: '' },
        ],
        sidebar: [
            {
                title: 'ES6',
                path: '/md/interview/es6/',
                children: [
                    '/md/interview/es6/',
                    '/md/interview/es6/extend.md',
                ]
            },
            {
                title: 'CSS相关',
                path: '/md/interview/CSS/',
                collapsable: true,
                children: [
                    '/md/interview/CSS/',
                    '/md/interview/CSS/box-model.md',
                ]
            },
            {
                title: '前端常考算法',
                path: '/md/interview/Algorithms/',
                collapsable: false,
                children: [
                    '/md/interview/Algorithms/',
                ]
            },
            {
                title: 'HTTP网络相关',
                path: '/md/interview/http/',
                collapsable: false,
                children: [
                    '/md/interview/http/',
                ]
            },
            {
                title: '手撕代码',
                path: '/md/interview/code-rewrite/',
                collapsable: false,
                children: [
                    '/md/interview/code-rewrite/',
                ]
            }
            
            
        ]
    },
    extraWatchFiles: [
        '.vuepress/config.js',
        '/md/interview/',
    ]

}