import React, { Component } from 'react';
import { ContentState, EditorState, Modifier, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../style/customEditor.css'
class CustomEditor extends Component {
   constructor(props) {
   super(props);
   this.initialTextState = ''
   this.isInitialText = false
   this.emptyState = EditorState.createEmpty()
   if (typeof props.initialTextState !== undefined) {
    this.initialTextState = EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(this.props.initialText)
      )
    )
    this.isInitialText = true
   }else{
    this.isInitialText = false
   }
   
   this.state = {
     editorState: this.isInitialText ? this.initialTextState : this.emptyState
   };
   }
   onEditorStateChange = editorState => {
      this.setState({ editorState });
   };
   sendTextToEditor = (text) => {
    this.setState({editorState: this.insertText(text, this.state.editorState)});
    this.focusEditor();
   }
   
   insertText = (text, editorState) => {
    const currentContent = editorState.getCurrentContent(),
          currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text
    );

    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    return  EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
    }

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
  } 
}
export { CustomEditor };