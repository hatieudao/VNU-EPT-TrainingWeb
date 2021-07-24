import React, { useEffect } from 'react'
import ParagraphBar from '../ParagraphBar/ParagraphBar'
import Selections from '../Selections/Selections'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './WorkSpace.css'
export default function WorkSpace() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    useEffect(() => {
        if (user.length === 0) {
            history.push('/login', { from: '/' });
            return;
        }
    });
    return (
        <div className="workSpace">
            <ParagraphBar />
            <Selections />
        </div>
    )
}
