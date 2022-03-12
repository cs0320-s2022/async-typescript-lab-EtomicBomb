// TODO: select the list element where the suggestions should go, and all three dropdown elements
//  HINT: look at the HTML

const suggestions = document.getElementById("suggestions") as HTMLUListElement;

const sun = document.getElementById("sun") as HTMLOptionElement;
const moon = document.getElementById("moon") as HTMLOptionElement;
const rising = document.getElementById("rising") as HTMLOptionElement;



sun.addEventListener("change", postAndUpdate);
moon.addEventListener("change", postAndUpdate);
rising.addEventListener("change", postAndUpdate);


type MatchesRequestData = {
  sun: string,
  moon: string,
  rising: string,
}

type Matches = {
  suggestions: string[],
}


async function postAndUpdate(): Promise<void> {
  suggestions.innerHTML = "";

  const postParameters: MatchesRequestData = {
    sun: sun.value,
    moon: moon.value,
    rising: rising.value,
  };

  const result = await fetch("http://127.0.0.1:4567/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(postParameters),
  });

  const matches = await result.json() as Matches;

  updateSuggestions(matches.suggestions)
}

function updateSuggestions(matches: string[]): void {

  // TODO: for each element in the set of matches, append it to the suggestionList
  //  HINT: use innerHTML += to append to the suggestions list
  //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
  //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
  //  This makes each element selectable via screen reader.
  for (let i = 0; i< matches.length; i++) {
    suggestions.innerHTML += `<li tabindex="${i}">${matches[i]}</li>`
  }
}

// TODO: create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().

document.addEventListener("keyup", async (event) => {
  if (event.key != "a") return;

  await updateValues("Gemini", "Gemini", "Gemini");

  await postAndUpdate();
});

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void>{
  // This line asynchronously waits 1 second before updating the values.
  // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
  await new Promise(resolve => setTimeout(resolve, 1000));

  sun.value = sunval;
  moon.value = moonval;
  rising.value = risingval;
}
