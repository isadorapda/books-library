import styled, { createGlobalStyle, keyframes } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inconsolata', monospace;
    }
    a {
  text-decoration: none;
  color: black;
}
button{
    cursor: pointer;
}
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 50px;
  margin: 100px auto 50px;
  @media screen and (max-width: 960px) {
    padding: 0 30px;
  }
`
export const MainHeading = styled.h1`
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
  font-size: 2.2rem;
  font-family: 'Junge', serif;
  font-weight: 200;
  @media screen and (min-width: 1536px) {
    font-size: 3rem;
  }
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 819px) {
    font-size: 1rem;
  }
`
export const Heading = styled.h2<{ color?: string }>`
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  color: ${({ color }) => (color ? color : 'black')};
  @media screen and (min-width: 1536px) {
    font-size: 1.8rem;
  }
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 819px) {
    font-size: 1.2rem;
  }
`

export const Row = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width ? width : '100%')};
`

export const Column = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width ? width : '100%')};
`
const flash = keyframes`
  0%{
    background-color: #ecb390;
    box-shadow: 32px 0 #ecb390, -32px 0 #df7861;
  }
  50%{
    background-color: #df7861;
    box-shadow: 32px 0 #ecb390, -32px 0  #ecb390;
  }
  100%{
    background-color: #ecb390;
    box-shadow: 32px 0 #df7861, -32px 0  #df7861; 
  }
`
export const LoadingBook = styled.span`
  margin-top: 50px;
  &.loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #df7861;
    box-shadow: 32px 0 #df7861, -32px 0 #df7861;
    position: relative;
    animation: ${flash} 0.5s ease-out infinite alternate;
  }
`
