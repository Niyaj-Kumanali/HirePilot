import fs from 'fs';
import https from 'https';

let API_KEY = "";
try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
    if (match) API_KEY = match[1].trim().replace(/^["']|["']$/g, '');
} catch (e) {
    console.error("Failed to read .env", e);
}

if (!API_KEY) {
    console.error("API KEY NOT FOUND");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("Available Models:");
                json.models.forEach(m => console.log(`- ${m.name}`));
            } else {
                console.log("No models found or error response:", JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.error("Failed to parse response", e);
            console.log("Raw Data:", data);
        }
    });
}).on('error', (err) => {
    console.error("Request failed", err);
});
