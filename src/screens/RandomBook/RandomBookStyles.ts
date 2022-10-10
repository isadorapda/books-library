import styled, { keyframes } from 'styled-components'
import { Column } from '../../GlobalStyling/GlobalStyles'

export const Button = styled.button`
  margin: 90px 0;
  width: 250px;
  padding: 19px 15px;
  box-shadow: 2px 2px 9px 0.5px #8181817b;
  border-radius: 8px;
  border: transparent;
  background-color: #ecb390;
  color: #df7861;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.2s;
  &:hover {
    color: white;
    box-shadow: 4px 4px 5px 1px #8181817b;
  }
  @media screen and (min-width: 1536px) {
    width: 350px;
    padding: 16px;
    border-radius: 19px;
    font-size: 1.5rem;
  }
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    width: 200px;
    margin: 50px 0;
    font-size: 1.3rem;
    padding: 14px;
  }
  @media screen and (max-width: 819px) {
    margin: 40px 0;
    width: 180px;
    padding: 15px;
    border-radius: 14px;
    font-size: 1.1rem;
  }
`

const appear = keyframes`
  0%{
opacity: 1;
width: 0%;
  }

  100%{
    opacity: 1;
width: 100%;
  }
`

const slideIn = keyframes`
  0%{
    transform: translateX(-100%);
  }
  100%{
    transform: translateX(0%);
  }

`
export const RandomBookContainer = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 30px;
  @media screen and (max-width: 819px) {
    display: flex;
    flex-direction: column;
    width: 90vw;
  }
`
export const CoverContainer = styled(Column)`
  background-color: #94b49f;
  height: 500px;
  grid-column: 1;
  box-shadow: 4px 4px 5px 1px #8181817b;
  animation: ${slideIn} 0.5s ease-in;
  img {
    height: 70%;
    object-fit: cover;
    box-shadow: 0 0 10px 1px #8181817b;
  }
  @media screen and (max-width: 819px) {
    height: 300px;
    margin-bottom: 20px;
  }
`

export const BookInfo = styled(Column)`
  grid-column: 2;
  align-items: flex-start;
  margin-left: 30px;
  margin-bottom: 50px;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  animation: ${appear} 3s steps(60, end) forwards;

  h2 {
    margin-bottom: 20px;
    font-weight: 300;
    text-transform: capitalize;
    letter-spacing: 1px;
    animation-delay: 0.2s;
  }
  h3 {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #94b49f;
    margin-bottom: 20px;
    font-size: 1rem;
    animation-delay: 2s;
    width: 70%;
  }
  h4 {
    margin-bottom: 15px;
    animation-delay: 1.4s;
  }
  li {
    animation-delay: 1.6s;
    line-height: 20px;
    list-style: circle;
  }
  @media screen and (max-width: 819px) {
    margin: 0;
    padding-left: 10px;
    width: 100%;
    h2 {
      letter-spacing: 0.3px;
      font-size: 1.1rem;
      white-space: normal;
      width: 100%;
    }
    h3 {
      font-size: 0.8rem;
    }

    li {
      font-weight: 100;
    }
  }
`
