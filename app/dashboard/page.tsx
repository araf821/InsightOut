import getCurrentUser from "@/app/actions/getCurrentUser";

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();

  return <div>{currentUser?.name}</div>;
};
export default DashboardPage;
