import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import RadioOutlinedIcon from '@material-ui/icons/RadioOutlined';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { addSetting } from '../../reducers/slices/examSetting';
import axios from '../../axios';
import './Setting.css';
const Exam = ({ id, exam, select, active }) => (<div className={classNames({
    "exam": true,
    "exam--active": active,
})} onClick={() => select(id)} >
    {exam.type === 'Reading' || !exam.type ? <LibraryBooksOutlinedIcon /> : <RadioOutlinedIcon />}
    <p className="exam__title">{exam.name}</p>
</div>);

function Setting() {
    const user = useSelector(state => state.user);
    let __exams = [{
        type: 'Reading',
        name: 'Exam 1 - Reading'
    }, {
        type: 'Listening',
        name: 'Exam 2 - Listening'
    }, {
        type: 'Reading',
        name: 'Exam 3 - Reading'
    }, {
        type: 'Listening',
        name: 'Exam 4 - Listening'
    }, {
        type: 'Reading',
        name: 'Exam 5 - Reading'
    }, {
        type: 'Reading',
        name: 'Exam 7 - Reading'
    }, {
        type: 'Reading',
        name: 'Exam 6 - Reading'
    }];
    const [exams, setExams] = useState(__exams);
    const [selectedExam, setSelectedExam] = useState('');
    const [time, setTime] = useState(25);
    const [color, setColor] = useState('#000');
    const [fontSize, setFontSize] = useState(18);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        axios({
            method: 'get',
            url: '/paragraph'
        }).then(({ data }) => setExams(data))
            .catch(e => alert('error ' + e.message));
    }, [])
    return (
        <div className="settingExam">
            <div className="settingExam__exams">
                <h1>Select An Exam</h1>
                {
                    exams.map((exam, ind) => <Exam key={ind}
                        exam={exam}
                        id={ind}
                        active={selectedExam === ind}
                        select={(index) => setSelectedExam(index !== selectedExam ? index : '')} />)
                }
            </div>
            <div className="settingExam__moreSetting">

                <h1>Text setting</h1>
                <div className="setting__option">
                    <label htmlFor="time">Time : <span className="number">{time} </span>minutes</label>
                    <div className="timeRangeSetting">
                        <span className="number">15</span>
                        <input type="range" name="time" id="time"
                            min="15" max="60" step="5"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <span className="number">60</span>
                    </div>
                </div>
                <div className="setting__option">
                    <label htmlFor="fontSize">Size of text  : <span className="number">{fontSize} </span>px</label>
                    <div className="timeRangeSetting">
                        <span className="number">15</span>
                        <input type="range" name="time" id="time"
                            min="15" max="60" step="2"
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                        />
                        <span className="number">60</span>
                    </div>
                </div>

                <div className="setting__option">
                    <label htmlFor="color">Text color <span className="number">{color}</span></label>
                    <div className="timeRangeSetting">
                        <input type="color" name="color" className="textColor"
                            id="textColor" onChange={e => setColor(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className={classNames({
                    'submitButton': selectedExam !== '',
                    'submitButton--disable': selectedExam === ''
                })}
                    onClick={() => {
                        if (selectedExam === '') return;
                        dispatch(addSetting({
                            id: exams[selectedExam].id,
                            time: time,
                            textColor: color,
                            fontSize: fontSize
                        }));
                        history.push('/study');
                    }}
                >Let's go</button>
            </div>
        </div>
    )
}

export default Setting;
