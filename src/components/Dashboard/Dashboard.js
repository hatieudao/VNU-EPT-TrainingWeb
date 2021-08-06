import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GetTextReading from '../../functions/GetTextReading';
import classNames from 'classnames';
import axios from '../../axios';
import './Dashboard.css';
import Alert from '../Alert/Alert';
import swal from '@sweetalert/with-react';
function Dashboard() {
    const userRole = useSelector(state => state.user.role);
    const [paragraph, setParagraph] = useState('');
    const [selections, setSelections] = useState('');
    const readParagraph = e => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = function (evt) {
                setParagraph(evt.target.result);
            };
            fileReader.readAsText(file);
        }
    }
    const readSelections = e => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = function (evt) {
                setSelections(evt.target.result);
            };
            fileReader.readAsText(file);
        }
    }
    const [name, setName] = useState('');
    const [type, setType] = useState('Others');
    const [data, setData] = useState('');
    const [detailQuestion, setDetailQuestion] = useState([]);
    const handleSubmit = async (e) => {
        const sharpData = await GetTextReading(paragraph, selections);
        setData(sharpData);
    }
    const history = useHistory();
    useEffect(() => {
        if (userRole < 1) {
            history.push('/xyz');
        }
    });

    const postExam = () => {
        if (type === "Others") {
            swal(<Alert message={"Please set another type !"} />);
            return;
        }
        if (name === '' || data === '') {
            swal(<Alert message={"Please fill up input !"} />);
            return;
        };

        axios({
            method: 'post',
            url: `/paragraph/submit`,
            data: {
                name: name,
                data: data
            }
        }).then(() => swal(<Alert message={"Create new exam successfully"} />))
            .catch(e => swal(<Alert message={'error : ' + e.message} />))
    };
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__input">
                    <div className="input__item">
                        <label htmlFor="file1">Paragraph</label>
                        <input type="file" name="file1"
                            onChange={readParagraph}
                        />
                    </div>
                    <div className="input__item">
                        <label htmlFor="file2">Selections</label>
                        <input type="file" name="file2"
                            onChange={readSelections}
                        />
                    </div>
                    <div className="inputType">
                        <label htmlFor="type">Type :</label>
                        <select name="type" id="type" onChange={e => setType(e.target.value)} >
                            <option value="others">Others</option>
                            <option value="paragraph">English-Reading</option>

                        </select>
                    </div>
                    <div className="inputName">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <button className={classNames({
                        'submitButton': paragraph !== '' && selections !== '' && name !== '',
                        'submitButton--disable': paragraph === '' || selections === '' || name === ''
                    })}
                        onClick={handleSubmit}
                    >Get Preview</button>
                </div>
                <div className="dashboard__previewData">
                    <div className="dashboard__previewParagraph" id="previewParagraph">
                        <p>{
                            data?.paragraph
                        }</p>

                    </div>
                    <div className="dashboard__previewSelections" id="previewQuestions">
                        {data.questions ?
                            data.questions.map((item, ind) => (
                                <>
                                    <div key={ind} className={classNames({
                                        "previewQuesion": true,
                                        "previewQuesion--detail": detailQuestion.findIndex(item => item === ind) !== -1,

                                    })}
                                        onClick={e => {
                                            const added = detailQuestion.findIndex(item => item === ind);
                                            if (added === -1)
                                                setDetailQuestion([...detailQuestion, ind]);
                                            else
                                                setDetailQuestion(detailQuestion.filter(item => item !== ind));
                                        }}

                                    >{item.index}
                                        {
                                            item.selections.map((aItem, aInd) => <div
                                                key={aInd}
                                                className={
                                                    detailQuestion.findIndex(item => item === ind) === -1 ?
                                                        "previewSelection--disable" :
                                                        "previewSelection"
                                                }
                                            ><p>{aItem}</p></div>)
                                        }
                                        <div className={
                                            detailQuestion.findIndex(item => item === ind) === -1 ?
                                                "previewSelection--disable" :
                                                "previewSelection"
                                        }
                                        > <p> Answer: {item.answer}</p></div>
                                    </div>
                                </>
                            ))
                            : null
                        }

                    </div>

                </div>
                <button className={classNames({
                    'submitButton': paragraph !== '' && selections !== '' && name !== '',
                    'submitButton--disable': paragraph === '' || selections === '' || name === ''
                })}
                    onClick={postExam}
                >Post</button>
            </div>
        </div>
    )
}

export default Dashboard
