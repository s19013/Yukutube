import React, {useState, useEffect} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Header = (props) => {
  const [keyword,setKeyword] = useState('')//検索キーワード
  const today = props.BDate//今日の日付
  useEffect(() => {
    makeMaxResultPullDown()
    makeYearPullDown()
    makeMonthPullDown()
    makeDatePullDown()
    setPullDown()
    console.log(today);
  },[])

// プルダウンを作る
  const makeYearPullDown = () => {
    for (var i = today[0]; i > 2004 ; i --) {
      //開始日
      var select = document.getElementById("BYear");
      var option = document.createElement("option");
      option.text = i
      option.value = i
      select.appendChild(option)

      //終了日
      var select = document.getElementById("AYear");
      var option = document.createElement("option");
      option.text = i
      option.value = i
      select.appendChild(option)
    }
  }
  const makeMonthPullDown = () => {
    for (var i = 1; i <= 12 ; i ++) {
      //開始日
      var select = document.getElementById("BMonth");
      var option = document.createElement("option");
      option.text = i
      option.value = i
      select.appendChild(option)

      //終了日
      var select = document.getElementById("AMonth");
      var option = document.createElement("option");
      option.text = i
      option.value = i
      select.appendChild(option)
    }
  }

  const makeDatePullDown = () => {
    for (var i =1 ; i <= 31 ; i ++) {
      //開始日
      var select = document.getElementById("BDate");
      var option = document.createElement("option");
      option.text = i
      option.value = i
      select.appendChild(option)

      //終了日
      var select = document.getElementById("ADate");
      var option = document.createElement("option");
      option.text = i
      option.value = i
      select.appendChild(option)
    }
  }
//
  const setPullDown = () => {
    document.getElementById("AYear").value = 2005
    // document.getElementById("AYear").value = after[0]
    // document.getElementById("AMonth").options[after[1]-1].selected = true
    // document.getElementById("ADate").options[after[2]-1].selected = true
    document.getElementById("BYear").value = today[0]
    document.getElementById("BMonth").options[today[1]-1].selected = true
    document.getElementById("BDate").options[today[2]-1].selected = true
  }
// #sonota
  const makeMaxResultPullDown = () => {
    for (var i = 5; i <= 50 ; i += 5) {
      var select = document.getElementById("MRsize");
      var option = document.createElement("option");
      option.text = i
      option.value = i
      select.appendChild(option)
    }
  }

   //入力欄の文字を受け取る
  const onInputChangeHandler = (e) => {
    setKeyword(e.target.value)
    props.onKeywordChanged(e.target.value)
  }

  //maxResultの変更を受け取る
  const onChangedMRHandler =() => {
    props.onChangeMR(document.getElementById("MRsize").value)
  }

  //
  const onChangedOrderHandler =() => {
    props.onChangeOrder(document.getElementById("Order").value)
  }

  //並び替えの変更
  const onChangedBDateHandler = (id) => {
    // eslint-disable-next-line default-case
    switch (id) {
      case 0:
        props.onChangeBDate(id,document.getElementById("BYear").value) 
      break;
      case 1:
        props.onChangeBDate(id,document.getElementById("BMonth").value)
      break;
      case 2:
        props.onChangeBDate(id,document.getElementById("BDate").value)
      break;
    }
  }

  const onChangedADateHandler = (id) => {
    if (id === 0) {
      props.onChangeADate(id,document.getElementById("AYear").value)
    }
    if (id === 1) {
      props.onChangeADate(id,document.getElementById("AMonth").value)
    }
    if (id === 2) {
      props.onChangeADate(id,document.getElementById("ADate").value)
    }
  }

  return(
    <div className="Header">
      <div className="search">
        <h1 className="logo">YukuTube</h1>
      <TextField
        className="TextField"
        id="standard-basic"
        label="検索枠"
        onChange = {onInputChangeHandler}
        value = {keyword}
         />
       <Button className="Button" onClick={props.onClick} variant="contained" color="secondary">検索</Button>

      </div>
      <div className="MR">
        <p>表示数</p>
        <select id="MRsize" onChange={onChangedMRHandler}></select>
      </div>
      <details>
        <summary>もっと細かく</summary>
          <div className="Sorting">
            <p>並び替え</p>
            <select id="Order" onChange={onChangedOrderHandler}>
              <option value="relevance">関連順(標準)</option>
              <option value="rating">高評価順</option>
              <option value="date">最近アップされた順</option>
              <option value="title">アルファベット順</option>
              <option value="viewCount">再生回数順</option>
            </select>
          </div>
          <div className="label">
            <p>日時指定</p>
          </div>
          <div className="Before">
              <select id="BYear" onChange={(id) => onChangedBDateHandler(0)}></select>
              <p>年</p>
              <select id="BMonth" onChange={(id) => onChangedBDateHandler(1)}></select>
              <p>月</p>
              <select id="BDate" onChange={(id) => onChangedBDateHandler(2)}></select>
              <p>日から</p>
          </div>
          <div className="After">
            <select id="AYear" onChange={(id) => onChangedADateHandler(0)}></select>
            <p>年</p>
            <select id="AMonth" onChange={(id) => onChangedADateHandler(1)}></select>
            <p>月</p>
            <select id="ADate" onChange={(id) => onChangedADateHandler(2)}></select>
            <p>日まで</p>
          </div>
      </details>
    </div>
  )
}

export default Header;
