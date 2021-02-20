import React, {useState} from 'react';
import EditableText from "./EditableText";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

function Card(props) {
    const [editingName, setEditingName] = useState(false);
    const [editingMark, setEditingMark] = useState(false);
    const [editingCredits, setEditingCredits] = useState(false);

    const changeHandler = (event, stateChanger) => {
        stateChanger(event.target.value);
    }

    return (
        <div className="card">
            <div>
            <IconButton variant="contained"
                    className="remove-button"
                        onClick={() => props.removeButtonHandler()}>
                <DeleteIcon/>
            </IconButton>
            </div>
            <EditableText className="subject-name"
                          text={props.subjectName}
                          isEditing={editingName}
                          toggleHandler={() => setEditingName(!editingName)}
                          changeHandler={(e) => changeHandler(e, props.setSubjectName)}/>
            <EditableText className="subject-mark"
                          text={props.subjectMark}
                          isEditing={editingMark}
                          toggleHandler={() => setEditingMark(!editingMark)}
                          changeHandler={(e) => changeHandler(e, props.setSubjectMark)}/>
            <EditableText className="subject-credits"
                          text={props.subjectCredits}
                          isEditing={editingCredits}
                          toggleHandler={() => setEditingCredits(!editingCredits)}
                          changeHandler={(e) => changeHandler(e, props.setSubjectCredits)}/>
        </div>
    );
}

export default Card;
