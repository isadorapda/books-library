import React from 'react'
import styled from 'styled-components'

const FavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
  position: relative;
  h1 {
    margin-top: 100px;
  }
`

export const Favorites: React.FC = () => {
  return (
    <FavWrapper>
      <h1>My Favorite Books</h1>
    </FavWrapper>
  )
}
