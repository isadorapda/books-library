import styled, { keyframes } from 'styled-components'
import { MdFavorite } from 'react-icons/md'
import { IoIosArrowUp } from 'react-icons/io'

export const BookItem = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding: 20px 6px;
  background-color: white;
  box-shadow: 0 0.5px 15px 3px #8181814b;
  font-family: 'Junge', serif;
  font-weight: 400;
  text-align: center;

  img {
    max-height: 150px;
    max-width: 70%;
    box-shadow: 0 0 8px 2px #6968687b;
    object-fit: cover;
  }
  @media screen and (max-width: 819px) {
    img {
      max-height: 140px;
    }
  }
`
export const BookTitleHeader = styled.h3`
  position: absolute;
  top: 200px;
  padding: 0 6px;
  max-height: 50px;
  max-width: 90%;
  overflow: auto;
  font-size: 0.87rem;
  @media screen and (max-width: 819px) {
    top: 175px;
  }
`
export const AuthorsNames = styled.p`
  position: absolute;
  top: 260px;
  padding: 0 6px 10px 6px;
  max-width: 90%;
  overflow: auto;
  max-height: 30px;
  font-size: 0.87rem;
  color: #94b49f;
  @media screen and (max-width: 819px) {
    position: relative;
    top: 70px;
  }
`
export const IconToLike = styled(MdFavorite)`
  position: absolute;
  right: 10px;
  top: 20px;
  cursor: pointer;
`
export const IconLiked = styled(IconToLike)`
  color: #df7861;
`

const opacity = keyframes`
  0%{
   opacity: 0.2;
  }
  25%{
    opacity: 0.5;
  }
  50%{
    opacity: 0.7;
  }

  100%{
    opacity:1;
  }
`

export const HiddenContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 10px 15px 20px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fcf8e8;
  opacity: 1;
  box-shadow: 0 0.5px 15px 3px #8181814b;
  animation: ${opacity} 0.3s ease-in;
`
export const arrowAction = keyframes`
  0%, 100%{
    transform: translateY(10px);
  }
  50%{
    transform: translateY(-10px);
  }
`
export const ShowBookInfo = styled(IoIosArrowUp)`
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  width: 50px;
  height: 30px;
  color: #94b49f;
  font-family: 'Carrois Gothic', sans-serif;
  font-size: 0.6rem;
  &:hover {
    animation: ${arrowAction} 0.9s ease-in-out infinite;
  }
`
export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  color: black;
  line-height: 1.5;
  font-weight: 400;
  max-height: 90%;
  overflow: auto;
  font-size: 0.9rem;
  li {
    list-style: circle;
  }
`
export const CloseBookInfo = styled.span`
  position: absolute;
  right: 50%;
  bottom: 8px;
  color: #df7861;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: rotate(180deg);
  }
`
