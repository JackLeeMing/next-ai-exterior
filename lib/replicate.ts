import Replicate from "replicate";
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export function getReplicate() {
    return replicate ? replicate : new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    })
}

export default getReplicate