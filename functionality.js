document.addEventListener("DOMContentLoaded", function () {
    fetch("testdb.log")
        .then(response => response.text())
        .then(data => {
            document.getElementById("changelog").textContent = data;
        })
        .catch(error => {
            document.getElementById("changelog").textContent = "Failed to load patch notes.";
            console.error("Error loading patch notes:", error);
        });
});




/* Filter through drop down menu */
function filterItems() {
    var category = document.getElementById("itemCategory").value;
    var items = document.getElementsByClassName("itemCard");

    for (var i = 0; i < items.length; i++) {
        if (category === "all" || items[i].id === category) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
}