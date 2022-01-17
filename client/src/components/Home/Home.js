import React from 'react';
import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import {FatLink} from "../sharedStyles";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      photo
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`

const SPhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 960px;
`
const SPhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`

const SUsername = styled(FatLink)`
  margin-left: 10px;
`

const SPhotoFile = styled.img`
  min-width: 100%;
`

const Home = () => {
  
  const {data} = useQuery(FEED_QUERY)
  
  return (
    <div>
      {data?.seeFeed?.map(photo =>
        <SPhotoContainer key={photo.id}>
          <SPhotoHeader>
            <img src={photo.user.avatar} alt="avatar"/>
            <SUsername>{photo.user.username}</SUsername>
          </SPhotoHeader>
          <SPhotoFile src={photo.photo} alt={photo.id} />
        </SPhotoContainer>)}
    </div>
  );
};

export default Home;
