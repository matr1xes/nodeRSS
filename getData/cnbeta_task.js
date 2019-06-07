const Parser = require('rss-parser')
const Article = require('../database/schema/articleSchema')

const feedUrl = 'https://www.cnbeta.com/backend.php'

let parser = new Parser()

const start = async function () {
    let feed = await parser.parseURL(feedUrl)
    console.log(feed.title)

    let items = feed.items
    for (let i = 0, length = items.length; i < length; i++) {
        let item = items[i]

        if (item.link.indexOf('cnbeta') != -1) {
            let linkToArr = item.link.replace('.htm', '').split('/')
            let id = linkToArr[linkToArr.length - 1]
            let type = linkToArr[linkToArr.length - 2]
            let contentSnippet = item.contentSnippet.replace(' 阅读全文', '')

            let getArticleID = await Article
                .find({
                    id: id
                })
                .select({
                    id: 1,
                    title: 1
                })

            if (!getArticleID[0]) {
                let article = new Article({
                    id: id,
                    title: item.title,
                    type: type,
                    creator: item.creator,
                    date: item.isoDate,
                    link: item.link,
                    contentSnippet: contentSnippet
                })

                let result = await article.save()
                console.log(i, result)
            } else if (i == 0) {
                console.log(`no news updated for this minute!`)
                return
            }

        }
    }
}

module.exports = start