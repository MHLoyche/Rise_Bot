/* Fetching patch notes from testdb.log for home page */
document.addEventListener("DOMContentLoaded", function () {
    fetch("patchnotes.log")
        .then(response => response.text())
        .then(data => {
            document.getElementById("changelog").textContent = data;
        })
        .catch(error => {
            document.getElementById("changelog").textContent = "Failed to load patch notes.";
            console.error("Error loading patch notes:", error);
        });
});

/* Fetching downloadlinks.log for download page */
document.addEventListener("DOMContentLoaded", function () {
    fetch("downloadlinks.log")
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById("new_download");
            const entries = data.split("---").map(entry => entry.trim()).filter(Boolean);

            container.innerHTML = entries.map(entry => {
                const match = entry.match(/(Rise_v[\d.]+)\s+(https?:\/\/[^\s]+)(.*)?/);
                if (match) {
                    const version = match[1];
                    const url = match[2];
                    const note = match[3] ? match[3].trim() : "";

                    return `
                        <div style="margin-bottom: 1em;">
                            <strong>${version}</strong>: 
                            <a href="${url}" target="_blank">${url}</a>
                            ${note ? `<em> – ${note}</em>` : ""}
                        </div>
                    `;
                } else {
                    return `<div>${entry}</div>`; // fallback for unrecognized lines
                }
            }).join("");
        })
        .catch(error => {
            document.getElementById("new_download").textContent = "Failed to load download links.";
            console.error("Error loading download links.", error);
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
        const container = document.getElementById('itemGrid'); // Getting div to append item cards to

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
                ${item.combination ? `<p style="font-size: 13px;">${item.combination}</p>` : ''}
            `;

            container.appendChild(itemCard);
        });
    })
    .catch(error => console.error('Error loading the items:', error));


/* Search bar functionality */
function searchGrid() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let items = document.querySelectorAll('.itemCard');
    
    items.forEach(item => {
        let text = item.textContent || item.innerText;
        if (text.toLowerCase().includes(input)) {
            item.style.display = "block"; // Show the item
        } else {
            item.style.display = "none"; // Hide the item
        }
    });
}
    