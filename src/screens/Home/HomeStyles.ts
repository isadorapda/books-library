import styled from 'styled-components'
import { Column, Heading, MainHeading } from '../../GlobalStyling/GlobalStyles'

export const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: 300px auto;
  height: 100vh;
  width: 100vw;

  @media screen and (min-width: 820px) and (max-width: 1023px) {
    grid-template-rows: 270px auto;
  }
  @media screen and (max-width: 819px) {
    display: flex;
    flex-direction: column;
  }
`
export const HomeHeader = styled(Column)`
  margin-top: 90px;
  margin-left: 50px;
  grid-column: 1/1;
  width: 85%;
  @media screen and (min-width: 1536px) {
    margin-top: 210px;
    margin-left: 60px;
  }
  @media screen and (max-width: 819px) {
    margin-left: 0px;
    width: 100%;
  }
`
export const H1 = styled(MainHeading)`
  text-align: left;
  margin-bottom: 1rem;

  font-size: 1.8rem;
  @media screen and (min-width: 1536px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 819px) {
    text-align: center;
  }
`
export const H2 = styled(Heading)`
  text-align: left;
  font-size: 1.8rem;
  @media screen and (min-width: 1536px) {
    font-size: 2.6rem;
  }
  @media screen and (max-width: 819px) {
    text-align: center;
  }
`
export const Description = styled.article`
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
  @media screen and (min-width: 1536px) {
    width: 65vw;
    img {
      height: 300px;
    }
    p {
      font-size: 1.3rem;
      width: 570px;
      margin-right: 0px;
      padding-left: 50px;
      line-height: 1.5;
    }
  }
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    margin-left: 30px;

    p {
      margin-top: 140px;
      font-size: 0.8rem;
      width: 60%;
      line-height: 1.1;
    }
  }
  @media screen and (max-width: 819px) {
    position: relative;
    height: 200px;
    img {
      position: absolute;
      top: -35px;
    }
    p {
      margin-top: 50px;
      margin-left: 30px;
      font-size: 0.8rem;
      width: 70%;
      line-height: 1.1;
    }
  }
`
export const Quote = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;

  blockquote {
    width: 20rem;
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
      left: -5rem;
      top: 1rem;
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
      right: -2rem;
      top: 5rem;
    }
  }
  @media screen and (min-width: 1536px) {
    blockquote {
      left: -200px;
    }
  }
  @media screen and (min-width: 820px) and (max-width: 1280px) {
    blockquote {
      left: -40px;
      width: 160px;
      font-size: 1rem;
      line-height: 1.2rem;
      p {
        margin-top: 30px;
        text-align: right;
        width: 100%;
      }
      &::before {
        left: -40px;
        top: 10px;
        font-size: 5rem;
      }
      &::after {
        font-size: 5rem;
        right: -30px;
        top: 90px;
      }
    }
  }
  @media screen and (max-width: 819px) {
    width: 50%;
    height: 170px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #df7861b5;
    border-radius: 0px 0px 50% 0px;
    blockquote {
      font-size: 0.8rem;
      line-height: 1rem;
      padding: 15px 5px 0;
      width: 80%;

      p {
        margin: 10px auto;
        text-align: center;
      }
      &::before {
        color: white;
        top: 19px;
        font-size: 3rem;
        left: -20px;
      }
      &::after {
        color: white;
        font-size: 3rem;
        right: -10px;
        top: 95px;
      }
    }
  }
`
export const PhotoCentral = styled.div`
  grid-column: 1/-1;
  display: flex;
  align-content: center;
  align-items: center;
  height: 375px;
  margin-top: 90px;
  position: relative;

  img {
    height: 100%;
    object-fit: cover;
    object-position: center 80%;
  }
  @media screen and (min-width: 1536px) {
    height: 520px;
  }
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    height: 270px;
    margin-top: 50px;
  }
  @media screen and (max-width: 819px) {
    flex-direction: column;
    height: 200px;
    margin-top: 20px;
    background: left / cover no-repeat url('../../images/bookHomeOriginal.png');
    position: relative;
    img {
      opacity: 0;
    }
  }
`
