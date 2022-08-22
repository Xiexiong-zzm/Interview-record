const path = require('path')

module.exports = {
    lang: 'zh-CN',
    title: '面试题收集',
    description: '收录了常见的面试题，希望能帮助到你',
    base: '/Interview-record/',
    head: [['link', { rel: 'icon', href: '/Interview-record/favicon.ico' }]],
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
            { text: '仓库', link: 'https://github.com/Xiexiong-zzm/Interview-record.git' },
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
                title: 'HTML基础',
                path: '/md/interview/HTML/',
                collapsable: true,
                children: [
                    '/md/interview/HTML/'
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
                collapsable: true,
                children: [
                    '/md/interview/Algorithms/',
                ]
            },
            {
                title: '网络相关',
                path: '/md/interview/http/',
                collapsable: true,
                children: [
                    '/md/interview/http/',
                    '/md/interview/http/browser.md',
                ]
            },
            {
                title: '手撕代码',
                path: '/md/interview/code-rewrite/',
                collapsable: true,
                children: [
                    '/md/interview/code-rewrite/',
                ]
            },
            {
                title: '设计模式',
                path: '/md/interview/design-patterns/',
                collapsable: true,
                children: [
                    '/md/interview/design-patterns/',
                ]
            }
            
            
        ]
    },
    extraWatchFiles: [
        '.vuepress/config.js',
        '/md/interview/',
    ]

}