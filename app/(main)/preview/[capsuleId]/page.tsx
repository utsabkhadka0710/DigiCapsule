import { GetCapsuleFromId } from "@/actions/fetch-capsules";
import BackToDashboard from "@/components/ui/shared/back-to-dashboard";
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

  if (!capsule.data || capsule.data.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-400">No capsule found with the provided ID.</p>
      </div>
    );
  }

  if (capsule.data[0].createdAt < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-400">
          This capsule is not available for preview.
        </p>
      </div>
    );
  }

  const markdown = capsule.data?.[0]?.content ?? "No data found";

  return (
    <div className="min-h-[80vh] max-w-5xl mx-auto mb-5">
      {/* Back to dashboard */}
      <div className="pt-4 pb-3">
        <BackToDashboard />
      </div>
      <div className=" min-h-[80vh] bg-gray-800">
        <p className="uppercase border-b px-4 py-3 font-semibold text-sm">
          CAPSULE CONTENTS
        </p>
        <div className="min-h-[50vh] px-4 py-3 prose prose-invert max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>
            {markdown ?? "No data found"}
          </Markdown>
        </div>

        <div className="px-4 py-3 border-t">
          <p>Attached contents will be displayed here.</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default PreviewPage;
