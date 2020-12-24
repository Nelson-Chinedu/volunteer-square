import React, {Dispatch, FunctionComponent, SetStateAction, useRef}  from 'react';
import {Editor, EditorState, RichUtils, ContentBlock} from 'draft-js';

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

export default RichEditor;
