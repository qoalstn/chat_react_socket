import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './pages/Main.js';
import Login from './pages/Login.js';
import axios from 'axios'
import socketio, { io } from 'socket.io-client';
import ChatMain from './pages/ChatMain.js'

let socket;

function App() {
  const [accessToken, setAccessToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [socket, setSocket] = useState()

  const onClickLogin = (e) => {
    // if (e.key == 'Enter') {
    // console.log('enter!!', token)
    axios({
      method: 'post',
      url: 'http://192.168.0.9:3400/auth/login',
      data: { email, password }
    }).then((res) => {
      console.log('get tokens :', res.data)
      console.log('access : ', res.data.tokens.access_token)
      // setRoomList(res.data)
      // setToken(res.data.tokens.access_token)
      localStorage.setItem('login-token', res.data.tokens.access_token)
      setAccessToken(res.data.tokens.access_token)
      return res.data.tokens.access_token
    }).then((token) => {
      console.log('accessToken : ', token);
      console.log('local token : ', localStorage.getItem('login-token'));
      setSocket(
        socketio('http://192.168.0.9:8080', {
          transports: ['websocket'],
          auth: { token }
        })
      )
    }).catch((e) => {
      console.log('error! : ', e.message)
    })
    // }
  }

  const handleInputMail = (e) => {
    setEmail(e.target.value)
  }

  const handleInputPw = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} >
            <Login inputPw={password} inputId={email} onClickLogin={onClickLogin} handleInputMail={handleInputMail} handleInputPw={handleInputPw}></Login>
          </Route>
          <Route exact path="/chat/test" component={ChatMain} >
            <ChatMain socket={socket} accessToken={accessToken}></ChatMain>
          </Route>
          <Route exact path="/" component={Main} >
            <Main socket={socket} accessToken={accessToken}></Main>
          </Route>
          {/* <Route path="/pay" component={PaymentTest} /> */}
        </Switch>
      </Router>
    </div >
  );
}

export default App;
