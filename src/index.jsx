import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Color from 'color';

import styles from './main.css';

import ColorBox from './components/ColorBox';
import TrainedBox from './components/TrainedBox';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.colors = [
      { r: 158, g: 184, b: 224 },
      { r: 26, g: 214, b: 184 },
      { r: 84, g: 61, b: 74 },
      { r: 189, g: 199, b: 219 },
      { r: 79, g: 89, b: 105 },
      { r: 255, g: 252, b: 0 },
      { r: 255, g: 107, b: 133 }
    ];

    this.state = {
      enough: false,
      trainingSet: []
    };
  }

  randomColor = () => {
    const { trainingSet } = this.state;
    const idx = trainingSet.length;

    return this.colors[idx];
  }

  handleSelect = (input, output) => {
    this.setState((prevState) => ({
      ...prevState,
      trainingSet: prevState.trainingSet.concat([{ input: Color(input).object(), output: { [output]: 1 } }])
    }));
  }

  handleEnoughClick = (event) => {
    this.setState({ enough: true });
    event.preventDefault();
  }

  render() {
    const color = Color(this.randomColor());
    const { trainingSet, enough } = this.state;

    return (
      <div className={styles.main}>
        {trainingSet.length < 7 && <div className={styles.boxes}>
          <ColorBox onSelect={this.handleSelect} backgroundColor={color.rgb().toString()} fontColor="white" />
          <ColorBox onSelect={this.handleSelect} backgroundColor={color.rgb().toString()} fontColor="black" />
        </div>}
        {trainingSet.length >= 7 && !enough && <button onClick={this.handleEnoughClick}>Достаточно</button>}
        {enough && <div className={styles.box}><TrainedBox trainData={trainingSet} /></div>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
