import getCurrentUser from "@/app/actions/users/getCurrentUser";
import PreferencesClient from "./PreferencesClient";

const ProfilePreferences = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="mx-auto my-8 w-full max-w-[1024px] px-4">
      <p className="text-2xl text-zinc-800 sm:text-3xl lg:text-4xl">
        <span className="font-merri font-bold">Preferences</span>
      </p>
      <hr className="md:border-3 w-12 border-[2px] border-accent md:w-16" />

      {/* Client */}
      <PreferencesClient currentUser={currentUser} />
    </div>
  );
};

export default ProfilePreferences;
