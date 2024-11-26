import dotenv from "dotenv";
dotenv.config();

export type GROK_RESPONSE = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
    system_fingerprint: string;
};

export type Choice = {
    index: number;
    message: Message;
    finish_reason: string;
};

export type Message = {
    role: string;
    content: string;
    refusal: null;
};

export type Usage = {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: PromptTokensDetails;
};

export type PromptTokensDetails = {
    text_tokens: number;
    audio_tokens: number;
    image_tokens: number;
    cached_tokens: number;
};

const getChatCompletion = async (text: string): Promise<GROK_RESPONSE> => {
    const url = "https://api.x.ai/v1/completions";
    const apiKey = process.env.GROK_API_KEY;
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
