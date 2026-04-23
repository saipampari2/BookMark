let bookmarkForm = document.getElementById("bookmarkForm");
let siteNameInput = document.getElementById("siteNameInput");
let siteUrlInput = document.getElementById("siteUrlInput");
let siteNameErrMsg = document.getElementById("siteNameErrMsg");
let siteUrlErrMsg = document.getElementById("siteUrlErrMsg");
let bookmarksList = document.getElementById("bookmarksList");

// Change event for Site Name
siteNameInput.addEventListener("change", function() {
    if (siteNameInput.value === "") {
        siteNameErrMsg.textContent = "Required*";
    } else {
        siteNameErrMsg.textContent = "";
    }
});

// Change event for Site URL
siteUrlInput.addEventListener("change", function() {
    if (siteUrlInput.value === "") {
        siteUrlErrMsg.textContent = "Required*";
    } else {
        siteUrlErrMsg.textContent = "";
    }
});

// Form submit
bookmarkForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let siteName = siteNameInput.value;
    let siteUrl = siteUrlInput.value;
    let isValid = true;

    if (siteName === "") {
        siteNameErrMsg.textContent = "Required*";
        isValid = false;
    } else {
        siteNameErrMsg.textContent = "";
    }

    if (siteUrl === "") {
        siteUrlErrMsg.textContent = "Required*";
        isValid = false;
    } else {
        siteUrlErrMsg.textContent = "";
    }

    if (isValid) {
        let listItem = document.createElement("li");

        let title = document.createElement("p");
        title.textContent = siteName;

        let link = document.createElement("a");
        link.href = siteUrl;
        link.target = "_blank";
        link.textContent = siteUrl;

        listItem.appendChild(title);
        listItem.appendChild(link);

        bookmarksList.appendChild(listItem);

        siteNameInput.value = "";
        siteUrlInput.value = "";
    }
});