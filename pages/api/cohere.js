// Define the API endpoint URL // add ride4food link here
const url = 'https://api.cohere.ai/nutrition-details';
const cohere = require('cohere-ai')

// Define the request payload
async function handler(req, res) {
    cohere.init('bos9DRyyptHo0iiX1upYJADSEHJh3oADDrZuooMK')

    // const payload = {
    //     food: req.body.foodName,
    // };

    // Set any necessary headers (e.g., authentication tokens)
    try {
        // Send a POST request to the API
        const response = await cohere.generate({
            model:'command-xlarge-nightly',
            max_tokens:200,
            prompt: `Tell me 1 nutrient facts in bullet points about ${req.body.foodName}`,
        });

        // return await response.json()
        console.log("result1", response.body.generations[0].text)
        // const result = await response.json()
        // console.log("result2", result)
        return res.status(200).json({
            result: response.body.generations[0].text
        })
    } catch (error) {
        console.error('Request error:', error);
    }
};

export default handler