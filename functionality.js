/* Fetching patch notes from testdb.log for home page */
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
        if (category === "all" || items[i].id.includes(category)) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
}


/* Script to create item cards */
fetch('WC3 Items.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('itemGrid'); // Assuming an existing div

        data.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('itemCard');
            itemCard.id = item.rarity.replace(/\s+/g , '-').toLowerCase(); // Convert rarity to lowercase with dashes
            
            // Generate HTML for each item
            itemCard.innerHTML = `
                <img src="img/Items/${item.name.toLowerCase()}.png" class="item_img" alt="${item.name}">
                <h4>${item.name}</h4>
                <h6>(${item.rarity})</h6>
                <div class="item_description">
                    <p>${item.stats.join('<br>')}</p>
                </div>
                ${item.combination ? `<p>${item.combination}</p>` : ''}
            `;

            container.appendChild(itemCard);
        });
    })
    .catch(error => console.error('Error loading the items:', error));