import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import "./EditorTexto.css";

export default function EditorTexto({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value || "<p></p>",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Si cambia el value desde afuera (ej editar existente)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "<p></p>");
        }
    }, [value, editor]);

    if (!editor) return null;

    const setLink = () => {
        const url = prompt("Ingresá la URL");

        if (!url) return;

        editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div style={{ border: "1px solid #ccc", borderRadius: "6px" }}>
            <style>
                {`
                .editor-content .ProseMirror, .vista-previa-newsletter {
                    min-height: 150px;
                    padding: 10px;
                    background-color: white;
                    outline: none;
                    color: black !important;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
                    text-align: left !important;
                }
                .editor-content .ProseMirror strong, .editor-content .ProseMirror b, .vista-previa-newsletter strong, .vista-previa-newsletter b {
                    font-weight: 900 !important;
                }
                .editor-content .ProseMirror em, .editor-content .ProseMirror i, .vista-previa-newsletter em, .vista-previa-newsletter i {
                    font-style: italic !important;
                }
                .editor-content .ProseMirror ul, .vista-previa-newsletter ul {
                    list-style-type: disc !important;
                    padding-left: 20px !important;
                    margin-bottom: 1em;
                }
                .editor-content .ProseMirror ol, .vista-previa-newsletter ol {
                    list-style-type: decimal !important;
                    padding-left: 20px !important;
                    margin-bottom: 1em;
                }
                .editor-content .ProseMirror a, .vista-previa-newsletter a {
                    color: #007bff !important;
                    text-decoration: underline !important;
                    cursor: pointer;
                }
                .editor-content .ProseMirror p, .vista-previa-newsletter p {
                    margin-bottom: 0.5em;
                    color: black !important;
                    text-align: left !important;
                    width: 100% !important;
                    display: block !important;
                }
                `}
            </style>

            {/* 🔹 TOOLBAR */}
            <div
                style={{
                    borderBottom: "1px solid #ccc",
                    padding: "8px",
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    background: "#f5f5f5",
                }}
            >
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    style={{ fontWeight: editor.isActive("bold") ? "bold" : "normal" }}
                >
                    B
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={{ fontStyle: editor.isActive("italic") ? "italic" : "normal" }}
                >
                    I
                </button>

                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    • Lista
                </button>

                <button type="button" onClick={setLink}>
                    🔗 Link
                </button>

                <button type="button" onClick={() => editor.chain().focus().unsetLink().run()}>
                    ❌ Link
                </button>

                <button type="button" onClick={() => editor.chain().focus().undo().run()}>
                    ↩ Undo
                </button>

                <button type="button" onClick={() => editor.chain().focus().redo().run()}>
                    ↪ Redo
                </button>
            </div>

            {/* 🔹 EDITOR */}
            <EditorContent editor={editor} className="editor-content" />
        </div>
    );
}