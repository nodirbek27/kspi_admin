import React from 'react';
import { useMultiRootEditor } from '@ckeditor/ckeditor5-react';
import MultiRootEditor from '@ckeditor/ckeditor5-build-multi-root';

const CallMarkazCom = () => {
    const editorProps = {
        editor: MultiRootEditor,
        data: {
            intro: '<h1>React multi-root editor</h1>',
            content: '<p>Hello from CKEditor&nbsp;5 multi-root!</p>'
        },
        config: {
      
        }
    };

    const {
        editor, toolbarElement, editableElements,
        data, setData,
        attributes, setAttributes
    } = useMultiRootEditor( editorProps );
    console.log(data.content);

    return (
        <div className="App">
            <h2>Using CKEditor&nbsp;5 multi-root build in React</h2>

            { toolbarElement }

            { editableElements }
        </div>
    );
}

export default CallMarkazCom;

