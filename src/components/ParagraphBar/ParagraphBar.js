import React from 'react'
import { useSelector } from 'react-redux';
import './ParagraphBar.css'
function ParagraphBar({ paragraph }) {
    const textArray = paragraph.split(/\.\n[0-9]/g);
    const { fontSize, textColor, time } = useSelector(state => state.examSetting);
    return (
        <div className="paragraphbar noselect" id="paragraph">
            <div className="paragraphbar__overlay">
                <h3 style={{ color: textColor }} className="paragraphbar__title">
                    {textArray[0]}
                </h3>
                <div style={{ fontSize: `${fontSize}px`, color: textColor }} className="paragraph">
                    {textArray.map((item, ind) => (ind > 0 &&
                        <p key={ind}

                            className="partParagrph">{item}.</p>))}
                </div>
            </div>
        </div>
    )
}

export default ParagraphBar
