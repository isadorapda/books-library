import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
`

type Props = {
  children: React.ReactNode
}
export const GlobalWrapper: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
