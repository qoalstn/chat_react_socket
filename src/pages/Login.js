import React, { useEffect, useState, useRef } from 'react';
import './Main.css';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Login({ onClickLogin, handleInputMail, handleInputPw, inputId, inputPw }) {

    // const [inputId, setInputId] = useState('')
    // const [inputPw, setInputPw] = useState('')
    const loginRef = useRef()

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    // const handleInputMail = (e) => {
    //     setInputId(e.target.value)
    // }

    // const handleInputPw = (e) => {
    //     setInputPw(e.target.value)
    // }

    // // 페이지 렌더링 후 가장 처음 호출되는 함수
    // useEffect(() => {
    //     axios.get('/user_inform/login')
    //         .then(res => console.log(res))
    //         .catch()
    // },
    //     // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    //     [])

    // const onClickLogin = (e) => {
    //     if (e.key == 'Enter') {
    //         // console.log('enter!!', token)
    //         axios({
    //             method: 'post',
    //             url: 'http://localhost:3400/auth/login',
    //             data: { email: inputId, password: inputPw }
    //         }).then((res) => {
    //             console.log('get room list :', res.data)
    //             // setRoomList(res.data)
    //             // setToken(res.data.tokens.access_token)
    //             window.localStorage.setItem('login-token', res.data.tokens.access_token)
    //             console.log('로그인 성공');

    //         }).catch((e) => {
    //             console.log('error! : ', e.message)
    //         })
    //     }

    // }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>EMAIL : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputMail} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} onKeyUp={onClickLogin} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin} >Login</button>
                <Link to='/chat/test'>챗테스트</Link>
                <Link to='/'>이동</Link>
                <div></div>
            </div>
            <div>

                {/* <Link to='/'>챗테스트</Link> */}
            </div>
        </div>
    )
}

export default Login;