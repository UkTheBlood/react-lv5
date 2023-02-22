import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addUser } from '../api/users';

function Signup() {
  const [targetId, setTargetId] = useState("");
  const [targetPw, setTargetPw] = useState("");

  const navigate = useNavigate();
  const moveToHome = () => {
    navigate("/")
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

  const queryClient = useQueryClient();
  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("")
    }
  })

  const addButton = () => {
    if(targetId !== "" && targetPw !== "") {
      const newUser = {
        targetId: targetId,
        targetPw: targetPw,
      }
      alert("회원가입 완료!")

      setTargetId("")
      setTargetPw("")
      mutation.mutate(newUser);
      moveToHome();
    } else {
      alert("아이디와 비밀번호를 모두 입력해주세요!")
    }
  }

  return (
    <StDivWrap>
      <StDivTitle>
        <StH1Titld>회원가입 하기</StH1Titld>
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
              <StBtn onClick={addButton}>회원가입</StBtn>
            </div>
          </form>
        </div>
        <div>
          <Link to={"/"}><StBtn>로그인하기</StBtn></Link>
        </div>
      </div>
    </StDivWrap>
  )
}

export default Signup

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
  border: 1px solid #1DA1F2;
  background-color: #1DA1F2;
  border-radius: 10px;
  color: white;
`