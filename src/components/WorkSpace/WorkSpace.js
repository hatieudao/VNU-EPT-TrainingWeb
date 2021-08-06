import React, { useEffect, useState } from 'react'
import ParagraphBar from '../ParagraphBar/ParagraphBar'
import Selections from '../Selections/Selections'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './WorkSpace.css'
export default function WorkSpace() {
    const history = useHistory();
    const user = useSelector(state => state.user);
    const eid = useSelector(state => state.examSetting.examID);
    const time = useSelector(state => state.examSetting.time);
    useEffect(() => {
        if (user.length === 0) {
            return <h1>No User</h1>;
        }
        if (!eid) {
            history.push('/setting');
        }
    });
    const [dataExam, setDataExam] = useState('');
    const [timeOff, setTimeOff] = useState(false);
    useEffect(() => {
        axios({
            method: 'get',
            url: `/paragraph/${eid}`,
        }).then(({ data }) => {
            setDataExam(data[0]);
        }).catch(e => alert('error ' + e.message))

    }, [])

    return (
        <>

            <div className="workSpace">

                {dataExam !== '' && <ParagraphBar paragraph={dataExam.paragraph} />}
                <div className="clockCountDown">
                    <CountdownCircleTimer
                        isPlaying
                        duration={time * 60}
                        colors={[
                            ['#8755df', 0.34],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                        ]}
                        size={70}
                        onComplete={() => setTimeOff(true)}
                    >
                        {({ remainingTime }) => {
                            const minutes = Math.floor(remainingTime / 60)
                            const seconds = remainingTime % 60

                            return `${minutes}:${seconds}`
                        }}
                    </CountdownCircleTimer>
                </div>
                {dataExam !== '' && <Selections questions={dataExam.questions} timeOff={timeOff} />}
            </div>
        </>
    )
}
