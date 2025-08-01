import HeroSection from '../components/HeroSection';
import HeroBadgesRow from '../components/HeroBadgesRow';

function LandingPage() {
    return (
        <>
            <HeroSection
                title="NEW ARRIVAL"
                subtitle="Streetwear essentials. Modern fits. Built for the everyday grind."
                buttonText="Shop Now"
                buttonLink="/shop"
                image="/tee1.jpg"
                imageAlt="Featured"
            />
            <HeroBadgesRow />
        </>
    );
}
export default LandingPage;