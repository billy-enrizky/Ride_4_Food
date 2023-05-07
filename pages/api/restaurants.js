import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Restaurant_and_Foods");

        const movies = await db
            .collection("Restaurants_Foods")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        res.json(movies);
    } catch (e) {
        console.error(e);
    }
}