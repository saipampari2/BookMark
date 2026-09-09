
let submitButton = document.getElementById("submitButton");

let editingBookmark = null;

// ===============================
// SITE NAME VALIDATION
// ===============================

siteNameInput.addEventListener("change", function () {
    if (siteNameInput.value.trim() === "") {
        siteNameErrMsg.textContent = "Required*";
    } else {
        siteNameErrMsg.textContent = "";
    }
});

// ===============================
// SITE URL VALIDATION
// ===============================

siteUrlInput.addEventListener("change", function () {
    if (siteUrlInput.value.trim() === "") {
        siteUrlErrMsg.textContent = "Required*";
    } else {
        siteUrlErrMsg.textContent = "";
    }
});

// ===============================
// LOAD BOOKMARKS FROM LOCALSTORAGE
// ===============================

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

bookmarks.forEach(function (bookmark) {
    createBookmark(bookmark.siteName, bookmark.siteUrl);
});

// ===============================
// FORM SUBMIT
// ===============================

bookmarkForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let siteName = siteNameInput.value.trim();
    let siteUrl = siteUrlInput.value.trim();

    let isValid = true;

    // Validate Site Name
    if (siteName === "") {
        siteNameErrMsg.textContent = "Required*";
        isValid = false;
    } else {
        siteNameErrMsg.textContent = "";
    }

    // Validate Site URL
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

    // ===============================
    // UPDATE
    // ===============================

    if (editingBookmark !== null) {

        let title = editingBookmark.querySelector(".bookmark-title");
        let link = editingBookmark.querySelector(".bookmark-link");

        title.textContent = siteName;

        link.textContent = siteUrl;
        link.href = siteUrl;

        // Update LocalStorage
        let index = editingBookmark.dataset.index;

        bookmarks[index].siteName = siteName;
        bookmarks[index].siteUrl = siteUrl;

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        // Reset editing mode
        editingBookmark = null;

        submitButton.textContent = "Add Bookmark";
    }

    // ===============================
    // CREATE
    // ===============================

    else {

        createBookmark(siteName, siteUrl);

        // Add to LocalStorage
        bookmarks.push({
            siteName: siteName,
            siteUrl: siteUrl
        });

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    // Clear inputs
    siteNameInput.value = "";
    siteUrlInput.value = "";
});

// ===============================
// CREATE BOOKMARK FUNCTION
// ===============================

function createBookmark(siteName, siteUrl) {

    // Create list item
    let listItem = document.createElement("li");

    // Create title
    let title = document.createElement("p");

    title.classList.add("bookmark-title");
    title.textContent = siteName;

    // Create link
    let link = document.createElement("a");

    link.classList.add("bookmark-link");
    link.href = siteUrl;
    link.target = "_blank";
    link.textContent = siteUrl;

    // ===============================
    // EDIT BUTTON
    // ===============================

    let editButton = document.createElement("button");

    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";

    // ===============================
    // DELETE BUTTON
    // ===============================

    let deleteButton = document.createElement("button");

    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    // ===============================
    // STORE INDEX
    // ===============================

    listItem.dataset.index = bookmarks.length;

    // ===============================
    // DELETE OPERATION
    // ===============================

    deleteButton.addEventListener("click", function () {

        let index = Number(listItem.dataset.index);

        // Remove from array
        bookmarks.splice(index, 1);

        // Update LocalStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        // Remove from UI
        listItem.remove();

        // Re-index remaining items
        let items = bookmarksList.querySelectorAll("li");

        items.forEach(function (item, newIndex) {
            item.dataset.index = newIndex;
        });
    });

    // ===============================
    // EDIT OPERATION
    // ===============================

    editButton.addEventListener("click", function () {

        // Put old values into input
        siteNameInput.value = title.textContent;

        siteUrlInput.value = link.href;

        // Store current bookmark
        editingBookmark = listItem;

        // Change button text
        submitButton.textContent = "Update Bookmark";
    });

    // ===============================
    // APPEND ELEMENTS
    // ===============================

    listItem.appendChild(title);
    listItem.appendChild(link);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Add list item to bookmarks list
    bookmarksList.appendChild(listItem);
}


