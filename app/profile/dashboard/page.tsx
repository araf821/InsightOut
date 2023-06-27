import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Image from "next/image";

const Dashboard = async ({}) => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <section className="py-8">
        <Heading title="Dashboard" />
        {/* Author Info */}
        <div className="my-8 grid grid-cols-1">
          {/* Main info */}
          <div className="relative flex w-full overflow-hidden rounded-l-lg bg-secondary">
            {/* Image component */}
            <div className="relative h-[100px] max-h-[200px] w-[100px] max-w-[200px] md:h-[200px] md:w-full">
              <Image
                //@ts-ignore
                src={currentUser?.image || "/images/placeholder.jpg"}
                alt="current user profile"
                fill
                className="h-[200px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
