import React from 'react'
import bookMarker1 from '../../images/bookMarker1.svg'
import { Genres } from '../../components/Genres'
import {
  HomeWrapper,
  HomeHeader,
  H1,
  H2,
  Description,
  PhotoCentral,
  Quote,
} from './HomeStyles'

export const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <HomeHeader>
        <H1>Welcome to our</H1>
        <H2 color={'#94b49f'}>digital book library</H2>
      </HomeHeader>
      <Description>
        <img src={bookMarker1} alt="" />
        <p>
          {' '}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere et
          nostrum consequuntur praesentium atque repellat rem totam corrupti hic
          blanditiis amet, soluta quidem, consectetur ea recusandae, nam
          reprehenderit fugit provident!
        </p>
      </Description>
      <PhotoCentral>
        <img src="../../images/bookHome1.png" alt="" />
        <Quote>
          <blockquote>
            You know you’ve read a good book when you turn the last page and
            feel a little as if you have lost a friend.
            <p className="author">
              <em> Paul Sweeney</em>
            </p>
          </blockquote>
        </Quote>
      </PhotoCentral>
      <Genres />
    </HomeWrapper>
  )
}
