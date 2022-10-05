import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'

const NavBar = styled.nav`
  width: 100vw;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 101;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 20px 0;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  background-color: white;
  box-shadow: 0 0.5px 15px 3px #8181814b;
  img {
    position: absolute;
    left: 50px;
  }
  a {
    margin: 0 50px;
    transition: all 0.2s;
  }
  a:hover {
    color: #94b49f;
  }
`

export const NavigationBar: React.FC = () => {
  return (
    <NavBar>
      <img src={logo} alt="Open Library Redesign Logo" />
      <Link to={'/'}>Home</Link>
      <Link to={'search-book'}>Search</Link>
      <Link to={'random-book'}>Random Book</Link>
      <Link to={'favorites'}>Favorites</Link>
    </NavBar>
  )
}
