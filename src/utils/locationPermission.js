const locationPermission = async () => {
    try {
      if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // User allowed access to their location
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
  
              console.log(
                `User's location: Latitude ${latitude}, Longitude ${longitude}`
              );
  
              resolve({ lat: +latitude, lng: +longitude });
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                // User denied access to their location
                console.error("User denied access to their location.");
                reject("User denied access to their location.");
              } else {
                // Handle other geolocation-related errors
                console.error("Error getting geolocation: " + error.message);
                reject("Error getting geolocation: " + error.message);
              }
            }
          );
        });
      } else {
        console.error("Geolocation is not supported by your browser.");
        return Promise.reject("Geolocation is not supported by your browser.");
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  
  export default locationPermission;