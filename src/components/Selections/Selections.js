import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Question from '../Question/Question';
import { Button } from '@material-ui/core';
import { addSubmission } from '../../reducers/slices/submission';
import { useHistory } from 'react-router';
import './Selections.css';
function Selections() {
    const questions = [{
        index: 1,
        selections: [
            '(A) 123456',
            '(B) 123456',
            '(C) 123456',
            '(D) 123456',
        ],
        answer: 'B'
    }, {
        index: 2,
        selections: [
            '(A) 123456',
            '(B) 123456',
            '(C) 123456',
            '(D) 123456',
        ],
        answer: 'A'
    }, {
        index: 3,
        selections: [
            '(A) 123456',
            '(B) 123456',
            '(C) 123456',
            '(D) 123456',
        ],
        answer: 'D'
    }, {
        index: 4,
        selections: [
            '(A) 123456',
            '(B) 123456',
            '(C) 123456',
            '(D) 123456',
        ],
        answer: 'D'
    }, {
        index: 5,
        selections: [
            '(A) 123456',
            '(B) 123456',
            '(C) 123456',
            '(D) 123456',
        ],
        answer: 'D'
    }];

    const [isChoiced, setIsChoiced] = useState([]);

    const selected = (ind, val) => {
        const newArr = [...isChoiced];
        newArr[ind] = val;
        setIsChoiced(newArr);
    }
    const ditpatch = useDispatch();
    const history = useHistory();
    return (
        <div className="selections" id="selection">
            {questions.map((item, ind) => <Question
                key={ind}
                allQuestion={item}
                choiced={isChoiced[ind]}
                selected={selected}
            />)}
            <Button variant="contained" style={{
                backgroundColor: 'rgba(65, 3, 219, 255)',
                marginBottom: '10px'
            }}
                onClick={async () => {
                    const submission = questions.map((item, ind) => {
                        item.selected = isChoiced[ind];
                        return item;
                    })
                    ditpatch(addSubmission(submission));
                    history.push('/result');
                }}
            >
                Submit
            </Button>
        </div>
    )
}

export default Selections
