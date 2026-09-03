let bookmarkForm = document.getElementById("bookmarkForm");

let siteNameInput = document.getElementById("siteNameInput");
let siteUrlInput = document.getElementById("siteUrlInput");

let siteNameErrMsg = document.getElementById("siteNameErrMsg");
let siteUrlErrMsg = document.getElementById("siteUrlErrMsg");

let bookmarksList = document.getElementById("bookmarksList");

let submitButton = document.getElementById("submitButton");

// Used to store which bookmark we are editing
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
    // UPDATE OPERATION
    // ===============================

    if (editingBookmark !== null) {

        let title = editingBookmark.querySelector(".bookmark-title");
        let link = editingBookmark.querySelector(".bookmark-link");

        title.textContent = siteName;

        link.textContent = siteUrl;
        link.href = siteUrl;

        // Reset editing mode

        editingBookmark = null;

        submitButton.textContent = "Add Bookmark";

    }

    // ===============================
    // CREATE OPERATION
    // ===============================

    else {

        createBookmark(siteName, siteUrl);

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
    // DELETE OPERATION
    // ===============================

    deleteButton.addEventListener("click", function () {

        listItem.remove();

    });


    // ===============================
    // UPDATE OPERATION
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


    // Add elements to list item

    listItem.appendChild(title);

    listItem.appendChild(link);

    listItem.appendChild(editButton);

    listItem.appendChild(deleteButton);


    // Add list item to bookmarks list

    bookmarksList.appendChild(listItem);

}
});
