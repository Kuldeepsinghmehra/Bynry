export const fetchProfiles = async () => {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'John Cena',
            photo: `https://xsgames.co/randomusers/avatar.php?g=male&rand=${Math.random()}`,
            description: 'Software engineer with 5 years of experience in full-stack development.',
            location: { latitude: 37.7749, longitude: -122.4194 },
          },
          {
            id: 2,
            name: 'Randy orton',
            photo: `https://xsgames.co/randomusers/avatar.php?g=male&rand=${Math.random()}`,
            description: 'UX/UI designer with a passion for creating intuitive user experiences.',
            location: { latitude: 34.0522, longitude: -118.2437 },
          },
          // Add more profiles as needed
          {
            id:3,
            name:"The undertaker",
            photo:`https://xsgames.co/randomusers/avatar.php?g=male&rand=${Math.random()}`,
            description:"React developer with 2 years of experience in frontend",
            location: { latitude: 37.7749, longitude: -122.4194 },
          },
          {
            id:4,
            name:"Mary jane",
            photo:`https://xsgames.co/randomusers/avatar.php?g=female&rand=${Math.random()}`,
            description:"Fashion designer with 7 years of experience",
            location: { latitude: 37.7749, longitude: -122.4194 },


          },
          {
            id:5,
            name:"Sophia Taylor",
            photo:`https://xsgames.co/randomusers/avatar.php?g=female&rand=${Math.random()}`,
            description:"Working as human resource for 6 years",
            location: { latitude: 40.7128, longitude: -74.0060 }, 

          },
          {
            id:6,
            name:"Pooja thakur",
            photo:`https://xsgames.co/randomusers/avatar.php?g=female&rand=${Math.random()}`,
            description:"Working as science teacher for 8 years",
            location: { latitude: 40.7128, longitude: -74.0060 }, 

          },
          {
            id:7,
            name:"Madiha Sayed",
            photo:`https://xsgames.co/randomusers/avatar.php?g=female&rand=${Math.random()}`,
            description:"Working as pschologist for 9 years",
            location: { latitude: 37.7749, longitude: -122.4194 },

          },
          {
            id:8,
            name:"Kamal singh mehra",
            photo:`https://xsgames.co/randomusers/avatar.php?g=male&rand=${Math.random()}`,
            description:"Working as Electrical enginner for 8 years",
            location: { latitude: 34.0522, longitude: -118.2437 },

          },

        

        ]);
      }, 1000);
    });
  };


  export const addProfile = async (newProfile) => {
    // Simulate adding a profile
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newProfile);
      }, 500);
    });
  };
  
  // Function to update an existing profile
  export const updateProfile = async (updatedProfile) => {
    // Simulate updating a profile
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedProfile);
      }, 500);
    });
  };
  
  // Function to delete a profile
  export const deleteProfile = async (id) => {
    // Simulate deleting a profile
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  };
  