const shortenBtn = document.getElementById("shortenBtn");
const urlList = document.getElementById("urlList");

shortenBtn.addEventListener("click", async () => {
  const longUrl = document.getElementById("longUrl").value.trim();
  if (!longUrl) {
    alert("Please enter a URL!");
    return;
  }

  try {
    const response = await fetch("https://url-shortener-service.p.rapidapi.com/shorten", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "534df408a3msh50288b0db5a04a1p1a1522jsnc7445272dd3d",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com"
      },
      body: new URLSearchParams({
        url: longUrl
      })
    });

    const data = await response.json();
    console.log(data);

    const shortUrl = data.result_url || "Error: No short URL returned";

    const urlItem = document.createElement("div");
    urlItem.classList.add("url-item");
    urlItem.innerHTML = `
      <p><b>Original:</b> ${longUrl}</p>
      <p><b>Shortened:</b> <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
      <div class="url-actions">
        <button class="copy">Copy</button>
        <button class="visit" onclick="window.open('${shortUrl}', '_blank')">Visit</button>
      </div>
    `;

    urlItem.querySelector(".copy").addEventListener("click", () => {
      navigator.clipboard.writeText(shortUrl);
      alert("Copied: " + shortUrl);
    });

    urlList.prepend(urlItem);
    document.getElementById("longUrl").value = "";

  } catch (error) {
    console.error(error);
    alert("Error shortening URL. Check API key or request format.");
  }
});
