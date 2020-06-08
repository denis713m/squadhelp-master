import React, { Component } from 'react';
import styles from './ModeratorDashboard.module.sass'
import {
    getAllOffers,
    moderatorSetOfferStatus,
} from '../../actions/actionCreator';
import { connect } from 'react-redux';
import OfferBox from '../OfferBox/OfferBox';
import CONSTANTS from '../../constants';
import Spinner from '../Spinner/Spinner'
import classNames from 'classnames';

class ModeratorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 5,
            offset: 0,
            status: CONSTANTS.OFFER_STATUS_PENDING
        }

    }

    componentDidMount() {
        this.props.getOffers(this.state);
    }

    needButtons = () => {
        return true
    };

    setOffersList = () => {
        const array = [];
        for ( let i = 0; i < this.props.offers.length; i ++ ) {
            if ( this.props.offers[i].status === this.state.status ) {
                array.push(<OfferBox data={this.props.offers[i]}
                                     key={i} needButtons={this.needButtons}
                                     setOfferStatus={this.setOfferStatus}
                                     btnNames={['Approve', 'Reject']}
                                     contestType={this.props.offers[i].Contest.contestType} date={new Date()}/>)

            }
        }
        return array.length !== 0 ? array : <div className={styles.notFound}>There is no suggestion at this moment</div>
    };

    loadMore = (offset) => {
        const newOffset = this.state.offset + offset;
        this.props.getOffers({
            limit: this.state.limit,
            offset: newOffset,
            status: this.state.status
        });
        this.setState({offset: newOffset});
    };

    changeType = (type) => {
        this.setState({
                status: type,
                offset: 0
            }
        );
        this.props.getOffers({
            limit: this.state.limit,
            offset: 0,
            status: type
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( this.props.statusUpdate ) {
            this.loadMore(0)
        }
    }

    setOfferStatus = (creatorId, offerId, command) => {
        const obj = {
            command,
            offerId,
        };
        this.props.setOfferStatus(obj);
    };


    render() {
        const haveMore = this.props.totalHave > ( this.props.offers.length + this.state.offset );
        return (
            <>
                <div className={styles.mainContainer}>
                    <div className={styles.btnContainer}>
                        <button
                            className={classNames([styles.filter],
                                {
                                    [styles.activeFilter]: this.state.status === CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR
                                    || this.state.status === CONSTANTS.OFFER_STATUS_REJECTED
                                },
                            )}
                            onClick={() => this.changeType(CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR)}>Rejected
                        </button>
                        <button
                            className={classNames([styles.filter],
                                {
                                    [styles.activeFilter]: this.state.status === CONSTANTS.OFFER_STATUS_APPROVED
                                })
                            }
                            onClick={() => this.changeType(CONSTANTS.OFFER_STATUS_APPROVED)}>Approved
                        </button>
                        <button
                            className={classNames([styles.filter],
                                {
                                    [styles.activeFilter]: this.state.status === CONSTANTS.OFFER_STATUS_PENDING
                                }
                            )
                            }
                            onClick={() => this.changeType(CONSTANTS.OFFER_STATUS_PENDING)}>Pending
                        </button>

                    </div>
                    <div className={styles.offersContainer}>
                        <div className={styles.offers}>
                            {this.props.isFetching ? <Spinner/>
                                :
                                <div>
                                    <div className={styles.navBtnContainer}>
                                        <span>
                                            <i className={classNames("fas fa-undo-alt", styles.navBtnPrev, {[styles.notActive]: this.state.offset ===0 })}
                                               onClick={this.state.offset > 0 ? () => this.loadMore(- 5) : () => {
                                               }}
                                            />
                                        </span>
                                        <span>
                                            <i className={classNames("fas fa-undo", styles.navBtnPrev, styles.navBtnNext, {[styles.notActive]: !haveMore })}
                                               onClick={haveMore ? () => this.loadMore(5) : () => {
                                               }}/>
                                        </span>
                                    </div>
                                    {this.setOffersList()}
                                </div>
                            }
                        </div>
                    </div>

                </div>

            </>
        );
    }
}

const mapStateToProps = (state) => state.offers;
const mapDispatchToProps = (dispatch) => {
    return {
        getOffers: (data) => dispatch(getAllOffers(data)),
        setOfferStatus: (data) => dispatch(moderatorSetOfferStatus(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);