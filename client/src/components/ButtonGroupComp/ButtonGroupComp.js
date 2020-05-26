import React, { useEffect } from 'react';
import styles from './ButtonGroupComp.module.sass';

const buttons = [
    {
        answer: 'Yes',
        description: 'The Domain should exactly match the name'
    },
    {
        answer: 'Yes',
        description: 'But minor variations are allowed (Recommended)'
    },
    {
        answer: 'No',
        description: 'I am only looking for a name, not a Domain'
    },
];

const ButtonGroupComp = () => {
    const [selectIndex, setIndex] = React.useState(0);

    const selectItem = (item) => {
        setIndex(item)
    };

    useEffect(() => {

    });

    const getButtons = () => {
        const btnArray = [];
        buttons.forEach((item, index) => {
            const classNameContainer = index === selectIndex ? styles.container + ' ' + styles.selectedContainer : styles.container;
            const classNameYesNo = index === selectIndex ? styles.yesNo + ' ' + styles.selectedYesNo : styles.yesNo;
            btnArray.push(
                <div key={index} className={classNameContainer} tabIndex='0' onClick={() => selectItem(index)}>
                    <div className={classNameYesNo}>{item.answer}</div>
                    <h5 className={styles.description}>{item.description}</h5>
                </div>
            )
        });
        return btnArray;
    };


    return (
        <div className={styles.groupContainer}>
            <div className={styles.groupHeader}>
                <div className={styles.groupHeaderTitle}>Do you want a matching domain (.com URL) with your name?</div>
                <div className={styles.groupHeaderDescrip}>If you want a matching domain, our platform will only accept
                    those name suggestions where the domain is available. (Recommended)
                </div>
            </div>
            <div className={styles.btnWraper}>
                {getButtons()}
            </div>
        </div>
    );
};

export default ButtonGroupComp;