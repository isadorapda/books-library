import styled from 'styled-components'

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  padding: 20px 0;
  text-transform: uppercase;
  background-color: white;
  box-shadow: 0 0.5px 15px 3px #8181814b;
  img {
    position: absolute;
    left: 50px;
    cursor: pointer;
  }
  @media screen and (min-width: 1536px) {
    height: 70px;
    img {
      left: 60px;
      width: 170px;
    }
  }
  @media screen and (min-width: 820px) and (max-width: 1023px) {
    img {
      left: 40px;
      width: 100px;
    }
  }
  @media screen and (max-width: 819px) {
    img {
      left: 50px;
      width: 100px;
    }
  }
`
export const NavLinks = styled.div<{ isMenuOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: right;
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
  cursor: pointer;
  a {
    padding-right: 90px;
    transition: all 0.2s;
  }
  a:hover {
    color: #94b49f;
  }
  @media screen and (min-width: 1536px) {
    margin-right: 100px;
    a {
      padding-right: 100px;
      font-size: 1.3rem;
    }
  }
  @media screen and (min-width: 820px) and (max-width: 1200px) {
    a {
      padding-right: 40px;
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 819px) {
    flex-direction: column;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 60px;
    background-color: white;
    z-index: 50;
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
    visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
    transition: opacity 0.7s ease;
    text-align: center;
    a {
      margin-right: 0;
      padding: 30px 0;
      width: 100%;
      font-size: 1.2rem;
      transition: opacity 0.7s ease;
    }
    a:hover {
      background-color: #94b49f;
      color: white;
    }
  }
`

export const ToggleBtn = styled.div`
  display: none;
  z-index: 60;
  @media screen and (max-width: 819px) {
    position: absolute;
    display: block;
    height: 16px;
    width: 30px;
    top: 22px;
    right: 50px;
    cursor: pointer;
  }
`
export const Line = styled.span<{ isMenuOpen: boolean }>`
  position: absolute;
  display: inline-block;
  height: 2px;
  width: 100%;
  border-radius: 10px;
  background-color: #94b49f;
  transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
  transition-duration: 500ms;
  &.line1 {
    left: 0;
    transform: ${({ isMenuOpen }) => (isMenuOpen ? 'rotate(45deg)' : null)};
    top: ${({ isMenuOpen }) => (isMenuOpen ? '13px' : '0')};
  }
  &.line2 {
    top: 7px;
    left: 0;
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '1')};
  }
  &.line3 {
    bottom: 0px;
    left: 0;
    transform: ${({ isMenuOpen }) => (isMenuOpen ? 'rotate(-45deg)' : null)};
    top: ${({ isMenuOpen }) => (isMenuOpen ? '13px' : null)};
  }
`
