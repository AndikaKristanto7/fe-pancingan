import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../style/customEditor.css'
class CustomEditor extends Component {
   constructor(props) {
   super(props);
   this.state = {
     editorState: EditorState.createEmpty()
     };
   }
 onEditorStateChange = editorState => {
    this.setState({ editorState });
 };
render() {
const { editorState } = this.state;
return (
  <div>
    <Editor 
      editorState={editorState}
      wrapperClassName="rich-editor demo-wrapper"
      editorClassName="demo-editor"
      toolbarClassName="demo-toolbar"
      onEditorStateChange={this.onEditorStateChange}
      placeholder="The message goes here..." />
  </div>
);
} }
export { CustomEditor };