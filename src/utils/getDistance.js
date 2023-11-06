function getDistance(location1, location2) {
    const R = 6371000; // Radius of the Earth in meters (approximately 6,371,000 meters)
    const dLat = (location2.lat - location1.lat) * (Math.PI / 180);
    const dLon = (location2.lng - location1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(location1.lat * (Math.PI / 180)) * Math.cos(location2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    console.log(distance)
    return distance;
  }
  
  export default getDistance;
  