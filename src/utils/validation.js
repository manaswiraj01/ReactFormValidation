export const validateField = (name, value) => {
    let error = '';
  
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.trim().length < 2) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name should contain only letters`;
        }
        break;
  
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers, and underscores';
        }
        break;
  
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
  
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;
  
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          error = 'Phone number must be 10 digits';
        }
        break;
  
      case 'country':
        if (!value) {
          error = 'Country is required';
        }
        break;
  
      case 'city':
        if (!value) {
          error = 'City is required';
        }
        break;
  
      case 'panNumber':
        if (!value.trim()) {
          error = 'PAN number is required';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
          error = 'PAN number format: ABCDE1234F';
        }
        break;
  
      case 'aadharNumber':
        if (!value.trim()) {
          error = 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          error = 'Aadhar number must be 12 digits';
        }
        break;
  
      default:
        break;
    }
  
    return error;
  };