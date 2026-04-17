import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PreviewPage = async ({
  params,
}: {
  params: Promise<{ capsuleId: string }>;
}) => {
  const capsuleId = (await params).capsuleId;

  const markdown = `# Heading 1
   ## Heading 2
  ## Heading 3`;
  return (
    <div className="min-h-[80vh] prose prose-invert max-w-none">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
};
export default PreviewPage;
