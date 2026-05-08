import Markdown from "react-markdown";
import Image from "next/image";
import { IoImagesOutline } from "react-icons/io5";
import { LuFileText } from "react-icons/lu";
import remarkGfm from "remark-gfm";

interface CapsuleFile {
  id: string;
  capsuleId: string;
  url: string;
  publicId: string;
  fileType: string;
  createdAt: Date;
}

interface OpenedCapsuleProps {
  markdown: string;
  attachedMemories: CapsuleFile[];
  attachedDocuments: CapsuleFile[];
}

const OpenedCapsule = ({
  markdown,
  attachedMemories,
  attachedDocuments,
}: OpenedCapsuleProps) => {
  const getMediaLabel = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "image":
        return "Image";
      case "video":
        return "Video";
      case "audio":
        return "Audio";
      default:
        return "File";
    }
  };

  return (
    <div className=" min-h-[80vh] bg-gray-800">
      <p className="uppercase border-b px-4 py-3 font-semibold text-sm">
        CAPSULE CONTENTS
      </p>
      <div className="min-h-[50vh] px-4 py-3 prose prose-invert max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>
          {markdown ?? "No data found"}
        </Markdown>
      </div>

      <div className="px-4 py-4 border-t border-gray-700 space-y-7">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <IoImagesOutline size={18} className="text-gray-300" />
            <p className="text-lg font-semibold">Attached Memories</p>
          </div>

          {attachedMemories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {attachedMemories.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-md border border-gray-700 bg-gray-900/60"
                >
                  <div className="relative aspect-16/10">
                    <Image
                      src={file.url}
                      alt="Attached image"
                      loading="eager"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-2.5 py-2 bg-gray-900/90 border-t border-gray-700">
                    <p className="text-xs font-medium text-gray-200">
                      {getMediaLabel(file.fileType)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No image memories attached.</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <LuFileText size={17} className="text-gray-300" />
            <p className="text-lg font-semibold">Files & Documents</p>
          </div>

          {attachedDocuments.length > 0 ? (
            <div className="space-y-2">
              {attachedDocuments.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-md border border-gray-700 bg-gray-900/40 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-100">
                      {getMediaLabel(file.fileType)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {file.fileType} file
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No videos or audio attached.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default OpenedCapsule;
