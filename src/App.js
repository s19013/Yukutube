import React, {useState, useEffect} from 'react';
import Header from './components/Header/Header'
import Body from './components/Body/Body'
// import Item from './components/Video/Item/Item'
import List from './components/Video/List/List'
import Video from './components/Video/Video'
import YSearch from 'youtube-api-search';
const API = 'AIzaSyAR8-LzGCEDEbga4PXzdgfssJ_HENLdSk8'

const App = () => {
  const d = new Date()
  const [newTerm,setNewTerm] = useState("") //検索キーワード
  const [newMaxResults,setNewMaxResults] = useState(5) //最大表示数
  const [newOrder,setNewOrder] = useState("relevance") //並び方
  const [BDate,setBDate] = useState([d.getFullYear(),d.getMonth()+1,d.getDate()]) //検索範囲はじめ
  const [ADate,setADate] = useState([d.getFullYear()-5,d.getMonth()+1,d.getDate()]) //検索範囲終わり
  const [videos,setVideos] = useState([]) //取ってきたビデオ達
  const [selectedVideo,setSelectedVideo] = useState(null) //選んだビデオ(すぐ再生できるビデオ)
  useEffect(() => {
      YSearch({key:API,term: 'ゆっくり',maxResults:newMaxResults}, (data) => {
        setVideos(data)
        setSelectedVideo(data[0])
      })
      console.log("mount success");
      setNewTerm("ゆっくり ")
  },[])


// リストを取ってきていじってsetBDate
// handler
  //再生する動画変更
  const onVideoClickedHandler = (video) => {setSelectedVideo(video)}

  //キーワード変更
  const onKeywordChangedHandler = (keyword) => {setNewTerm("ゆっくり " + keyword)}

  //最大表示数変更
  const onChangedMaxResultsHandler = (MRvalue) => {setNewMaxResults(MRvalue)}

  // 並び替え変更
  const onChangedOrderHandler = (Order) => {setNewOrder(Order)}

  //検索開始範囲変更
  const onChangeBDateHandler = (id,num) => {
    var newBDate = BDate
    newBDate[id] = num
    setBDate(newBDate)
  }

  const onChangeADateHandler = (id,num) => {
    var newADate = ADate
    newADate[id] = num
    setADate(newADate)
  }

  //最終日を正す
  const check = () => {
    var newBDate = BDate
    var newADate = ADate
    const BM = newBDate[1]
    const AM = newADate[1]
    if (BM === 1 || BM === 3 || BM === 5 || BM === 7 || BM === 8 || BM === 10 || BM === 12) {
      if (newBDate[2] === 31) {newBDate[2] = 30}
    }
    if (AM === 1 || AM === 3 || AM === 5 || AM === 7 || AM === 8 || AM === 10 || AM === 12) {
      if (newADate[2] === 31) {newADate[2] = 30}
    }
    // 閏年
    if (BM === 2 && (newBDate[2] > 29)) {
      // eslint-disable-next-line no-mixed-operators
      if ((newBDate[0]%4 === 0) && (newBDate[0]%100 !== 0) || (newBDate[0]%400 === 0)) {newBDate[2] = 29}
      else newBDate[2] = 28
    }
    if (AM === 2 && (newADate[2] > 29)) {
      // eslint-disable-next-line no-mixed-operators
      if ((newADate[0]%4 === 0) && (newADate[0]%100 !== 0) || (newADate[0]%400 === 0)) {newADate[2] = 29}
      else newADate[2] = 28
    }
    //値更新
    setBDate(newBDate)
    setADate(newADate)
    search()
  }

  //検索開始
  const search = () => {
    //初期の検索ワード 空の時
    if (newTerm === '') {setNewTerm('ゆっくり ')}
    YSearch({ key: API,
      term: newTerm,
      maxResults:newMaxResults,
      order:newOrder,
      publishedBefore:`${Number(BDate[0])}-${Number(('0' + BDate[1]).slice(-2))}-${Number(('0' + BDate[2]).slice(-2))}T23:59:59Z`,
      publishedAfter:`${Number(ADate[0])}-${Number(('0' + ADate[1]).slice(-2))}-${Number(('0' + ADate[2]).slice(-2))}T00:00:00Z`,
    },
     (data) => { //データを受け取る
      setVideos(data) //動画保存
      setSelectedVideo(data[0]) 
    })
  }

  return(
    <div className = "App">
      <Header
        onKeywordChanged={onKeywordChangedHandler}
        onClick={() => check()}
        onChangeMR={onChangedMaxResultsHandler}
        onChangeOrder={onChangedOrderHandler}
        BDate={BDate}
        ADate={ADate}
        onChangeBDate = {(id,num) => onChangeBDateHandler(id,num)}
        onChangeADate = {(id,num) => onChangeADateHandler(id,num)}
      ></Header>
      <Body>
        <Video video={selectedVideo} video_list={videos.length}/>
        <List
          videos={videos}
          onVideoClicked={onVideoClickedHandler}
          selectedVideo={selectedVideo}
        />
      </Body>

    </div>
  )
}

export default App;
//タグの中では {関数名}または{()=>関数名()}
// headerからappのBDate,ADateHandler受け取るように
