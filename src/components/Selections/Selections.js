import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Question from '../Question/Question';
import { Button } from '@material-ui/core';
import { addSubmission, resetSubmission } from '../../reducers/slices/submission';
import { useHistory } from 'react-router';
import swal from '@sweetalert/with-react';
import Alert from '../Alert/Alert';
import './Selections.css';
function Selections({ questions, timeOff }) {

    const [isChoiced, setIsChoiced] = useState([]);

    const selected = (ind, val) => {
        const newArr = [...isChoiced];
        newArr[ind] = val;
        console.log(newArr);
        setIsChoiced(newArr);
    }
    const submitSelection = () => {
        const submission = questions.map((item, ind) => {
            item.selected = isChoiced[ind];
            return item;
        })
        ditpatch(resetSubmission());
        ditpatch(addSubmission(submission));
        history.push('/result');
    }

    const ditpatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (timeOff)
            submitSelection();
    });

    return (
        <div className="selections" id="selection">
            {questions.map((item, ind) => <Question
                key={ind}
                allQuestion={{ ...item, pos: ind }}
                choiced={isChoiced[ind]}
                selected={selected}
            />)}
            <Button variant="contained" style={{
                backgroundColor: 'rgba(65, 3, 219, 255)',
                marginBottom: '10px'
            }}
                onClick={async () => {
                    const ok = await swal(<Alert message={"Are you sure to submit ?"} />, {
                        buttons: {
                            confirm: true,
                            cancel: true
                        }
                    });
                    if (ok) submitSelection();
                }}
            >
                Submit
            </Button>
        </div>
    )
}

export default Selections
