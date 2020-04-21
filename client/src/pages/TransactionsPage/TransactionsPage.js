import React from 'react';
import Header from '../../components/Header/Header';
import styles from './TransactionsPage.module.sass';
import {
    getTransactions,
    getTotalTransactions
} from '../../actions/actionCreator';
import {connect} from 'react-redux';




class TransactionsPage extends React.Component {


    componentDidMount() {
        this.props.getTransactions();
        this.props.getTotalTransactions();
    }

    getUserTransaction = () => {

        const userTransactions = [];

        this.props.transactions.forEach((item, index) =>
        {
            const typeOperation = item.typeOperation === 'INCOME';
             userTransactions.push(
                <tr key={index}>
                    <td className={styles.transactionTableData}>{index+1}</td>
                    <td className={styles.transactionTableData}>
                        {typeOperation ? 'ЗАРАБОТАЛ' : 'ПОТРАТИЛ'}</td>
                    <td className={styles.transactionTableData}>
                        {`${typeOperation ? '+' : '-'}${item.sum}$`}</td>
                </tr>
            )
        });
        return userTransactions;
    };





    render() {
        const total = {};
        this.props.total.forEach((item) => {
           total[item.typeOperation] = item.total
        });
        return (
            <div>
                <Header/>
                <div className={styles.container}>
                    <div className={styles.totalContainer}>
                        <div className={styles.total}>{`ЗАРАБОТАЛ: ${
                            typeof total.INCOME === 'undefined' ?
                                0
                                :
                                total.INCOME
                        } $`}</div>
                        <div className={styles.total}>{`ПОТРАТИЛ: ${
                            typeof total.CONSUMPTION === 'undefined' ?
                                0
                                :
                                total.CONSUMPTION
                        } $`}</div>
                    </div>
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
                        {this.props.transactions.length!==0 ?
                            this.getUserTransaction()
                            :
                            <tr>
                                <td className={styles.noTransaction} colSpan={3}>You don't have any transactions</td>
                                </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }


}


const mapStateToProps = (state) => {
    return state.transactions;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactions: () => dispatch(getTransactions()),
        getTotalTransactions: () => dispatch(getTotalTransactions())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);