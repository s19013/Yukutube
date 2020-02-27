import React, {useState, useEffect} from 'react';
import Header from './components/Header/Header'
import Body from './components/Body/Body'
// import Item from './components/Video/Item/Item'
import List from './components/Video/List/List'
import Video from './components/Video/Video'
import YSearch from 'youtube-api-search';
const API = 'AIzaSyDFkF-hZoXzaxi9niUPD9xBfnn1wbrKOEY'

const App = () => {
  const d = new Date()
  const [newTerm,setNewTerm] = useState("")
  const [newMaxResults,setNewMaxResults] = useState(5)
  const [newOrder,setNewOrder] = useState("relevance")
  // const [BDate,setBDate] = useState(d.getDate())
  // const [ADate,setADate] = useState(d.getDate())
  // const [BMonth,setBMonth] = useState(d.getMonth())
  // const [AMonth,setAMonth] = useState(d.getMonth())
  // const [BYear,setBYear] = useState(d.getFullYear())
  // const [AYear,setAYear] = useState(d.getFullYear()-10)
  const [BDate,setBDate] = useState([d.getFullYear(),d.getMonth()+1,d.getDate()])
  const [ADate,setADate] = useState([2005,1,1])
  const [videos,setVideos] = useState([])
  const [selectedVideo,setSelectedVideo] = useState(null)
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
  const onVideoClickedHandler = (video) => {
    setSelectedVideo(video)
  }

  const onKeywordChangedHandler = (keyword) => {
    setNewTerm("ゆっくり " + keyword)
  }

  const onChangedMaxResultsHandler = (MRvalue) => {
    setNewMaxResults(MRvalue)
  }

  const onChangedOrderHandler = (O) => {
    setNewOrder(O)
  }

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
// 日付
  // const onChangedBDate = (BD) => {
  //   setBDate(BD)
  // }
  //
  // const onChangedADate = (AD) => {
  //   setADate(AD)
  // }
  //
  // const onChangedBMonth = (BM) => {
  //   setBMonth(BM)
  // }
  //
  // const onChangedAMonth = (AM) => {
  //   setAMonth(AM)
  // }
  //
  // const onChangedBYear = (BY) => {
  //   setBYear(BY)
  // }
  //
  // const onChangedBYear = (BY) => {
  //   setBYear(BY)
  // }

  const check = () => {
    var newBDate = BDate
    var newADate = ADate
    const BM = newBDate[1]
    const AM = newADate[1]
    if (BM === 1 || BM === 3 || BM === 5 || BM === 7 || BM === 8 || BM === 10 || BM === 12) {
      if (newBDate[2] === 31) {
        newBDate[2] = 30
      }
    }
    if (AM === 1 || AM === 3 || AM === 5 || AM === 7 || AM === 8 || AM === 10 || AM === 12) {
      if (newADate[2] === 31) {
        newADate[2] = 30
      }
    }
    // 閏年
    if (BM === 2 && (newBDate[2] > 29)) {
      if ((newBDate[0]%4 === 0) && (newBDate[0]%100 !== 0) || (newBDate[0]%400 === 0)) {
        newBDate[2] = 29
      }
      else newBDate[2] = 28
    }
    if (AM === 2 && (newADate[2] > 29)) {
      if ((newADate[0]%4 === 0) && (newADate[0]%100 !== 0) || (newADate[0]%400 === 0)) {
        newADate[2] = 29
      }
      else newADate[2] = 28
    }
    //
    setBDate(newBDate)
    setADate(newADate)
    search()
  }

  const search = () => {
    if (newTerm === '') {
      setNewTerm('ゆっくり ')
    }
    YSearch({ key: API,
      term: newTerm,
      maxResults:newMaxResults,
      order:newOrder,
      publishedBefore:`${Number(BDate[0])}-${Number(('0' + BDate[1]).slice(-2))}-${Number(('0' + BDate[2]).slice(-2))}T23:59:59Z`,
      publishedAfter:`${Number(ADate[0])}-${Number(('0' + ADate[1]).slice(-2))}-${Number(('0' + ADate[2]).slice(-2))}T00:00:00Z`,
    },
     (data) => {
      setVideos(data)
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