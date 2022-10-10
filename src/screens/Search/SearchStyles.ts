import styled from 'styled-components'

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 6px;
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 1px #adadad43;
  input {
    border: none;
    width: 87%;
    background-color: transparent;
    padding: 6px 8px;
  }
  @media screen and (min-width: 1536px) {
    height: 50px;
    border-radius: 15px;
    input {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    width: 50%;
  }
  @media screen and (max-width: 819px) {
    width: 90%;
  }
`

export const ButtonActionInput = styled.button<{ buttonColor: string }>`
  border-radius: 0 8px 8px 0;
  height: 100%;
  width: 12.5%;
  border: none;
  position: absolute;
  right: 0px;
  color: #fcf8e8;
  background-color: ${({ buttonColor }) => buttonColor};
  @media screen and (min-width: 1536px) {
    border-radius: 0 15px 15px 0;
  }
`

export const HeaderResults = styled.h4`
  margin: 30px 0;
  @media screen and (max-width: 819px) {
    text-align: center;
    font-size: 0.8rem;
  }
`
export const GridResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 350px;
  gap: 20px;
  width: 100%;
  margin-bottom: 50px;
  @media screen and (max-width: 819px) {
    grid-auto-rows: 300px;
    width: 90%;
  }
`
