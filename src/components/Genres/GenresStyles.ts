import styled from 'styled-components'
import { Container, MainHeading } from '../../GlobalStyling/GlobalStyles'

export const SubjectsWrapper = styled(Container)`
  grid-column: 1/-1;
  margin: 0 auto;
  padding: 0 10px;
`
export const Title = styled(MainHeading)`
  margin: 50px 0;
  padding: 0 30px;
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    margin: 40px 0;
  }
  @media screen and (max-width: 819px) {
    margin: 40px 0;
  }
`
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 450px;
  row-gap: 50px;
  width: 100%;
  @media screen and (max-width: 819px) {
    grid-auto-rows: 300px;
    row-gap: 0px;
  }
`
export const BooksGrid = styled.div`
  grid-template-columns: 100%;
  grid-template-rows: 100px 350px;
  width: 100%;
  @media screen and (max-width: 819px) {
    grid-template-rows: 60px 200px;
  }
`
export const SubjectName = styled.div`
  position: relative;
  grid-row: 1;
  height: auto;
  margin-bottom: 50px;

  h3 {
    color: #fcf8e8;
    font-family: 'Junge', serif;
    position: absolute;
    z-index: 10;
    top: 5px;
    left: 30px;
    height: 100%;
  }
  img {
    z-index: 9;
    left: -60px;
    top: 0;
    position: absolute;
  }
  @media screen and (max-width: 819px) {
    margin-bottom: 7px;
    h3 {
      position: relative;
      font-size: 0.8rem;
      background-color: #ecb390;
      height: max-content;
      width: 100%;
      left: 0;
      top: 0;
      padding: 10px;
    }
    img {
      opacity: 0;
    }
  }
`
export const SectionGenres = styled.section`
  display: flex;
  align-items: center;
  margin: 0 auto;
  overflow: scroll;
  grid-row: 2;
  width: 96%;
  @media screen and (max-width: 819px) {
    width: 100%;
  }
`
export const SingleBookArticle = styled.article`
  height: 350px;
  min-width: 200px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 0.5px 15px 3px #8181814b;
  margin: 20px 15px;
  padding: 5px 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    height: 200px;
    width: 100%;
    object-fit: contain;
    padding: 3px;
    margin: 20px 0;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 819px) {
    box-shadow: 0 1.6px 7px 1px #8181814b;
    height: 200px;
    min-width: 140px;
    margin: 10px;
    img {
      height: 110px;
      margin: 10px 0;
    }
    p {
      font-size: 0.8rem;
    }
  }
`
