import React, { useState } from 'react';
import axios from 'axios';

/**
 * 가상 서버 열기 
 * npx json-server ./data.json --port 4000
 */
const LoginForm = () => {
    const url = "http://localhost:4000/users";
    const [ loginInfo, setLoginInfo ] = useState({
        id : "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;   //e.target 태그의 name 속성과 value 속성 값 가져오기
        setLoginInfo({
            ...loginInfo,
            [name] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();  //submit 할 때 페이지 초기화 방지

        getUserInfo(); 
    }

    //axios로 server 유저정보 가져오기
    const getUserInfo = async() => {
        try{
            const response = await axios.get(url);
            const resDatas = response.data;
            
            //axios 데이터 가공
            const reformatData = resDatas.map(function(resData){
                let rObj = {};
                rObj["id"] = resData.id;
                rObj["password"] = resData.password;    //오브젝트형 {id: "sbh" , password: "123"}
                return rObj;
            });
            
            if(loginCheck(reformatData)){
                alert("login success~!");
            }else {
                alert("login Fail. password wrong!");
            }
        }catch(e){
            console.log("에러 발생:"+e);
        }
    }

    //로그인 정보가 맞는지 체크
    const loginCheck = (userInfo) =>{
        const objKeys = Object.keys(userInfo);  //키들만 모음 (자바스크립트 오브젝트형 키는 임의로 할당해줌, 내가 지정할 수 없나보다..)

        let resultBool = true;
        for(let objKey in objKeys){
            if(userInfo[objKey].id === loginInfo.id){   //아이디가 존재할 경우
                if(userInfo[objKey].password === loginInfo.password){
                    resultBool = true;
                    break;
                }else{  //패스워드 틀린 경우
                    resultBool = false;
                }
            }else { //아이디가 없는 경우
                resultBool = false;
            }
        }
        return resultBool;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name ="id" value={loginInfo.id} onChange={handleChange} ></input> <br/>
                <input type="password" name = "password" value={loginInfo.password} onChange={handleChange} ></input><br/>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default LoginForm;