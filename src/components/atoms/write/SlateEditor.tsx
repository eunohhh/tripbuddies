import React, { useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';

interface SlateEditorProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
}

const SlateEditor: React.FC<SlateEditorProps> = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} initialValue={value} onChange={(newValue) => onChange(newValue)}>
      <Editable
        renderElement={(props: RenderElementProps) => <DefaultElement {...props} />}
        renderLeaf={(props: RenderLeafProps) => <DefaultLeaf {...props} />}
        placeholder="내용을 입력하세요..."
        className="w-full px-3 py-2 border border-gray-300 rounded h-32"
      />
    </Slate>
  );
};

const DefaultElement: React.FC<RenderElementProps> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const DefaultLeaf: React.FC<RenderLeafProps> = (props) => {
  return <span {...props.attributes}>{props.children}</span>;
};

export default SlateEditor;
