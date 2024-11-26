var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getChatCompletion = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.x.ai/v1/chat/completions";
    const apiKey = process.env.GROK_API_KEY;
    const payload = {
        messages: [
            {
                role: "system",
                content: "You are a telegram assistant of the club gdsc ensta national higher school of adnced technologies we have 5 dapertments web dev app dev cyber sec and ai and cultural.",
            },
            {
                role: "user",
                content: text,
            },
        ],
        model: "grok-beta",
        stream: false,
        temperature: 0,
        max_tokens: 60,
    };
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };
    const response = yield fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
    });
    const data = yield response.json();
    return data;
});
export { getChatCompletion };
