import Hero from "../../components/home/Hero/Hero";
import FeaturedCampaigns from "../../components/home/FeaturedCampaigns/FeaturedCampaigns";
import MonthlySupport from "../../components/home/MonthlySupport/MonthlySupport";
import Transparency from "../../components/home/Transparency/Transparency";
import SectionDivider from "../../components/home/SectionDivider/SectionDivider";
import CreateCampaign from "../../components/home/CreateCampaign/CreateCampaign";

function Home() {
    return (
        <>
            <Hero />

            <FeaturedCampaigns />

            <MonthlySupport />

            <Transparency />

            <SectionDivider />

            <CreateCampaign />
        </>
    );
}

export default Home;