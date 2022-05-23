import React, { useState } from "react";
import "../App.css";
const { Configuration, OpenAIApi } = require("openai");

export const FoodDescription = () => {
  const [newItem, setNewItem] = useState("");
  const [newResponse, setNewResponse] = useState(null);
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState({
    prompt: "",
    response: "",
  });

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  /* Calls the OpenAI API to get a response */

  async function getResponse(newItem) {
    const response = await openai.createCompletion("text-curie-001", {
      prompt: newItem,
      temperature: 0.8,
      max_tokens: 69,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setInfo({
      prompt: newItem,
      response: response.data.choices[0].text,
    });
    setNewResponse(response.data.choices[0].text);
  }

  /* Adds a new item to the list array*/
  const addItem = (e) => {
    // ! Check for empty item
    e.preventDefault();
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }
    getResponse(newItem);

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: info,
    };

    // Add new item to items array
    setItems((oldList) => [item, ...oldList]);
    // Reset newItem back to original state
    setNewItem("");
  };
  return (
    <>
      <main>
        <div>
          {" "}
          <h1>Ask the bot to describe any food you type.</h1>
          <input
            type="text"
            id="food-input"
            placeholder="Write a description of a ?????"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button id="food-submit" onClick={(e) => addItem(e)}>
            Submit
          </button>
          <br />
          <h2>Prompt: {newItem}</h2> <br />
          <h2 id="bot">AiAi 🤖: {newResponse}</h2>
          <ul>
            <br></br>
            <div>
              <h4>Previous Queries:</h4>
              {items.map((item) => {
                return (
                  <div class="food-responses">
                    {" "}
                    <li key={item.id}>
                      <strong>{item.value.prompt}</strong>
                      <br></br>
                      <div id="descriptions">{item.value.response}</div>
                    </li>{" "}
                  </div>
                );
              })}
            </div>
          </ul>
        </div>
      </main>
    </>
  );
};

export default FoodDescription;
