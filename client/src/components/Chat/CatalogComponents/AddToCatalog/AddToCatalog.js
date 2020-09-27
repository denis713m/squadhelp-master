import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import SelectInput from '../../../SelectInput/SelectInput';
import {addChatToCatalog} from '../../../../actions/actionCreator';
import styles from './AddToCatalog.module.sass';
import { toast } from 'react-toastify';
import Notification from '../../../Notification/Notification';
import CONSTANTS from '../../../../constants'


const AddToCatalog = (props) => {

    const getCatalogsNames = () => {
        const namesArray = [];
        catalogList.forEach((catalog) => {
            namesArray.push(catalog.catalogName);
        });
        return namesArray;
    };

    const getValueArray = () => {
        const valueArray = [];
        catalogList.forEach((catalog) => {
            valueArray.push(catalog._id);
        });
        return valueArray;
    };

    const click = (values) => {
        const {addChatId} = props;
        let isChatPresent = false;
        catalogList.forEach((catalog) => {
            if ((catalog._id === values.catalogId) && catalog.chats.includes(addChatId)) isChatPresent = true;
        });
        if (!isChatPresent) props.addChatToCatalog({chatId: addChatId, catalogId: values.catalogId});
        else
            toast(<Notification message={CONSTANTS.CHATS_IN_CATALOG} catalog={true}/>);
    };


    const {handleSubmit, catalogList} = props;
    const selectArray = getCatalogsNames();
    return (<>
            {selectArray.length !== 0 ?
                <form onSubmit={handleSubmit(click)} className={styles.form}>
                    <Field
                        name='catalogId'
                        component={SelectInput}
                        header='name of catalog'
                        classes={{
                            inputContainer: styles.selectInputContainer,
                            inputHeader: styles.selectHeader,
                            selectInput: styles.select
                        }}
                        optionsArray={selectArray}
                        valueArray={getValueArray()}
                    />
                    <button type='submit'>Add</button>
                </form>
                :
                <div className={styles.notFound}>You have not created any directories.</div>
            }

        </>
    )
};


const mapStateToProps = (state) => {
    return state.chatStore
};

const mapDispatchToProps = (dispatch) => {
    return {
        addChatToCatalog: (data) => dispatch(addChatToCatalog(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'addChatToCatalog'
})(AddToCatalog));