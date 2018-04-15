import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import brain from 'brain.js';
import Color from 'color';

import CircularColor from 'react-circular-color';

import styles from './ColorBox.css';

export default class TrainedBox extends PureComponent {
  static propTypes = {
    trainData: PropTypes.array
  }

  constructor(props) {
    super(props);

    const network = new brain.NeuralNetwork();
    network.train(props.trainData);

    const backgroundColor = this.randomColor();
    const fontColor = network.run(backgroundColor);

    this.network = network.toFunction();

    this.state = {
      backgroundColor: Color(backgroundColor).rgb().toString(),
      fontColor: this.getDominantColor(fontColor)
    }
  }

  getDominantColor = (blackAndWhite) => {
    return blackAndWhite.white > blackAndWhite.black ? 'white' : 'black';
  }

  randomColor() {
    return {
      r: Math.round(Math.random() * 255),
      g: Math.round(Math.random() * 255),
      b: Math.round(Math.random() * 255)
    };
  }

  handleColorChange = (color) => {
    const backgroundColor = Color(color).rgb().object();
    const fontColor = this.network(backgroundColor);

    this.setState({
      backgroundColor: Color(backgroundColor).rgb().toString(),
      fontColor: this.getDominantColor(fontColor)
    });
  }

  render() {
    const { backgroundColor, fontColor } = this.state;

    return (
      <div>
        <CircularColor size={150} onChange={this.handleColorChange} />
        <div style={{ backgroundColor, color: fontColor }} className={styles.box}>Отлично видно</div>
      </div>
    )
  }
}