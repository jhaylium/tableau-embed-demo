import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Sidebar from './Sidebar'
import TopNav from './navigation/TopNav';
import TableauEmbed from './components/TableauEmbed';
import { Layout, Content, Row, Col } from 'antd';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default function App() {
  
  const [vizDate, setvizDate] = useState('Jan 2021');
  const [enteredUrl, setEnteredUrl] = useState("https://dbi-app03.databrains.com/t/Fiserv/views/Monthly-TestJavascript/BarCharts");
  const [timeFrame, setTimeFrame] = useState("Monthly")
  const [embedUrls, setEmbedURls] = useState({"daily_url": "https://dbi-app03.databrains.com/t/Fiserv/views/Daily-TestJavascript/BarCharts",
                                              "monthly_url": "https://dbi-app03.databrains.com/t/Fiserv/views/Monthly-TestJavascript/BarCharts",
                                              "url": ""})

  const dateSubmitHandler = enteredDate =>{
    setTimeFrame(enteredDate['timeSpan'])
    console.log(enteredDate['timeSpan'])
    console.log(enteredDate)
    console.log(enteredUrl)
    console.log(timeFrame);
    setvizDate(enteredDate['date']);
    if (embedUrls.url === ""){
      if (enteredDate['timeSpan'].includes('Daily')){
        console.log(embedUrls['daily_url'])
        setEnteredUrl(embedUrls['daily_url'])
      } else {
          console.log(embedUrls['monthly_url'])
          setEnteredUrl(embedUrls['monthly_url'])
        } 
    } else {
      console.log(`Using URL ${embedUrls['url']}`)
      setEnteredUrl(embedUrls['url'])
    }
    
  };

  const urlClickHandler = url =>{
    console.log('fun');
  }

  const dashboardSelectHandler = new_url =>{
    setEmbedURls(new_url)    
    if (new_url.url === ""){
      if (timeFrame.includes("Monthly")) {
        setEnteredUrl(new_url.monthly_url)
      } else {
        setEnteredUrl(new_url.daily_url)
      }
    } else{
      setEnteredUrl(new_url.url)
    }
  }




  return (
    <div>
      <TopNav onDateSubmit={ dateSubmitHandler }  onUrlClick={urlClickHandler}/>
      <Row>
        <Col span={4}>
          <Sidebar onDashboardSelect={ dashboardSelectHandler } />
        </Col>
      <Col span={20}>
        <TableauEmbed 
          date={ vizDate }
          url={ enteredUrl }
          timeFrame={ timeFrame }/>
      </Col>
      </Row>
    </div>
  )
}

// export default App;
