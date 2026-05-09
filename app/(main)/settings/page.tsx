import Link from "next/link";

const SettingsPage = () => {
  return (
    <div className="min-h-[90vh] md:min-h-[85vh] lg:min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <Link href="/settings/upgrade" className="text-blue-500 hover:underline">
        Upgrade Account
      </Link>
    </div>
  );
};
export default SettingsPage;
