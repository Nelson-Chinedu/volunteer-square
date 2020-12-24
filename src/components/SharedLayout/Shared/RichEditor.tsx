import React, {Dispatch, FunctionComponent, SetStateAction, useRef}  from 'react';
import {Editor, EditorState, RichUtils,getDefaultKeyBinding, ContentBlock} from 'draft-js';

type Props = {
  editorState: EditorState;
  readOnly?: boolean;
  onChange: Dispatch<SetStateAction<EditorState>>;
};

type TInlineStyleControls = { onToggle: (inlineStyle: string) => void };

type InlineStyleControlsProps = Pick<Props, 'editorState'> & TInlineStyleControls;

type TStyleButton = {
  style: string;
  active: boolean;
  label: string;
};

type StyleButtonProps = TInlineStyleControls & TStyleButton;

type BlockStyleControlsProps = Pick<Props, 'editorState'> & TInlineStyleControls;

const RichEditor:FunctionComponent<Props> = (props) => {
  const {editorState} = props;
  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();

  const editor = useRef(null);

  const _focusEditor = () => {
    editor.current.focus();
  };

  const _onChange = (editorStateValue: EditorState) => {
    props.onChange(editorStateValue);
  };

  const _toggleBlockType = (blockType: string) => {
    _onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlineStyle = (inlineStyle: string) => {
    _onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle),
    );
  };

  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={_toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={_toggleInlineStyle}
        />
        <div className={className} onClick={_focusEditor}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            // handleKeyCommand={this.handleKeyCommand}
            // keyBindingFn={this.mapKeyToEditorCommand}
            onChange={_onChange}
            placeholder="Enter Event Requirement..."
            ref={editor}
            spellCheck={true}
            readOnly={props.readOnly}
          />
        </div>
      </div>
  )
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block: ContentBlock) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return '';
  }
}

const StyleButton = (props: StyleButtonProps) => {
  const _onToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={_onToggle}>
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
];

const BlockStyleControls = (props: BlockStyleControlsProps) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />,
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props: InlineStyleControlsProps) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />,
      )}
    </div>
  );
};



// class RichEditor extends React.Component {
//   focus: () => any;
//   onChange: (editorState: any) => void;
//   handleKeyCommand: (command: string, editorState: EditorState) => boolean;
//   mapKeyToEditorCommand: (e: React.KeyboardEvent<{}>) => Draft.Model.Constants.DraftEditorCommand;
//   toggleBlockType: (blockType: string) => void;
//   toggleInlineStyle: (inlineStyle: string) => void;
//   constructor(props: any) {
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};

//     this.focus = () => this.refs.editor.focus();
//     this.onChange = (editorState: any) => this.setState({editorState});

//     this.handleKeyCommand = this._handleKeyCommand.bind(this);
//     this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
//     this.toggleBlockType = this._toggleBlockType.bind(this);
//     this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
//   }

//   _handleKeyCommand(command: string, editorState: EditorState) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return true;
//     }
//     return false;
//   }

//   _mapKeyToEditorCommand(e: React.KeyboardEvent<{}>) {
//     if (e.keyCode === 9 /* TAB */) {
//       const newEditorState = RichUtils.onTab(
//         e,
//         this.state.editorState,
//         4, /* maxDepth */
//       );
//       if (newEditorState !== this.state.editorState) {
//         this.onChange(newEditorState);
//       }
//       return;
//     }
//     return getDefaultKeyBinding(e);
//   }

//   _toggleBlockType(blockType: string) {
//     this.onChange(
//       RichUtils.toggleBlockType(
//         this.state.editorState,
//         blockType
//       )
//     );
//   }

//   _toggleInlineStyle(inlineStyle: string) {
//     this.onChange(
//       RichUtils.toggleInlineStyle(
//         this.state.editorState,
//         inlineStyle
//       )
//     );
//   }

//   render() {
//     const {editorState} = this.state;

//     // If the user changes block type before entering any text, we can
//     // either style the placeholder or hide it. Let's just hide it now.
//     let className = 'RichEditor-editor';
//     var contentState = editorState.getCurrentContent();
//     if (!contentState.hasText()) {
//       if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//         className += ' RichEditor-hidePlaceholder';
//       }
//     }

//     return (
//       <div className="RichEditor-root">
//         <BlockStyleControls
//           editorState={editorState}
//           onToggle={this.toggleBlockType}
//         />
//         <InlineStyleControls
//           editorState={editorState}
//           onToggle={this.toggleInlineStyle}
//         />
//         <div className={className} onClick={this.focus}>
//           <Editor
//             blockStyleFn={getBlockStyle}
//             customStyleMap={styleMap}
//             editorState={editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             keyBindingFn={this.mapKeyToEditorCommand}
//             onChange={this.onChange}
//             placeholder="Enter Event Description..."
//             ref="editor"
//             spellCheck={true}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// // Custom overrides for "code" style.
// const styleMap = {
//   CODE: {
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// };

// function getBlockStyle(block: { getType: () => any; }) {
//   switch (block.getType()) {
//     case 'blockquote': return 'RichEditor-blockquote';
//     default: return null;
//   }
// }

// class StyleButton extends React.Component {
//   onToggle: (e: {
//     preventDefault: () => void;
//   }) => void;
//   constructor() {
//     super();
//     this.onToggle = (e: { preventDefault: () => void; }) => {
//       e.preventDefault();
//       this.props.onToggle(this.props.style);
//     };
//   }

//   render() {
//     let className = 'RichEditor-styleButton';
//     if (this.props.active) {
//       className += ' RichEditor-activeButton';
//     }

//     return (
//       <span className={className} onMouseDown={this.onToggle}>
//         {this.props.label}
//       </span>
//     );
//   }
// }

// const BLOCK_TYPES = [
//   {label: 'H1', style: 'header-one'},
//   {label: 'H2', style: 'header-two'},
//   {label: 'H3', style: 'header-three'},
//   {label: 'H4', style: 'header-four'},
//   {label: 'H5', style: 'header-five'},
//   {label: 'H6', style: 'header-six'},
//   {label: 'Blockquote', style: 'blockquote'},
//   {label: 'UL', style: 'unordered-list-item'},
//   {label: 'OL', style: 'ordered-list-item'},
//   // {label: 'Code Block', style: 'code-block'},
// ];

// const BlockStyleControls = (props: { onToggle?: any; editorState?: any; }) => {
//   const {editorState} = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();

//   return (
//     <div className="RichEditor-controls">
//       {BLOCK_TYPES.map((type) =>
//         <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

// var INLINE_STYLES = [
//   {label: 'Bold', style: 'BOLD'},
//   {label: 'Italic', style: 'ITALIC'},
//   {label: 'Underline', style: 'UNDERLINE'},
//   {label: 'Monospace', style: 'CODE'},
// ];

// const InlineStyleControls = (props: { editorState: { getCurrentInlineStyle: () => any; }; onToggle: any; }) => {
//   const currentStyle = props.editorState.getCurrentInlineStyle();
  
//   return (
//     <div className="RichEditor-controls">
//       {INLINE_STYLES.map((type) =>
//         <StyleButton
//           key={type.label}
//           active={currentStyle.has(type.style)}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

export default RichEditor;