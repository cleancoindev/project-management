import React, { Component } from "react";
import { PublicAddress, Button } from 'rimble-ui';
import styles from './Project.module.scss';

export default class Counter extends Component {

  render()  {
    const { project, number_of_total_proposer } = this.props;
    return (
      <div className={styles.counter}>
        <h3> Your Project Contract Instance </h3>
        <div className={styles.label}>
          <p>getNumberOfTotalProposer</p>
          {number_of_total_proposer}
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => this.props.getNumberOfTotalProposer()}
            size="small">getNumberOfTotalProposer</Button>
          <Button
            onClick={() => this.props.createProposer("Taro Suzuki", "0xfed9ead1d8b7d7e7563903c3120c9b58e5c5d5aa")}
            size="small">createProposer</Button>
        </div>
        
      </div>
    );
  }
}
