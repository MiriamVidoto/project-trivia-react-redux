import React from 'react';
import Questions from '../components/Questions';
import Header from '../Components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}
export default Game;
