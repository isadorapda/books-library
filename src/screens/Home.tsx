import React from 'react'
import styled from 'styled-components'

import { Genres } from '../components/Genres'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  width: 100vw;
`
const Header = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;
  grid-column: 1/1;
  width: 400px;
  h1 {
    font-weight: 200;
    font-family: 'Junge', serif;
  }
  h2 {
    font-family: 'Inconsolata', monospace;
    color: #7895b2;
    font-size: 2rem;
    font-weight: 400;
  }
`
const Description = styled.article`
  padding: 20px;
  box-shadow: 0 0 15px 1px #aaa9a992;
  color: #f5efe6;
  grid-column: 2/-1;
  background-color: #7895b2;
  height: 100%;
  p {
    margin-top: 100px;
    width: 390px;
    margin-right: 100px;
    font-family: 'Junge', serif;
    line-height: 1.5;
  }
`

export const Home: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <h1>Welcome to our</h1>
        <h2>digital book library</h2>
      </Header>
      <Description>
        <p>
          {' '}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere et
          nostrum consequuntur praesentium atque repellat rem totam corrupti hic
          blanditiis amet, soluta quidem, consectetur ea recusandae, nam
          reprehenderit fugit provident!
        </p>
      </Description>
      <Genres />
    </Wrapper>
  )
}
