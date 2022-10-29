import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllMatches, getAllPlayers } from '../fetcher'
import background from "../Images/red2.png";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const matchColumns = [
  {
    title: 'Tourney',
    dataIndex: 'tourney',
    key: 'tourney',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Surface',
    dataIndex: 'surface',
    key: 'surface',
  },
  {
    title: 'Winner',
    dataIndex: 'winner',
    key: 'winner',
    render: (text, row) => <a href={`/players?id=${row.WinnerId}`}>{text}</a> 
    
  },
  {
    title: 'Loser',
    dataIndex: 'loser',
    key: 'loser',   
    render: (text, row) => <a href={`/players?id=${row.LooserId}`}>{text}</a> 
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',    
  },

];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }

  leagueOnChange(value) {
    getAllMatches(null, null, value).then(res => {
      this.setState({ matchesResults: res.results })
    })
  }

  componentDidMount() {
    getAllMatches(null, null, 'All').then(res => {
      this.setState({ matchesResults: res.results })
    })

    getAllPlayers().then(res => {
      console.log(res.results)
      console.log("äsdsad")
      console.log(res.results)
      this.setState({ playersResults: res.results })
    })

 
  }


  render() {

    return (
      <div style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', position: 'absolute', top: '0', bottom: '0', width: '100%'}}>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3 style={{ color:'white' }}>Recent Matches</h3>
              <Table dataSource={this.state.matchesResults} columns={matchColumns} pagination={{ pageSize:50 }} scroll={{ y: 560 }}/>
        </div>
      </div>
    )
  }

}

export default HomePage
