import HeroSection from '../components/HeroSection';
import HeroBadgesRow from '../components/HeroBadgesRow';
import FeaturedCategories from '../components/FeaturedCategories';
function LandingPage() {
    const featuredCategories = [
        {
            title: "Latest Drop",
            img: "/latest.jpg",
            link: "/shop?cat=latest"
        },
        {
            title: "Women",
            img: "/women.jpg",
            link: "/shop?cat=women"
        },
        {
            title: "Hoodies",
            img: "/hoodies.jpg",
            link: "/shop?cat=hoodies"
        },
        {
            title: "Men",
            img: "/men.jpg",
            link: "/shop?cat=men"
        },
        {
            title: "Shoes",
            img: "/shoes.jpg",
            link: "/shop?cat=shoes"
        },
        {
            title: "Accessories",
            img: "/accessories.jpg",
            link: "/shop?cat=accessories"
        },
    ];

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
            <FeaturedCategories categories={featuredCategories} />
        </>
    );
}
export default LandingPage;