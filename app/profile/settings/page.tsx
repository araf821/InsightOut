import getCurrentUser from "@/app/actions/users/getCurrentUser";
import SettingsClient from "./SettingsClient";
import Heading from "@/components/Heading";

const ProfileSettingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="mx-auto my-8 w-full max-w-[1024px] px-4">
      <Heading title="Profile Settings" small />

      {/* Client */}
      <SettingsClient currentUser={currentUser} />
    </div>
  );
};

export default ProfileSettingsPage;
