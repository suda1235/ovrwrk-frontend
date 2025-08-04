/**
 * LandingPage.jsx
 *
 * The homepage showcasing featured content and navigation to product categories.
 *
 * CURRENT FUNCTIONALITY:
 * - Displays a prominent hero section highlighting new arrivals with a call-to-action button.
 * - Shows a row of badges emphasizing key brand features.
 * - Renders a grid of featured product categories with images and links to their respective shop pages.
 * - Uses static, hardcoded category data for demonstration.
 *
 * FUTURE ENHANCEMENTS:
 * - Fetch featured categories dynamically from the backend.
 * - Add animations or interactive elements to the hero and badges.
 * - Improve responsiveness and accessibility.
 * - Integrate personalized recommendations or seasonal promotions.
 *
 * IMPORTANT NOTES:
 * - Relies on components: HeroSection, HeroBadgesRow, and FeaturedCategories.
 * - Category images and links must correspond to actual assets and routes.
 * - Designed as the landing entry point for the app.
 */
import HeroSection from '../components/HeroSection';
import HeroBadgesRow from '../components/HeroBadgesRow';
import FeaturedCategories from '../components/FeaturedCategories';
function LandingPage() {
    const featuredCategories = [
        {
            title: "Shoes",
            img: "/shoes.jpg",
            link: "/shop?cat=106"
        },
        {
            title: "Accessories",
            img: "/accessories.jpg",
            link: "/shop?cat=111"
        },
        {
            title: "T-Shirts",
            img: "/women.jpg",
            link: "/shop?cat=101"
        },
        {
            title: "Sweat Shirt",
            img: "/hoodies.jpg",
            link: "/shop?cat=107"
        },
        {
            title: "Jacket",
            img: "/images/pink-hair-girl.jpg",
            link: "/shop?cat=109"
        },
        {
            title: "Lowers",
            img: "/images/roller-crew.jpg",
            link: "/shop?cat=108"
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