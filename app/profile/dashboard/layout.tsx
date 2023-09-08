import getCurrentUser from "@/app/actions/users/getCurrentUser";
import Container from "@/components/Container";
import ProfileInformation from "@/components/dashboard/ProfileInformation";
import { redirect } from "next/navigation";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <Container className="py-8">
      <ProfileInformation user={currentUser} />
      {children}
    </Container>
  );
};

export default ProfileLayout;
