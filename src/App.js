import React from 'react';
import { Cards, PlayerPicker } from './components';
import { Home } from './pages';
import styles from './App.module.css';
import { fetchPlayer } from './api';

class App extends React.Component{

  state = {
    data: []
  }

  handlePlayerChange = async (player) => {
    // fetch data
    const fetchedPlayer = await fetchPlayer(player);
    // set data
    this.setState({data : fetchedPlayer});
  }

  render() {
    const { data } = this.state;
    console.log("passed:", data);

    return (
      <div className={styles.container}>
        <Home />
        <PlayerPicker handlePlayerChange={this.handlePlayerChange} />
        {data.length !== 0? (<Cards data={data}/>) : null}
      </div>
    );
  }
}

export default App;
