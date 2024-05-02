const request = require('supertest');
const app = require('../index');
const user = require('../Models/user'); 
const jwt = require('jsonwebtoken');


jest.mock('../models/user'); 
jest.mock('../utils/redis');
jest.mock('../Models/images');

describe('POST /getAllUsers', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should fetch all users', async () => {
    const mockUsers = [{ 
      "_id": "65e6df29d039e14fd416e751",
      "name": "Abhishek Bhagat",
      "phone": 7798984956,
      "email": "abhishekb740@gmail.com",
      "username": "FlameKaiser",
      "password": "12345678",
      "age": 20,
      "gender": "male",
      "blocked": false,
      "followers": [
        "65e6e382d039e14fd416e7ab",
        "65e6eebbd4662a5d73e9fd54",
        "65e6f69c6fb5e08e0fd9c247"
      ],
      "following": [
        "65e6eebbd4662a5d73e9fd54",
        "65e6f69c6fb5e08e0fd9c247",
        "65e6f55d1b7808d773538c13",
        "65e6e382d039e14fd416e7ab"
      ],
      "createdAt": "2024-03-05T09:00:25.313Z",
      "updatedAt": "2024-05-01T16:24:32.495Z",
      "__v": 0,
      "profileImage": "1709629612101--IMG-20231006-WA0007.jpg",
      "about": "Hello, I am a Blockchain Developer and a Traveller!"
    }, ];
    user.find.mockResolvedValue(mockUsers);

    const response = await request(app)
      .post('/getAllUsers')
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ users: mockUsers });
    expect(user.find).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Internal server error';
    user.find.mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post('/getAllUsers')
      .send();

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
    expect(user.find).toHaveBeenCalled();
  });

});

describe('POST /signup', () => {
  it('should create a new user', async () => {
    // Mock request body
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      username: 'testuser',
      password: 'password',
      age: 25
    };

    // Mock user.save to resolve successfully
    user.prototype.save.mockResolvedValue();

    // Send request to the route
    const response = await request(app)
      .post('/signup')
      .send(newUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User created successfully' });
    expect(user.prototype.save).toHaveBeenCalledWith(); // Ensure user.save is called with the new user data
  });

  it('should handle errors', async () => {
    // Mock request body
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      username: 'testuser',
      password: 'password',
      age: 25
    };

    // Mock user.save to reject with an error
    const errorMessage = 'Database error';
    user.prototype.save.mockRejectedValue(new Error(errorMessage));

    // Send request to the route
    const response = await request(app)
      .post('/signup')
      .send(newUser);

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
    expect(user.prototype.save).toHaveBeenCalledWith(); // Ensure user.save is called with the new user data
  });
});

describe('POST /signin', () => {
  it('should handle invalid credentials', async () => {
    // Mock request body with invalid credentials
    const credentials = {
      username: 'invaliduser',
      password: 'invalidpassword'
    };

    // Mock user.findOne to resolve with null (no user found)
    user.findOne.mockResolvedValue(null);

    // Send request to the route
    const response = await request(app)
      .post('/signin')
      .send(credentials);

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid username or password' });
  });

  it('should handle missing username/password', async () => {
    // Send request with missing username/password
    const response = await request(app)
      .post('/signin')
      .send({});

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Please provide username and password' });
  });

  it('should handle errors', async () => {
    // Mock request body
    const credentials = {
      username: 'testuser',
      password: 'password'
    };

    // Mock user.findOne to reject with an error
    const errorMessage = 'Database error';
    user.findOne.mockRejectedValue(new Error(errorMessage));

    // Send request to the route
    const response = await request(app)
      .post('/signin')
      .send(credentials);

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});
