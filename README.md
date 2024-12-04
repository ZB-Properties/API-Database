# API and SQL database implementation

This API endpoints is constructed to assist with efficient data processing, integration of functional services and user authentication. It is designed to help construe the proper functionality of a website.

## Let's get started

### Prerequisites
Ensure you have the following are installed on your system:
- [Programming language/run server Node.js ]
- [Dependencies like npm or yarn]

### running the API
Start the API server:
 ```powershell
  [command to start the server; npm start or npm run start]
```

The API will be available at `http://localhost:[port]` (default: `http://localhost:5000`).

## API Endpoints

### Authentication
- **POST** `/auth/signup`
  - Request:
    ```json
    {
      "name": "username",
      "email": "emailaddress@gmail.com",
      "password": "password"
    }
    ```
  - Response:
    ```json
    {
    "id": "user.id",
    "name": "username",
    "email": "emailaddress@gmail.com"
    }
    ```
    - **POST** `/auth/signin`
  - Request:
    ```json
    {
     "email": "emailaddress@gmail.com",
    "password": "yourpassword"
    }
    ```
  - Response:
    ```json
    Success (200)
    {
      "token": "your jwt token"
    }
    Invalid credentials (401)
    {
    "message": "Invalid credentials"
    }
    ```
    - **POST** `/properties/postproperty`
  - Request:
    ```json
    {
    "title": "title of property",
    "description": "property description",
    "type": "property type",
    "price": "property price"
    }
    ```
  - Response:
    ```json
    Success (201)
    {
    "id": "user.id",
    "title": "title of property",
    "description": "property description",
    "type": "property type",
    "price": " property price",
    "status": "availability",
    "user_id": "user.id",
    "created_at": "date and time created"
   }
    Error (400)
    {
    "message": "Error message here"
    }
    ```
    - **PUT** `/properties/update/:id`
  - Request:
    ```json
    {
    "title": "updated title of property",
    "description": " updated property description",
    "type": "updated property type",
    "price": "updated property price"
    }
    ```
  - Response:
    ```json
    Success (200)
    {
    "id": "user.id",
    "title": "updated title of property",
    "description": " updated property description",
    "type": "updated property type",
    "price": "updated property price",
    "status": "availability",
    "user_id": "user.id",
    "created_at": "date and time created"
   }  
   Property not found / unauthorized(404)
    {
    "message": "Property not found or unauthorized"
    }
    ```
      - **DELETE** `/properties/delete/:id`
  - Request:
    ```json
     insert previous token into token bearer and click send
    ```
  - Response:
    ```json
      Success (200)
    {
      "message": "Property deleted successfully"
    }
    Property not found / unauthorized(404)
    {
    "message": "Property not found or unauthorized"
    }
    ```
      - **PATCH** `/properties/:id/sold`
  - Request:
    ```json
      insert previous token into token bearer and click send
    ```
  - Response:
    ```json
    Success (200)
    {
    "id": "user.id",
    "title": "title of property",
    "description": "property description",
    "type": "property type",
    "price": "property price",
    "status": "sold",
    "user_id": "user.id",
    "created_at": "date and time sold"
   }
   Property not found / unauthorized(404)
    {
    "message": "Property not found or unauthorized"
    }
    ```
     - **GET** `/properties/properties`
  - Request:
    ```json
     insert previous token into token bearer and click send
    ```
  - Response:
    ```json
    Success (200)
    user will be able to view all properties
   Error (400)
   {
    "message": "Error message here"
   }
   if database query fails 
   {
    "message": "relation 'properties' does not exist"
   }
    ```
  - **GET** `/properties/propertytype?type= property type`
  - Request:
    ```json
      insert previous token into token bearer and click send
    ```
  - Response:
    ```json
    Success (200)
    {
    "id": "user.id",
    "title": "title of exact property",
    "description": "exact property description",
    "type": "property type",
    "price": "property price",
    "status": "sold",
    "user_id": "user.id",
    "created_at": "date and time sold"
   }
   Property not found / unauthorized(404)
    {
    "message": "Property not found or unauthorized"
    }
    ```
   - **GET** `/properties/specificproperty/:id`
  - Request:
    ```json
      insert previous token into token bearer and click send
    ```
  - Response:
    ```json
    Success (200)
    {
    "id": "user.id",
    "title": "title of exact property",
    "description": "exact property description",
    "type": "property type",
    "price": "property price",
    "status": "sold",
    "user_id": "user.id",
    "created_at": "date and time sold"
   }
   Property not found / unauthorized(404)
    {
    "message": "Property not found or unauthorized"
    }
    ```
  

## Contributing

You are welcome to contributing, Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your fork and submit a pull request.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
