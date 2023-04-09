var latlngs = [
    // [4.656118, -74.161941],
    // [4.659419, -74.157200],
    // [4.656639, -74.153627],
    // [4.652487, -74.159344]
];

var polygons = [

];


var map = L.map('map').setView([4.6559819, -74.161334], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([4.6559819, -74.161334]).addTo(map)
    .bindPopup('Hola Mundo desde <b id="popup"> openstreetmap</b>')
    .openPopup();

   

    
let polyline  = null

   
map.addEventListener("click", (e) => {
    extractLatLng(e.latlng)
    renderPolyLine()
})






const renderPolyLine = () => {
    polyline = L.polyline(latlngs, { color: 'green' }).addTo(map);

    polyline.addEventListener("mouseover", (e) => {
        var lat = toRounded(e.latlng.lat)
        var lng = toRounded(e.latlng.lng)
        // console.info("mouseover", latlngs[0][0], latlngs[0][1], lat, lng);

        // Comparar el punto sobre el cual se hace hover y el primero agregado para decirle que puede crear ya un poligono


        if (latlngs[0] && latlngs[0][0] == lat && latlngs[0][1] == lng) {
            console.info("match", {lat, lng});
            alert("Acá se debe crear el poligono")
            let promp = prompt("Quieres crear el poligono ?", 1)
            if (promp == 1) {
                extractLatLng({lat, lng})
                renderPolyLine()
                let polygon = {
                    name: "NOMBRE XXX - " + Math.random(1.1000),
                    latlngs, 
                    color: "red"
                }

                polygons.push(polygon)

                latlngs = []

                localStorage.setItem("polygons", JSON.stringify(polygons))
                
            }

        }
    })
}


const extractLatLng = (latlng) => {
    return latlngs.push([toRounded(latlng.lat), toRounded(latlng.lng)])
}

const toRounded = (num) => {
    return Number(num).toFixed(4)
}





// Se utiliza cuando apenas se carga la página
// renderPolyLine()
