db.cities.findOne({_id: "c0", "activities.name": "WED"});

db.cities.update({_id: city._id, createdBy: currentUserId}, {
    country: city.country,
    region: city.region,
    long: city.long,
    lat: city.lat,
    coordinates: city.coordinates,
    size: city.size,
    population: city.population,
    description: city.description
});

db.cities.update(
    {_id: "c0", "activities._id": "c0a0"},
    {$set: {"activities.$.nature": "place"}});