import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ColorBox.css';

export default class ColorBox extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    fontColor: PropTypes.oneOf(['black', 'white']),
    onSelect: PropTypes.func
  }

  static defaultProps = {
    fontColor: 'black'
  }

  handleClick = () => {
    const { backgroundColor, fontColor, onSelect } = this.props;

    if(typeof onSelect === 'function') {
      onSelect(backgroundColor, fontColor);
    }
  }

  render() {
    const { backgroundColor, fontColor } = this.props;

    return (
      <div onClick={this.handleClick} style={{ backgroundColor, color: fontColor }} className={styles.box}>Лучше видно</div>
    )
  }
}