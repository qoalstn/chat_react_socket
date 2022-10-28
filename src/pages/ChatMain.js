import React, { useEffect, useState, useRef, useMemo } from 'react';
import './Main.css';
import axios from 'axios'
import socketio, { io } from 'socket.io-client';
import Chat from '../components/Chat';

function ChatMain({ socket, accessToken }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [type, setType] = useState('');
  const [token, setToken] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgList, setMsgList] = useState([]);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const messagesEnd = useRef()
  const infinityScroll = useRef()

  useEffect(
    () => {
      // getRoomList()

      // console.log('현재토큰 : ', accessToken);
      // // // socket = socketio('http://localhost:8080/chat', {
      // socket = socketio('http://localhost:8080', {
      //   transports: ['websocket'],
      //   auth: { token: accessToken }
      // })
      socket.connect();
      socket.emit('join', { msg: 'start!' });

      socket.on('join', (data) => {
        console.log('Join room success : ', data)

        // const msgList = data.chats.map((e) => {
        //   return {
        //     idx: e.idx,
        //     type: e.type,
        //     user: e.user_name,
        //     message: e.msg,
        //   };
        // })
        // console.log('msg list : ', msgList)

        setRoom(data.room_id)
        setMsgList([{
          type: 'message-row your-message',
          message: data.msg,
        }]);
        // setName(data.user.nickname || data.user.name)
        // setCussor(msgList[0].idx)
        // this.forceUpdate();
      })

      socket.on('chat', (data) => {

        console.log('Conversation : ', data);
        let msg = {
          type: 'message-row other-message',
          user: data.username,
          message: data.msg,
        };

        console.log('msgList : ', msgList)
        setMsgList((msglist) => [...msglist, msg]);
        console.log('after msgList : ', msgList)
      });


      return () => {
        socket.disconnect();
      }
    }, [])

  // // useEffect(() => {
  // //   initiateSocketConnection(window.localStorage.getItem('login-token'));

  // //   joinRoom()
  // //   // axios({
  // //   //   method: 'get',
  // //   //   url: 'http://localhost:3111/chat/list',
  // //   //   headers: { Authorization: `Bearer ${localStorage.getItem('login-token')}` }
  // //   // }).then((res) => {
  // //   //   console.log('get room list :', res.data)
  // //   //   setRoomList(res.data)
  // //   // }).catch((e) => {
  // //   //   console.log('error! : ', e.message)
  // //   // })

  // //   return () => {
  // //     disconnectSocket();
  // //   }
  // // }, []);

  // // useEffect(
  // //   () => {
  // //     console.log('현재토큰 : ', token);
  // //     socket = socketio('http://localhost:8080', {
  // //       transports: ['websocket'],
  // //       // auth: { token }
  // //     })
  // //     socket.connect();

  // //     return () => {
  // //       socket.disconnect();
  // //     }
  // //   }, [token])


  // useEffect(() => {
  //   messagesEnd.current.scrollIntoView({ behavior: "smooth" }); // 업데이트시 
  //   // scroll event listener 등록
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     // scroll event listener 해제
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [msgList]);

  // // 스크롤 이벤트 핸들러
  // const handleScroll = () => {
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const clientHeight = document.documentElement.clientHeight;
  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     // 페이지 끝에 도달하면 추가 데이터를 받아온다
  //     // fetchMoreInstaFeeds();
  //     // console.log('cussor : ', cussor)
  //     socket.emit('history', { room_id: room, cussor })
  //   }
  // };

  // function joinRoom(room_id) {
  //   console.log('조인');
  //   const data = {
  //     product_idx: 6,
  //     room_id: room_id || room,
  //     msg: 'start'
  //   };

  //   socket.emit('join', data);
  // };

  // msgText.focus(); // 포커스 설정 시, 여러 윈도우창 중 맨 앞으로 보내진다.
  const clickSend = (e) => {
    e.preventDefault(); // 1. a 태그를 눌러도 href링크로 이동하지 않는다. 2. submit 버튼을 눌러도 새로고침 되지 않는다.(결과는 출력)

    let msg = {
      type: 'message-row you-message',
      user: name,
      message: msgText,
    };

    console.log('before send msg data : ', msgList);
    setMsgList([...msgList, msg]);
    console.log('set msg : ', msgList)

    const sendData = {
      room_id: room,
      user_type: type,
      username: name,
      msg: msgText,
      sys_msg: '',
      readed: '',
      user_confirm: '',
      created_at: new Date(),
      del: '',
      file_path: '',
      file_orgname: '',
    };

    socket.emit('chat', sendData);

    setMsgText('');
  };

  // socket.on('history', (data) => {
  //   console.log('History : ', data)

  //   setFetching(true); // 추가 데이터를 로드하는 상태로 전환

  //   const history = data.chats.map((e) => {
  //     return {
  //       idx: e.idx,
  //       type: e.type,
  //       user: e.user_name,
  //       message: e.msg,
  //     };
  //   }).reverse()

  //   setMsgList([...history, ...msgList]);
  //   setCussor(history[0].idx)
  //   setFetching(false); // 추가 데이터 로드 끝
  // })

  // const close = () => {
  //   console.log('close :')
  //   socket.disconnect()
  //   socket.emit('leave room', room);
  // };

  const login = (e) => {
    if (e.key == 'Enter') {
      console.log('enter!!', token)
      axios({
        method: 'post',
        url: 'http://localhost:3400/auth/login',
        data: { email, password }
      }).then((res) => {
        console.log('get room list :', res.data)
        // setRoomList(res.data)
        setToken(res.data.tokens.access_token)
        localStorage.setItem('login-token', res.data.tokens.access_token)
      }).catch((e) => {
        console.log('error! : ', e.message)
      })
    }

  }

  return (
    <div>
      {/* <div>
        <button onClick={close}>leave room</button>
      </div>
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={login}
          placeholder="PASSWORD"
        />
        <button onClick={getRoomList}>login and RoomList</button>
      </div> */}

      <div className='chat-body-container'>
        <div style={{ margin: 30 }}>
        </div>
        <div className="main-container">
          <div class="chat-container">
            <div class="chat-header">
              <div class="logo">
                <i class="fa fa-child"></i>
                <h3>Messenger</h3>
              </div>
              <span> Room : </span>
              <p id="room-name">{room}</p>
              <span> User : </span>
              <p id="your-name">{name}</p>
            </div>

            <div class="chat-section">
              <div class="main-wrapper">
                <div class="chat-content">
                  <div ref={infinityScroll} class="message">
                    {msgList.map((i, index) => {
                      return (
                        <Chat
                          key={index}
                          type={i.type}
                          user={i.user}
                          message={i.message}
                          time={i.time}
                        />
                      );
                    })}
                    <div ref={messagesEnd} ></div>
                  </div>
                </div>
                <form class="msg-tex">
                  <input
                    type="text"
                    name="msg"
                    id="msg"
                    placeholder="Message Here.."
                    autoComplete="off"
                    value={msgText}
                    onChange={(e) => {
                      setMsgText(e.target.value);
                    }}
                  />
                  <button id="btn-send" onClick={clickSend}>
                    <i class="fa fa-paper-plane">send</i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ChatMain;





























