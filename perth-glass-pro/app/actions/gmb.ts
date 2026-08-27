export async function getGmbData() {
    if (!process.env.GOOGLE_PLACES_API_KEY || !process.env.GOOGLE_PLACE_ID) {
        return { rating: 5.0, reviewCount: 41, address: "183 Stirling Hwy, Nedlands WA 6009" };
    }
    
    try {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        const placeId = process.env.GOOGLE_PLACE_ID;
        
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,formatted_address&key=${apiKey}`,
            { next: { revalidate: 86400 } }
        );
        
        const data = await response.json();
        
        if (data.result) {
            return {
                rating: data.result.rating || 5.0,
                reviewCount: data.result.user_ratings_total || 41,
                address: data.result.formatted_address || "183 Stirling Hwy, Nedlands WA 6009"
            };
        }
        return { rating: 5.0, reviewCount: 41, address: "183 Stirling Hwy, Nedlands WA 6009" };
    } catch (error) {
        console.error("GMB fetch error:", error);
        return { rating: 5.0, reviewCount: 41, address: "183 Stirling Hwy, Nedlands WA 6009" };
    }
}
