import axios from "axios";
let profiles=[
  {
    id: 1,
    name: 'John Cena',
    photo: `https://xsgames.co/randomusers/avatar.php?g=male&id=1`,
    description: 'Software engineer with 5 years of experience in full-stack development.',
    location: { latitude: 37.7749, longitude: -122.4194 },
    email: 'john.cena@example.com',
    phone: '+1 123-456-7890',
    interests: ['Wrestling', 'Coding', 'Gaming'],
    social: { twitter: '@johncena', linkedin: 'linkedin.com/in/johncena' }
  },
  {
    id: 2,
    name: 'Randy Orton',
    photo: `https://xsgames.co/randomusers/avatar.php?g=male&id=2`,
    description: 'UX/UI designer with a passion for creating intuitive user experiences.',
    location: { latitude: 34.0522, longitude: -118.2437 },
    email: 'randy.orton@example.com',
    phone: '+1 987-654-3210',
    interests: ['Designing', 'Traveling', 'Photography'],
    social: { twitter: '@randyorton', linkedin: 'linkedin.com/in/randyorton' }
  },
  {
    id: 3,
    name: 'The Undertaker',
    photo: `https://xsgames.co/randomusers/avatar.php?g=male&id=3`,
    description: 'React developer with 2 years of experience in frontend.',
    location: { latitude: 37.7749, longitude: -122.4194 },
    email: 'undertaker@example.com',
    phone: '+1 456-789-1234',
    interests: ['React', 'Horror Movies', 'Motorbikes'],
    social: { twitter: '@undertaker', linkedin: 'linkedin.com/in/undertaker' }
  },
  {
    id: 4,
    name: 'Mary Jane',
    photo: `https://xsgames.co/randomusers/avatar.php?g=female&id=4`,
    description: 'Fashion designer with 7 years of experience.',
    location: { latitude: 37.7749, longitude: -122.4194 },
    email: 'mary.jane@example.com',
    phone: '+1 321-654-9870',
    interests: ['Fashion', 'Art', 'Traveling'],
    social: { twitter: '@maryjane', linkedin: 'linkedin.com/in/maryjane' }
  },
  {
    id: 5,
    name: 'Sophia Taylor',
    photo: `https://xsgames.co/randomusers/avatar.php?g=female&id=5`,
    description: 'Working as human resource for 6 years.',
    location: { latitude: 40.7128, longitude: -74.0060 },
    email: 'sophia.taylor@example.com',
    phone: '+1 111-222-3333',
    interests: ['Human Resources', 'Reading', 'Cooking'],
    social: { twitter: '@sophiataylor', linkedin: 'linkedin.com/in/sophiataylor' }
  },
  {
    id: 6,
    name: 'Pooja Thakur',
    photo: `https://xsgames.co/randomusers/avatar.php?g=female&id=6`,
    description: 'Working as science teacher for 8 years.',
    location: { latitude: 40.7128, longitude: -74.0060 },
    email: 'pooja.thakur@example.com',
    phone: '+1 222-333-4444',
    interests: ['Teaching', 'Science', 'Gardening'],
    social: { twitter: '@poojathakur', linkedin: 'linkedin.com/in/poojathakur' }
  },
  {
    id: 7,
    name: 'Madiha Sayed',
    photo: `https://xsgames.co/randomusers/avatar.php?g=female&id=7`,
    description: 'Working as psychologist for 9 years.',
    location: { latitude: 37.7749, longitude: -122.4194 },
    email: 'madiha.sayed@example.com',
    phone: '+1 333-444-5555',
    interests: ['Psychology', 'Writing', 'Yoga'],
    social: { twitter: '@madihasayed', linkedin: 'linkedin.com/in/madihasayed' }
  },
  {
    id: 8,
    name: 'Kamal Singh Mehra',
    photo: `https://xsgames.co/randomusers/avatar.php?g=female&id=8`,
    description: 'Working as Electrical engineer for 8 years.',
    location: { latitude: 34.0522, longitude: -118.2437 },
    email: 'kamal.mehra@example.com',
    phone: '+1 444-555-6666',
    interests: ['Engineering', 'Robotics', 'Hiking'],
    social: { twitter: '@kamalsingh', linkedin: 'linkedin.com/in/kamalsingh' }
  },
  
]
export const fetchProfiles = async () => {
   
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...profiles]);
      }, 1000);
    });
  };


  export const addProfile = async (newProfile) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = profiles.length ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
        const profileToAdd = { ...newProfile, id: newId };
        profiles.push(profileToAdd);
        resolve(newProfile);
      }, 500);
    });
  };
  

  export const updateProfile = async (updatedProfile) => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        profiles = profiles.map(profile => profile.id === updatedProfile.id ? updatedProfile : profile);
        resolve(updatedProfile);
      }, 500);
    });
  };
  

  export const deleteProfile = async (id) => {
   
    return new Promise((resolve) => {
      setTimeout(() => {
        profiles = profiles.filter(profile => profile.id !== id);
        resolve(id);
      }, 500);
    });
  };

  export const reverseGeocode = async (latitude, longitude) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    return response.data.display_name;
  };
  