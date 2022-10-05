import React from 'react'
import styled from 'styled-components'
import bookMarker1 from '../images/bookMarker1.svg'
import { Genres } from '../components/Genres'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 300px auto;
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
  }
  h2 {
    color: #94b49f;
    font-size: 2rem;
    font-weight: 400;
  }
`
const Description = styled.article`
  padding: 20px;
  box-shadow: 0 2px 15px 3px #8181814b;
  color: #f5efe6;
  grid-column: 2/-1;
  background-color: #94b49f;
  height: 100%;
  img {
    position: absolute;
    right: 50px;
    top: 0;
  }
  p {
    margin-top: 100px;
    width: 390px;
    margin-right: 100px;
    line-height: 1.5;
  }
`
const PhotoCentral = styled.div`
  grid-column: 1/-1;
  display: flex;
  align-content: center;
  align-items: center;
  height: 375px;
  margin-top: 90px;

  img {
    height: 100%;
    object-fit: cover;
    object-position: center 80%;
  }

  blockquote {
    width: 300px;
    font-size: 1.3rem;
    line-height: 2rem;
    position: relative;
    p {
      margin-top: 35px;
      text-align: right;
      width: 100%;
    }
    &::before {
      content: '"';
      left: -60px;
      top: 26px;
      font-size: 10rem;
      font-family: 'Dancing Script', cursive;
      color: #df7861;
      position: absolute;
    }
    &::after {
      content: '"';
      transform: rotate(180deg);
      font-size: 10rem;
      font-family: 'Dancing Script', cursive;
      color: #df7861;
      position: absolute;
      right: -40px;
      top: 60px;
    }
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
        <img src={bookMarker1} alt="" />
        <p>
          {' '}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere et
          nostrum consequuntur praesentium atque repellat rem totam corrupti hic
          blanditiis amet, soluta quidem, consectetur ea recusandae, nam
          reprehenderit fugit provident!
        </p>
      </Description>
      <PhotoCentral>
        <img src="../../images/bookHome1.png" alt="" />

        <blockquote>
          You know you’ve read a good book when you turn the last page and feel
          a little as if you have lost a friend.
          <p className="author">
            <em> Paul Sweeney</em>
          </p>
        </blockquote>
      </PhotoCentral>
      <Genres />
    </Wrapper>
  )
}
