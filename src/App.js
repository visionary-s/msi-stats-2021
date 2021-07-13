import React from 'react';
import { Cards, PlayerPicker, Tables } from './components';
import { Home } from './pages';
import styles from './App.module.css';
import { fetchPlayer, fetchGameStats } from './api';

class App extends React.Component{

  state = {
    playerList: [],
    gameStats: []
  };

  async componentDidMount() {
    const gameStats = await fetchGameStats();

    this.setState({gameStats : gameStats});
  }

  handlePlayerChange = async (player) => {
    // fetch player list data
    const fetchedPlayer = await fetchPlayer(player);
    // set player list data
    this.setState({playerList : player? fetchedPlayer : []});
  };

  render() {
    const { playerList, gameStats} = this.state;

    return (
      <div className={styles.container}>
        <h1>2021 Mid-Season Invitational</h1>
        <Home />
        <PlayerPicker handlePlayerChange={this.handlePlayerChange} />
        { playerList.length !== 0? (<Cards data={playerList}/>) : null }
        { Object.entries(gameStats).map((value) => <React.Fragment><Tables data={value}/></React.Fragment>)}
      </div>
    );
  }
}

export default App;
