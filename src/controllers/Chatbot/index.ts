const getChatCompletion = async (text: string): Promise<string> => {
    const url = "https://api.x.ai/v1/chat/completions";
    const apiKey = process.env.GRKO_API_KEY;

    const payload = {
        messages: [
            {
                role: "system",
                content: "You are a test assistant.",
            },
            {
                role: "user",
                content: text,
            },
        ],
        model: "grok-beta",
        stream: false,
        temperature: 0,
    };

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
};
export { getChatCompletion };
