import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUsers } from '../api/users';

function Home() {
  const [targetId, setTargetId] = useState("");
  const [targetPw, setTargetPw] = useState("");

  const { isLoading, isError, data } = useQuery("Users", getUsers)
  const queryClient = useQueryClient();

  const mutation = useMutation(getUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries("Users")
    }
  })

  // 로딩, 에러가 났을 때
  if (isLoading) {
    return <h1>로딩중입니다...</h1>
  }
  if (isError) {
    return <h1>오류가 발생했습니다...</h1>
  }

  const onChangeTargetId = (e) => {
    setTargetId(e.target.value)
  }

  const onChangeTargetPw = (e) => {
    setTargetPw(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault();
  }

  const user = data.find((user) => user.targetId === targetId)

  console.log(user)

  // 로그인 버튼 눌렀을 때
  const loginButton = () => {
    if (!user || user.targetPw !== targetPw) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다")
    } else {
      alert("로그인 완료!")
    }
  }

  return (
    <StDivWrap>
      <StDivTitle>
        <StH1Titld>로그인 하기</StH1Titld>
      </StDivTitle>
      <div>
        <div>
          <form onSubmit={onSubmit}>
            <StPInput>아이디</StPInput>
            <StInput
              type="text"
              value={targetId}
              onChange={onChangeTargetId}
            />

            <StPInput>비밀번호</StPInput>
            <StInput
              type="password"
              value={targetPw}
              onChange={onChangeTargetPw}
              autoComplete="off"
            />
            <div>
              <StBtn onClick={loginButton}>로그인</StBtn>
            </div>
          </form>
        </div>
        <div>
          <Link to={"/signup"}><StBtn>회원가입</StBtn></Link>
        </div>
      </div>
    </StDivWrap>
  )
}

export default Home

const StDivWrap = styled.div`
  margin: 30px;
`
const StDivTitle = styled.div`
  margin-top: 100px;
`
const StH1Titld = styled.h1`
  font-size: 50px;
`
const StPInput = styled.p`
  font-size: 20px;
  font-weight: 700;
`
const StInput = styled.input`
  width: 95%;
  height: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`
const StBtn = styled.button`
  width: 98%;
  margin-top: 20px;
  height: 40px;
  border: 1px solid #2484BF;
  background-color: #2484BF;
  border-radius: 10px;
  color: white;
`