

// ======================================
// GET HTML ELEMENTS
// ======================================

let bookmarkForm = document.getElementById("bookmarkForm");

let siteNameInput = document.getElementById("siteNameInput");
let siteUrlInput = document.getElementById("siteUrlInput");

let siteNameErrMsg = document.getElementById("siteNameErrMsg");
let siteUrlErrMsg = document.getElementById("siteUrlErrMsg");

let submitButton = document.getElementById("submitBtn");

let bookmarksList = document.getElementById("bookmarksList");


// ======================================
// LOCAL STORAGE
// ======================================

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];


// ======================================
// FIX OLD URLS
// ======================================

bookmarks = bookmarks.map(function (bookmark) {

    let url = bookmark.siteUrl.trim();

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {
        url = "https://" + url;
    }

    return {
        siteName: bookmark.siteName,
        siteUrl: url
    };
});

localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
);


// ======================================
// DISPLAY SAVED BOOKMARKS
// ======================================

bookmarks.forEach(function (bookmark, index) {

    createBookmark(
        bookmark.siteName,
        bookmark.siteUrl,
        index
    );

});


// ======================================
// SITE NAME VALIDATION
// ======================================

siteNameInput.addEventListener("change", function () {

    if (siteNameInput.value.trim() === "") {
        siteNameErrMsg.textContent = "Required*";
    } else {
        siteNameErrMsg.textContent = "";
    }

});


// ======================================
// SITE URL VALIDATION
// ======================================

siteUrlInput.addEventListener("change", function () {

    if (siteUrlInput.value.trim() === "") {
        siteUrlErrMsg.textContent = "Required*";
    } else {
        siteUrlErrMsg.textContent = "";
    }

});


// ======================================
// FORM SUBMIT
// ======================================

bookmarkForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let siteName = siteNameInput.value.trim();
    let siteUrl = siteUrlInput.value.trim();

    let isValid = true;


    // ==================================
    // VALIDATE SITE NAME
    // ==================================

    if (siteName === "") {

        siteNameErrMsg.textContent = "Required*";
        isValid = false;

    } else {

        siteNameErrMsg.textContent = "";

    }


    // ==================================
    // VALIDATE SITE URL
    // ==================================

    if (siteUrl === "") {

        siteUrlErrMsg.textContent = "Required*";
        isValid = false;

    } else {

        siteUrlErrMsg.textContent = "";

    }


    // Stop if validation fails
    if (!isValid) {
        return;
    }


    // ==================================
    // ADD HTTPS
    // ==================================

    if (
        !siteUrl.startsWith("http://") &&
        !siteUrl.startsWith("https://")
    ) {
        siteUrl = "https://" + siteUrl;
    }


    // ==================================
    // UPDATE BOOKMARK
    // ==================================

    if (editingBookmark !== null) {

        let index = Number(editingBookmark.dataset.index);

        let title =
            editingBookmark.querySelector(".bookmark-title");

        let link =
            editingBookmark.querySelector(".bookmark-link");

        title.textContent = siteName;

        link.textContent = siteUrl;

        link.href = siteUrl;


        // Update array
        bookmarks[index] = {
            siteName: siteName,
            siteUrl: siteUrl
        };


        // Update LocalStorage
        localStorage.setItem(
            "bookmarks",
            JSON.stringify(bookmarks)
        );


        // Exit edit mode
        editingBookmark = null;

        submitButton.textContent = "Submit";

    }


    // ==================================
    // CREATE BOOKMARK
    // ==================================

    else {

        bookmarks.push({
            siteName: siteName,
            siteUrl: siteUrl
        });


        // Save to LocalStorage
        localStorage.setItem(
            "bookmarks",
            JSON.stringify(bookmarks)
        );


        // Create UI
        createBookmark(
            siteName,
            siteUrl,
            bookmarks.length - 1
        );

    }


    // Clear inputs
    siteNameInput.value = "";
    siteUrlInput.value = "";

});


// ======================================
// EDITING VARIABLE
// ======================================

let editingBookmark = null;


// ======================================
// CREATE BOOKMARK
// ======================================

function createBookmark(siteName, siteUrl, index) {

    let listItem = document.createElement("li");

    listItem.dataset.index = index;


    // ==================================
    // TITLE
    // ==================================

    let title = document.createElement("p");

    title.classList.add("bookmark-title");

    title.textContent = siteName;


    // ==================================
    // LINK
    // ==================================

    let link = document.createElement("a");

    link.classList.add("bookmark-link");

    if (
        !siteUrl.startsWith("http://") &&
        !siteUrl.startsWith("https://")
    ) {
        siteUrl = "https://" + siteUrl;
    }

    link.href = siteUrl;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    link.textContent = siteUrl;


    // ==================================
    // EDIT BUTTON
    // ==================================

    let editButton = document.createElement("button");

    editButton.classList.add("edit-btn");

    editButton.textContent = "Edit";


    // ==================================
    // DELETE BUTTON
    // ==================================

    let deleteButton = document.createElement("button");

    deleteButton.classList.add("delete-btn");

    deleteButton.textContent = "Delete";


    // ==================================
    // DELETE
    // ==================================

    deleteButton.addEventListener("click", function () {

        let index = Number(listItem.dataset.index);

        bookmarks.splice(index, 1);

        localStorage.setItem(
            "bookmarks",
            JSON.stringify(bookmarks)
        );

        listItem.remove();


        // Re-index
        let items =
            bookmarksList.querySelectorAll("li");

        items.forEach(function (item, newIndex) {

            item.dataset.index = newIndex;

        });

    });


    // ==================================
    // EDIT
    // ==================================

    editButton.addEventListener("click", function () {

        siteNameInput.value = title.textContent;

        siteUrlInput.value = link.href;

        editingBookmark = listItem;

        submitButton.textContent = "Update";

    });


    // ==================================
    // APPEND
    // ==================================

    listItem.appendChild(title);

    listItem.appendChild(link);

    listItem.appendChild(editButton);

    listItem.appendChild(deleteButton);

    bookmarksList.appendChild(listItem);
}


