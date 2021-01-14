import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import developersImage from './assets/developersAndFounders.svg'
import investorsImage from './assets/investorsImage.svg'
import DeveloperIndex from './developers/DeveloperIndex'
import './landing.css'

const AnimatedDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: black;
`

const H2 = styled.h2`
  font-family: 'Questrial', sans-serif;
  font-size: 3rem;
  font-weight: 400;
  text-align: center;
  margin-top: 5rem;
`

const Landing = (props) => {
  const [investorHover, setInvestorHover] = useState(false)
  const [developerHover, setDeveloperHover] = useState(false)
  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'space-evenly',
        height: '100%',
        flex: '0 1 auto',
        width: '100%',
      }}
    >
      <Link
        to={'/developer'}
        style={{ textDecoration: 'none', width: '50%' }}
        onMouseEnter={() => setDeveloperHover(true)}
        onMouseLeave={() => setDeveloperHover(false)}
      >
        <AnimatedDiv className='developer-panel'>
          <img src={developersImage} />
          {developerHover ? (
            <DeveloperHoverText show={true} />
          ) : (
            <DeveloperHoverText show={false} />
          )}
          <H2>Developers and Founders</H2>
        </AnimatedDiv>
      </Link>
      <Link
        to={'/investor'}
        style={{ textDecoration: 'none', width: '50%' }}
        onMouseEnter={() => setInvestorHover(true)}
        onMouseLeave={() => setInvestorHover(false)}
      >
        <AnimatedDiv className='investor-panel'>
          <img src={investorsImage} />
          {investorHover ? <InvestorHoverText show={true} /> : <InvestorHoverText show={false} />}
          <H2>Investors</H2>
        </AnimatedDiv>
      </Link>
    </div>
  )
}

const InvestorHoverText = ({ show }) => {
  const componentClasses = ['hover-text']

  if (show) {
    componentClasses.push('show')
  }

  return (
    <div className={componentClasses.join(' ')}>
      Be early investors in projects launched through RADLAUNCH.
    </div>
  )
}
const DeveloperHoverText = ({ show }) => {
  const componentClasses = ['hover-text', 'dev-text']

  if (show) {
    componentClasses.push('show')
  }

  return (
    <div className={componentClasses.join(' ')}>
      Choose and launch from our secure fundraising contracts to launch your tokens, all you need is
      an ERC20 Token and Ether.{' '}
    </div>
  )
}

export default Landing
