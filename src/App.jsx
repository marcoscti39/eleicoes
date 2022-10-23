import React from 'react'

export default function App() {
  const [electionData, setElectionData] = React.useState([])
  const [test, setTest] = React.useState([])


  const formatNumber = (number) =>{
    const formatter = new Intl.NumberFormat().format(number)
    return formatter
  }

  React.useEffect(() =>{
    const interval = setInterval(() =>{
      const getData = async () =>{
        const response = await fetch("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json")
        const data = await response.json()
        setTest(data)
      }
      console.log('oi')
      getData()
    }, 1000)

    return () => clearInterval(interval)
  },[])

  // React.useEffect(() =>{
  //   const getData = async () =>{
  //     const response = await fetch("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json")
  //     const data = await response.json()
  //     setElectionData(data)
  //   }
  //   getData()

  // },[])
  return (
    <>
    <div className="container">
      {
        test?.cand?.map((election, index) =>{
          return (
          <div key={index} className="card">
            <div className="name">{election.nm}</div>
            <div className="party">{election.cc.length > 30 ? `${election.cc.substring(0, 30)}...`: election.cc }</div>
            <div className="votos-container">
              <div className="votos-text">Número de votos: </div>
              <div>{formatNumber(election.vap)}</div>

            </div>
            <div className="percentage">{election.pvap} %</div>
  
            <div className="progress-bar" style={{width: `${election.pvap.replace(',', '.')}%`}}></div>
          </div>
          )
        })
      }

    </div>

    </>
  )
}
