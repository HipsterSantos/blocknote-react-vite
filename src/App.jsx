import {
  BlockNoteEditor,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { default as BlockNoteReact } from "@blocknote/react"; // Default import

// Destructure from the default import
const {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} = BlockNoteReact;

// Custom Slash Menu item
const insertHelloWorldItem = (editor) => ({
  title: "Insert Hello World",
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const helloWorldBlock = {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
    };
    editor.insertBlocks([helloWorldBlock], currentBlock, "after");
  },
  aliases: ["helloworld", "hw"],
  group: "Other",
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: "Used to insert a block with 'Hello World' below.",
});

const getCustomSlashMenuItems = (editor) => [
  ...getDefaultReactSlashMenuItems(editor),
  insertHelloWorldItem(editor),
];

export default function App() {
  const editor = useCreateBlockNote({
    initialContent: [
      { type: "paragraph", content: "Welcome to this demo!" },
      { type: "paragraph", content: "Press the '/' key to open the Slash Menu" },
      {
        type: "paragraph",
        content: "Notice the new 'Insert Hello World' item - try it out!",
      },
      { type: "paragraph" },
    ],
  });

  return (
    <BlockNoteView editor={editor} slashMenu={false}>
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
}