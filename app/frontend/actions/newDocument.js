import uuid4 from 'uuid4';
import {push} from 'react-router-redux'
import {refreshDocumentList} from './anon';
const {Storage} = require('electron').remote.require('./backend');


export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';

export function select(item) {
    return {
        type: SELECT_DOCUMENT,
        payload: item
    };
}

export function save(name, payload, receip, attachments) {

    let to = receip.trim().split(',').reduce((memo, item) => {
        memo.push(item.trim());
        return memo;
    }, []);

    let document = {
        _id: uuid4(),
        name: name,
        to,
        payload: payload
    };


    return (dispatch) => {
        Storage.open().then(storage => {
            storage.put(document, false, attachments).then(() => {
                refreshDocumentList(dispatch, 1);
            })
        });

    }


}