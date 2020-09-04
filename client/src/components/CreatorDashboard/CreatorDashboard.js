import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    getContestsForCreative,
    clearContestList,
    setNewCreatorFilter,
    getDataForContest
} from '../../actions/actionCreator';
import ContestsContainer from '../../components/ContestsContainer/ContestsContainer';
import ContestBox from "../ContestBox/ContestBox";
import styles from './CreatorDashboard.module.sass';
import queryString from 'query-string';
import isEqual from 'lodash/isEqual';
import TryAgain from '../../components/TryAgain/TryAgain';
import MultiFilter from '../MultiFilter/MultiFilter';

class CreatorDashboard extends React.Component {


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.location.search !== this.props.location.search) {
            this.parseUrlForParams(nextProps.location.search);
        }
    }

    componentDidMount() {
        this.props.getDataForContest();
        if (this.parseUrlForParams(this.props.location.search) && !this.props.contests.length)
            this.getContests(this.props.creatorFilter);
    }

    getContests = (filter) => {
        this.props.getContests({
            limit: 8,
            offset: 0,
            ...filter});
    };

    parseUrlForParams = (search) => {
        const obj = queryString.parse(search);
        const filter = {
            typeIndex: obj.typeIndex || 1,
            contestId: obj.contestId ? obj.contestId : '',
            industry: obj.industry ? obj.industry : '',
            awardSort: obj.awardSort || 'asc',
            ownEntries: typeof obj.ownEntries === "undefined" ? false : obj.ownEntries
        };
        if (!isEqual(filter, this.props.creatorFilter)) {
            this.props.newFilter(filter);
            this.props.clearContestsList();
            this.getContests(filter);
            return false;
        } else
            return true;
    };

    getPredicateOfRequest = () => {
        const obj = {};
        const {creatorFilter} = this.props;
        Object.keys(creatorFilter).forEach((el) => {
            if (creatorFilter[el]) {
                obj[el] = creatorFilter[el];
            }
        });
        obj.ownEntries = creatorFilter.ownEntries;
        return obj;
    };

    loadMore = (startFrom) => {
        this.props.getContests({
            limit: 8,
            offset: startFrom,
            ...this.getPredicateOfRequest()});
    };

    setContestList = () => {
        const array = [];
        const {contests} = this.props;
        for (let i = 0; i < contests.length; i++) {
            array.push(<ContestBox data={contests[i]} key={contests[i].id}
                                   goToExtended={this.goToExtended}/>)
        }
        return array;
    };

    goToExtended = (contestId) => {
        this.props.history.push('/contest/' + contestId);
    };

    tryLoadAgain = () => {
        this.props.clearContestsList();
        this.props.getContests({limit: 8, offset: 0, ...this.getPredicateOfRequest()});
    };


    render() {
        const {error, haveMore} = this.props;
        return (
            <div className={styles.mainContainer}>
                <MultiFilter history={this.props.history}/>
                {
                    error ?
                        <div className={styles.messageContainer}>
                            <TryAgain getData={this.tryLoadAgain}/>
                        </div>
                        :
                        <ContestsContainer isFetching={this.props.isFetching}
                                           loadMore={this.loadMore}
                                           history={this.props.history} haveMore={haveMore}>
                            {this.setContestList()}
                        </ContestsContainer>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {contestsList, dataForContest} = state;
    return {...contestsList, dataForContest};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContests: (data) => dispatch(getContestsForCreative(data)),
        clearContestsList: () => dispatch(clearContestList()),
        newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
        getDataForContest: () => dispatch(getDataForContest())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard));