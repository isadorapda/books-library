import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../images/logo.svg'
import { NAV_DATA } from '../../constants/navData'
import { NavBar, NavLinks, ToggleBtn, Line } from './NavigationBarStyles'

export const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  function onClickHandler() {
    setIsMenuOpen(!isMenuOpen)
  }
  function scrollTo(id: string) {
    const element = document.getElementById(id)
    element?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  function closeMenu(id: string, to: string) {
    if (id && location.pathname === '/') {
      scrollTo(id)
    }
    navigate(`${to}`)
    setIsMenuOpen(false)
  }
  return (
    <NavBar>
      <img
        src={logo}
        alt="Open Library Redesign Logo"
        onClick={() => navigate('/')}
      />
      <NavLinks isMenuOpen={isMenuOpen}>
        {NAV_DATA.map((data) => (
          <Link
            to={data.to}
            key={data.id}
            onClick={() => closeMenu(data.id, data.to)}
          >
            {data.title}
          </Link>
        ))}
      </NavLinks>
      <ToggleBtn onClick={onClickHandler}>
        <Line isMenuOpen={isMenuOpen} className="line1"></Line>
        <Line isMenuOpen={isMenuOpen} className="line2"></Line>
        <Line isMenuOpen={isMenuOpen} className="line3"></Line>
      </ToggleBtn>
    </NavBar>
  )
}
