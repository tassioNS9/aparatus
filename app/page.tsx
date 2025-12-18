import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";
import bannerDesktop from "../public/banner-desktop.png";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";
import QuickSearchButtons from "./_components/quick-search-buttons";

const Home = async () => {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <main>
      <Header />
      <PageContainer>
        <div className="flex flex-col space-y-3 lg:items-center">
          <SearchInput />
          <QuickSearchButtons />
        </div>

        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full lg:hidden"
        />
        <Image
          src={bannerDesktop}
          alt="Agende agora!"
          sizes="100vw"
          className="hidden h-auto w-full rounded-4xl lg:block"
        />

        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
