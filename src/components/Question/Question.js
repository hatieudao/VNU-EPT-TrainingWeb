import React from 'react';
import classNames from 'classnames';
import './Question.css';
export default function Question({ allQuestion, choiced, selected }) {

    const { index, question, selections, pos } = allQuestion;
    return (
        <div className="question">
            <h5 className="question__index">
                {`${index ? `${index}` : ''} ${question ? `.${question}` : ''}`}
            </h5>
            <div className="question__selections">
                {
                    selections.map((item, ind) => (
                        <div key={ind}
                            className={classNames({ "selection": true, "selection--active": choiced === ind })}
                            onClick={() => {
                                if (choiced === ind) {
                                    selected(pos, null);
                                }
                                console.log(ind);
                                selected(pos, ind)
                            }}
                        >
                            <p>{item}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
