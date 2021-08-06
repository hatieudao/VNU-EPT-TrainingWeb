import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import './Result.css';
const check = (item) => item.answer === String.fromCharCode(item.selected + 65);
const flatList = (list, ind) => <div key={ind} className="result__list">
    <table className="container__table">
        <thead>
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Selected</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(item => <tr className={classNames({
                    "item__question": true,
                    "item__question--correct": check(item),
                    "item__question--wrong": !check(item)
                })}>
                    <td className="column1">{item.question | item.index}</td>
                    <td className="column2">{item.answer}</td>
                    <td className="column3">{String.fromCharCode(item.selected + 65)}</td>
                </tr>)
            }
        </tbody>
    </table>
</div>
function Result() {
    const submissions = useSelector(state => state.submissions);
    const totalLength = (sum, item) => sum + item.length;
    const checkAnswer = (sum, item) => sum + (check(item) ? 1 : 0);
    const totalQuestions = submissions.reduce(totalLength, 0);
    const correctAnswers = submissions.reduce((sum, item) => item.reduce(checkAnswer, sum), 0);
    const wrongList = submissions.map(sub => sub.filter(question => !check(question)));
    const correctList = submissions.map(sub => sub.filter(question => check(question)));
    const data = [submissions, correctList, wrongList];
    const [filter, setFilter] = useState(0);

    return (
        <div className="result">
            <h1 className="result__title">Result</h1>
            <p className="result__point">
                <span className="correct">{correctAnswers}</span> / <span className="total">{totalQuestions}</span>
            </p>
            <div className="result__filter">
                <button className={classNames({ "filter--active": (filter === 0), "filter": true })} onClick={() => setFilter(0)}  >All</button>
                <button className={classNames({ "filter--active": (filter === 1), "filter": true })} onClick={() => setFilter(1)}  >Correct</button>
                <button className={classNames({ "filter--active": (filter === 2), "filter": true })} onClick={() => setFilter(2)}  >Incorrect</button>
            </div>
            <div className="result__wrongList">
                {
                    data[filter].map((list, ind) => flatList(list, ind))
                }
            </div>
        </div>
    );
}

export default Result;
