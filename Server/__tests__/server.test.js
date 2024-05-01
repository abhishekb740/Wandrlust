const request = require('supertest');
const app = require('../index');
const user = require('../Models/user'); 
const client = require('../utils/redis'); // Import your Redis client
const Post = require('../Models/images'); // Import your Post model


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

