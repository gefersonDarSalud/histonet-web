import { WysiwygEditor, type WysiwygEditorProps } from 'editly-wysiwyg';

export const WysiwigEditor = (props: WysiwygEditorProps) => {
    const tools = [
        "undo",
        "align",
        "textColor",
        "insertHorizontalRule",
        "insertOrderedList",
        "insertUnorderedList",
        "strikethrough",
        "bold",
        "italic",
        "underline",
        "fullscreen",
    ];
    return (
        <WysiwygEditor
            mode="full"
            toolbarPosition="bottom"
            tools={tools}
            showSeoGuide={false}
            autoResize={false}
            minHeight="10rem"
            spellCheck={true}
            language="es"
            lang="es"
            placeholder="Escribe algo..."
            {...props}
        />
    );
}