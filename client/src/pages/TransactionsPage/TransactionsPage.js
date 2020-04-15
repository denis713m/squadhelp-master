import React from 'react';
import Header from '../../components/Header/Header';
import styles from './TransactionsPage.module.sass';


const TransactionsPage = () => {
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <h1>All transactions</h1>
                <table className={styles.transactionTable}>
                    <thead>
                    <tr>
                        <th className={styles.transactionTableHead}>id</th>
                        <th className={styles.transactionTableHead}>description</th>
                        <th className={styles.transactionTableHead}>money</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={styles.transactionTableData}>1</td>
                        <td className={styles.transactionTableData}>ЗАРАБОТАЛ</td>
                        <td className={styles.transactionTableData}>+350$</td>
                    </tr>
                    <tr>
                        <td className={styles.transactionTableData}>2</td>
                        <td className={styles.transactionTableData}>ПОТРАТИЛ</td>
                        <td className={styles.transactionTableData}>-350$</td>
                    </tr>
                    <tr>
                        <td className={styles.transactionTableData}>3</td>
                        <td className={styles.transactionTableData}>ЗАРАБОТАЛ</td>
                        <td className={styles.transactionTableData}>+450$</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsPage;