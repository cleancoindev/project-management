import React, { Component } from "react";
import { PublicAddress, Button } from 'rimble-ui';
import styles from './Project.module.scss';

export default class Counter extends Component {


  render()  {
    const { project } = this.props;
    return (
      <div className={styles.counter}>
        <h3> Your Project Contract Instance </h3>
        <div className={styles.label}>
          getNumberOfTotalProposer
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => this.props.getNumberOfTotalProposer()}
            size="small">getNumberOfTotalProposer</Button>
        </div>
        <div className={styles.label}>
          <p>{project}</p>
        </div>
      </div>
    );
  }
}
