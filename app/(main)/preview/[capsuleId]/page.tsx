import { GetCapsuleFromId } from "@/actions/fetch-capsules";
import { sql } from "drizzle-orm";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PreviewPage = async ({
  params,
}: {
  params: Promise<{ capsuleId: string }>;
}) => {
  const capsuleId = (await params).capsuleId;

  const capsule = await GetCapsuleFromId({ capsuleId: sql`${capsuleId}` });

  const markdown = capsule.data?.[0]?.content ?? "No data found";

  return (
    <div className="min-h-[80vh] prose prose-invert max-w-none">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
};
export default PreviewPage;
