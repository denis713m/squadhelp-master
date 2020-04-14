import React from 'react';
import Header from '../../components/Header/Header';
import styles from './TransactionsPage.module.sass';


const TransactionsPage = () => {
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <h1>All transactions</h1>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>money</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>ЗАРАБОТАЛ</td>
                        <td>+350$</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>ПОТРАТИЛ</td>
                        <td>-350$</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>ЗАРАБОТАЛ</td>
                        <td>+450$</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsPage;