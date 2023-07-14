let open_ai_response;

let conversation = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hi, how can i help you" },
];

async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "my happiness out  of 10 " + sentiment + " my question is: " + question,
  });
}

async function conversationAssistntAdd(response) {
  conversation.push({ role: "assistant", content: response });
}
async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
    // sk-

  let apiKey1 = "sk";
  let apiKey2 = "-BFXn6S1AlIDqGCX7xe3YT3Blbk";
  let apiKey3 = "FJbnCYChkNgKO6BHhVvfx2";
  let apiKey = apiKey1 + apiKey2 + apiKey3;
  let data = { model: "gpt-3.5-turbo", messages: conversation };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();

      const message = responseData.choices[0].message.content;
      console.log(message);
      conversationAssistntAdd(message);
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      return message;
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("there is an error:", error);
  }
}