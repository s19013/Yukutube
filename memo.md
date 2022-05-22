# 未来の私へ
`youtube-api-search`はgitで管理されていないから`npm install`した時は初期状態のままだから  
`youtube-api-search`の`index.js`の`params`のところに以下の文を追加する必要がある

* publishedAfter: options.publishedAfter,
* publishedBefore: options.publishedBefore,
* order:options.order,
* maxResults: options.maxResults,

追加したらreactを再起動する  
他に検索条件とか足したかったら