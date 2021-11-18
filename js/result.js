const params = {
    "lat": "40.68919",
    "distance": "1",
    "lon": "-73.992378"
}
let results = await Documenu.Restaurants.MenuItems.searchGeo(params)
Documenu.Restaurants.MenuItems.searchGeo(params)
.then(res=> {
    console.log(res);
}); 