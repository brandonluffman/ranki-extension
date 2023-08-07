// function getH1Text() {
//   chrome.tabs.executeScript({ code: "document.querySelector('h1').textContent" }, function(result) {
//     var h1Text = result[0];
//     document.getElementById("h1-text").innerHTML = h1Text;
//   });
// }

// document.getElementById("get-h1-btn").addEventListener("click", getH1Text);

// async function fetchData() {
//   const loadingScreen = document.getElementById("loading-screen");
//   const content = document.getElementById("content");

//   try {
//     const res = await fetch(`https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/products/${h1Text}`);
//     const record = await res.json();
//     document.getElementById("date").innerHTML = record[0][1];
//     const imageUrl = record[0][2];
//     document.getElementById("product-img").setAttribute("src", imageUrl);
//   } catch (error) {
//     console.error(error);
//     // Handle error
//   } finally {
//     loadingScreen.style.display = "none";
//     content.style.display = "flex";
//   }
// }

// fetchData();

async function getH1Text() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const h1Text = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      return document.querySelector('h1').textContent;
    }
  });

  document.getElementById("h1-text").innerHTML = h1Text[0].result.replace(/ /g, ' ');
  fetchData(h1Text[0].result.replace('Buy ', ''));
}

async function fetchData(h1Text) {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.getElementById("content");
  const btn = document.getElementById("get-h1-btn");


  try {
    loadingScreen.style.display = "flex";
    content.style.display = "none";
    btn.style.display = "none";
    const res = await fetch(`https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/products/${h1Text}`);
    const record = await res.json();
    document.getElementById("title").innerHTML = record[0][1];
    const imageUrl = record[0][2];
    document.getElementById("product-img").setAttribute("src", imageUrl);
    const buyingLinks = record[0][3];
    const linksElement = document.getElementById("links");
    linksElement.innerHTML = ""; // Clear any existing content

    for (const link of buyingLinks) {
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", link);
      linkElement.setAttribute("class", "buying-link"); // Add a class
      linkElement.textContent = link;
      linkElement.setAttribute("rel", "noopener noreferrer"); // Set rel to "noopener noreferrer"
      linkElement.setAttribute("target", "_blank");
      linksElement.appendChild(linkElement);
    }


  } catch (error) {
    console.error(error);
    // Handle error
  } finally {
    loadingScreen.style.display = "none";
    content.style.display = "flex";
  }
}

document.getElementById("get-h1-btn").addEventListener("click", getH1Text);