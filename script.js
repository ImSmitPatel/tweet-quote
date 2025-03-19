document.addEventListener("DOMContentLoaded", function () {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const newQuoteBtn = document.getElementById("new-quote");
    const copyBtn = document.getElementById("copy-quote");
    const twitterBtn = document.getElementById("share-twitter");
    const exportBtn = document.getElementById("export-quote");

    async function fetchQuote() {
        try {
            const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
            const data = await response.json();
            if (data.success) {
                quoteText.textContent = `"${data.data.content}"`;
                quoteAuthor.textContent = `- ${data.data.author}`;
            }
        } catch (error) {
            quoteText.textContent = "Failed to load quote. Try again.";
            quoteAuthor.textContent = "";
        }
    }

    function copyToClipboard() {
        const textToCopy = `${quoteText.textContent} ${quoteAuthor.textContent}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Quote copied to clipboard!");
        });
    }

    function shareOnTwitter() {
        const textToShare = `${quoteText.textContent} ${quoteAuthor.textContent} #quotes #imsmitpatel`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}`;
        window.open(twitterUrl, "_blank");
    }

    function exportQuoteAsImage() {
        const element = document.querySelector(".tweet-wrap");
        html2canvas(element, { scale: 2 }).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "quote.png";
            link.click();
        });
    }

    newQuoteBtn.addEventListener("click", fetchQuote);
    copyBtn.addEventListener("click", copyToClipboard);
    twitterBtn.addEventListener("click", shareOnTwitter);
    exportBtn.addEventListener("click", exportQuoteAsImage);

    fetchQuote();
});
