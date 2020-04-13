import React from 'react';
import styles from './StartContestBar.module.sass';
import CONSTANTS from "../../constants";


const StartContestBar = () => {
    return (
        <div className={styles.paddingContainer}>
            <div className={styles.container}>
                <div>
                    Ready to get started? Launch a contest and start receiving submissions instantly.
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                            <img className={styles.lightBulb} src={`${CONSTANTS.STATIC_IMAGES_PATH}lightbulb-regular.svg`} alt="logo"/>
                            Start A Contest
                    </div>
                </div>
            </div>
        </div>);
};

export default StartContestBar;