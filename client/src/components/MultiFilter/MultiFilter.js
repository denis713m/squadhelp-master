import React from 'react';
import {connect} from 'react-redux';
import styles from './MultiFilter.module.sass';
import classNames from 'classnames';
import queryString from 'query-string';
import CONSTANTS from '../../constants';
import {
    setNewCreatorFilter
} from '../../actions/actionCreator';


const MultiFilter = (props) => {

    const parseParamsToUrl = (creatorFilter) => {
        const obj = {};
        Object.keys(creatorFilter).forEach(el => {
            if (creatorFilter[el])
                obj[el] = creatorFilter[el];
        });
        props.history.push('/Dashboard?' + queryString.stringify(obj));
    };
    
    const changePredicate = ({name, value}) => {
        const {creatorFilter} = props;
        props.newFilter({[name]: value === 'Choose industry' ? null : value});
        parseParamsToUrl({...creatorFilter, ...{[name]: value === 'Choose industry' ? null : value}});
    };
    


    const renderIndustryType = () => {
        const array = [];
        const {creatorFilter} = props;
        const {industry} = props.dataForContest.data;
        array.push(<option key={0} value={null}>Choose industry</option>);
        industry.forEach((industry, i) => array.push(<option key={i + 1} value={industry}>{industry}</option>));
        return (
            <select onChange={({target}) => changePredicate({
                name: 'industry',
                value: target.value
            })} value={creatorFilter.industry} className={styles.input}>
                {array}
            </select>
        );
    };

    const     renderSelectType = () => {
        const array = [];
        const {creatorFilter} = props;
        CONSTANTS.types.forEach((el, i) => !i || array.push(<option key={i - 1} value={el}>{el}</option>));
        return (
            <select onChange={({target}) => changePredicate({
                name: 'typeIndex',
                value: CONSTANTS.types.indexOf(target.value)
            })} value={CONSTANTS.types[creatorFilter.typeIndex]} className={styles.input}>
                {array}
            </select>
        );
    };

    
    const {creatorFilter} = props;
    const {isFetching} = props.dataForContest;

    return (
        <div className={styles.filterContainer}>
            <span className={styles.headerFilter}>Filter Results</span>
            <div className={styles.inputsContainer}>
                <div
                    onClick={() => changePredicate({name: 'ownEntries', value: !creatorFilter.ownEntries})}
                    className={classNames(styles.myEntries, {[styles.activeMyEntries]: creatorFilter.ownEntries})}>My
                    Entries
                </div>
                <div className={styles.inputContainer}>
                    <span>By contest type</span>
                    {renderSelectType()}
                </div>
                <div className={styles.inputContainer}>
                    <span>By contest ID</span>
                    <input type="text" onChange={({target}) => changePredicate({
                        name: 'contestId',
                        value: target.value
                    })} name='contestId'
                           value={creatorFilter.contestId} className={styles.input}/>
                </div>
                {!isFetching && <div className={styles.inputContainer}>
                    <span>By industry</span>
                    {renderIndustryType()}
                </div>}
                <div className={styles.inputContainer}>
                    <span>By amount award</span>
                    <select onChange={({target}) => changePredicate({
                        name: 'awardSort',
                        value: target.value
                    })} value={creatorFilter.awardSort} className={styles.input}>
                        <option value='desc'>Descending</option>
                        <option value='asc'>Ascending</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    const {contestsList, dataForContest} = state;
    return {...contestsList, dataForContest};
};

const mapDispatchToProps = (dispatch) => {
    return {
        newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MultiFilter);