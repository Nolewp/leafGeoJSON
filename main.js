// Initialize the map
const map = L.map('map').setView([0, 0], 2);

// Add a base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to handle file upload
document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const geojsonData = JSON.parse(e.target.result);
            const geojsonLayer = L.geoJSON(geojsonData, {
                onEachFeature: onEachFeature // Bind click events to each feature
            }).addTo(map);
            map.fitBounds(geojsonLayer.getBounds());  // Fit the map to GeoJSON bounds
        };
        reader.readAsText(file);
    }
});

// Function to handle each feature (add click event)
function onEachFeature(feature, layer) {
    layer.on('click', function() {
        showFeatureProperties(feature.properties);
    });
}

// Function to display feature properties in the sidebar
function showFeatureProperties(properties) {
    const propertiesDiv = document.getElementById('feature-properties');
    propertiesDiv.innerHTML = ''; // Clear previous content

    if (properties) {
        const propsTable = document.createElement('table');
        for (let key in properties) {
            const row = document.createElement('tr');
            const keyCell = document.createElement('td');
            const valueCell = document.createElement('td');
            keyCell.textContent = key.toUpperCase() + ': ' ;
            valueCell.textContent = properties[key];
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            propsTable.appendChild(row);
        }
        propertiesDiv.appendChild(propsTable);
    } else {
        propertiesDiv.innerHTML = '<p>No properties available.</p>';
    }
}