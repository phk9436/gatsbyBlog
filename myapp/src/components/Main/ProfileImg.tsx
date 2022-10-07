import React from "react"
import styled from "@emotion/styled"

// 자신이 원하는 프로필 이미지 링크로 설정해주세요.=

const ProfileImageWrapper = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;
  background-color: #888;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

function ProfileImage() {
  return <ProfileImageWrapper src="" alt="Profile Image" />
}

export default ProfileImage
