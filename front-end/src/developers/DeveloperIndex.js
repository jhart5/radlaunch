import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import styled from 'styled-components'

import map from '../artifacts/deployments/map.json'
import NavBar from '../NavBar'
import developersImage from '../assets/developersAndFounders.svg'

import Keanu from '../assets/keanu.svg'

const H2 = styled.h2`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  text-align: left;
  font-size: 3rem;
  display: inline-block;
  margin: 2rem 0;
`

const LaunchButton = styled.button`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-sizing: border-box;
  border-radius: 2rem;
  width: 25rem;
  height: 4rem;
  cursor: pointer;
`

const HeaderDiv = styled.div`
  border-bottom: 1px solid #4e3fce;
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
`

const DeveloperIndex = ({
  imgSource,
  titleText,
  myWeb3,
  setMyWeb3,
  accounts,
  setAccounts,
  chainId,
  setChainId,
}) => {
  return (
    <div>
      <NavBar
        imgSource={developersImage}
        titleText={'Developers - Create and Manage your project launches'}
        myWeb3={myWeb3}
        setMyWeb3={setMyWeb3}
        accounts={accounts}
        setAccounts={setAccounts}
        chainId={chainId}
        setChainId={setChainId}
      />
      <main style={{ padding: '0 10%' }}>
        <HeaderDiv>
          <H2>My Launches</H2>
          <Link
            to={'/IbcoSetup'}
            style={{
              textDecoration: 'none',
              height: '4rem',
              marginTop: '1.5rem',
            }}
          >
            <LaunchButton>Launch a New Project</LaunchButton>
          </Link>
        </HeaderDiv>
        <div style={{ padding: '2rem 2% 0 2%' }}>
          <IcoDashboard
            myWeb3={myWeb3}
            setMyWeb3={setMyWeb3}
            accounts={accounts}
            setAccounts={setAccounts}
          />
        </div>
      </main>
    </div>
  )
}

const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
`
const ProjectTitle = styled.h3`
  font-family: 'Questrial', sans-serif;
  font-size: 2.3rem;
  font-weight 400;
  margin-top: 0.4rem;
  text-align: left
`

const Column1 = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
`

const Column2 = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
`

const Button = styled.button`
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.7rem;
  width: 100%;
  font-family: 'Questrial', sans-serif;
  font-size: 1.5rem;
`
const Span = styled.span`
  font-family: 'Questrial', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 2rem;
  text-align: left;
`

const ProjectImage = styled.img`
  width: 80%;
`

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;
`

const Td = styled.td`
  font-family: 'Questrial', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.2rem;
`
const Tr = styled.tr`
  height: 3rem;
  border-top: 1px solid #e6ddff;
  &:first-of-type {
    border: none;
  }
`

const TableContainer = styled.div`
  border: 1px solid #e6ddff;
  border-radius: 10px;
  width: 100%;
`

const AboutSection = styled.div`
  border-top: 1px solid #4e3fce;
  margin-top: 2rem;
`

const AboutTitle = styled.h4`
  font-family: 'Questrial', sans-serif;
  font-size: 1.8rem;
  font-weight 400;
  margin: 1rem 0;
  text-align: left
`

const EditButton = styled.button`
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  height: 2.5rem;
  margin: 0.7rem 0 0 2rem;
  width: 6rem;
`
const AboutText = styled.p`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  text-align: left;
  font-size: 1.1rem;
`

const IcoDashboard = ({ myWeb3, setMyWeb3, accounts, setAccounts }) => {
  const [factory, setFactory] = useState()
  const [tokenContract, setTokenContract] = useState()
  const [launchedICOs, setLaunchedICOs] = useState([])

  async function loadInitialFactory() {
    // if (chainId <= 42){
    //     return
    // }
    const dyn = await loadContract('42', 'DynPoolFactory')
    setFactory(dyn)
    return dyn
  }

  async function loadContract(chain, contractName) {
    // Load a deployed contract instance into a web3 contract object
    // const {web3} = this.state

    // Get the address of the most recent deployment from the deployment map
    let address
    try {
      address = map[chain][contractName][0]
    } catch (e) {
      console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
      return undefined
    }

    // Load the artifact with the specified address
    let contractArtifact
    try {
      contractArtifact = await import(`../artifacts/deployments/${chain}/${address}.json`)
    } catch (e) {
      console.log(
        `Failed to load contract artifact "../artifacts/deployments/${chain}/${address}.json"`,
      )
      return undefined
    }
    console.log(contractArtifact)

    return new myWeb3.eth.Contract(contractArtifact.abi, address)
  }

  async function events(factory) {
    return await factory.getPastEvents('IBCODeployed', { fromBlock: 1 }).then((response) => {
      return response
    })
  }

  useEffect(async () => {
    if (myWeb3 === undefined || accounts === undefined) {
      return
    } else {
      const factory = await loadInitialFactory()
      const eventsArray = await events(factory)
      console.log(eventsArray)
      console.log(accounts[0])
      eventsArray.forEach((event) => {
        console.log(event.returnValues['0'])
        console.log(accounts[0] === event.returnValues['0'])
        if (event['returnValues']['0'] === accounts[0]) {
          setLaunchedICOs((launchedICOs) => launchedICOs.concat([event.returnValues]))
        }
      })
      console.log('x')
    }
  }, [myWeb3, accounts])

  return (
    <>
      {launchedICOs.length ? <div>{launchedICOs[0]['0']}</div> : null}
      <DashboardContainer>
        <Column1>
          <ProjectTitle>ICO Launch</ProjectTitle>
          <ProjectImage src={Keanu} />
        </Column1>
        <Column1>
          <Button>View on Etherscan</Button>
          <Span>Verified status: Verified</Span>
          <Span>Access: Public</Span>
          <Button style={{ marginTop: '2rem' }}>Abort Launch</Button>
          <Span>Please note: launches can only be aborted before the start date.</Span>
        </Column1>
        <Column2>
          <TableContainer>
            <Table>
              <Tr>
                <Td>Contract address:</Td>
              </Tr>
              <Tr>
                <Td>Start/end date:</Td>
              </Tr>
              <Tr>
                <Td>Tokens for sale:</Td>
              </Tr>
              <Tr>
                <Td>Amount raised:</Td>
              </Tr>
              <Tr>
                <Td>Number of investors:</Td>
              </Tr>
              <Tr>
                <Td>Minimum raise amount:</Td>
              </Tr>
              <Tr>
                <Td>Your contribution:</Td>
              </Tr>
            </Table>
          </TableContainer>
        </Column2>
        <Column2>
          <TableContainer>
            <Table>
              <Tr>
                <Td>Token address:</Td>
              </Tr>
              <Tr>
                <Td>Token name:</Td>
              </Tr>
              <Tr>
                <Td>Total token supply:</Td>
              </Tr>
              <Tr>
                <Td>Holders:</Td>
              </Tr>
              <Tr style={{ height: '9rem' }}>
                <Td>
                  Launch type: Dynamic swap pool
                  <br />
                  <br />
                  In this type of launch if the amount raised is above the minimum raise amount. You
                  will be allocated a percentage of the tokens for sale equivalent to your
                  percentage contribution of the Amount raised. If the minimum raise amount is not
                  reached you can reclaim your ETH.{' '}
                </Td>
              </Tr>
            </Table>
          </TableContainer>
        </Column2>
      </DashboardContainer>
      <AboutSection>
        <div style={{ display: 'flex' }}>
          <AboutTitle>About the Project:</AboutTitle>
          <EditButton>Edit</EditButton>
        </div>
        <AboutText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AboutText>
      </AboutSection>
    </>
  )
}

export default DeveloperIndex
