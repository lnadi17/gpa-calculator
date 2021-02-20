import React from 'react';

function EditableText(props) {
    if (props.isEditing) {
        return (<input
            type="text"
            value={props.text}
            onBlur={() => props.toggleHandler()}
            onKeyDown={(e) => e.key === "Enter" && props.toggleHandler()}
            onChange={(e) => props.changeHandler(e)}
            autoFocus/>);
    } else {
        return (<p onClick={() => props.toggleHandler()}>{props.text}</p>);
    }
}

export default EditableText;
