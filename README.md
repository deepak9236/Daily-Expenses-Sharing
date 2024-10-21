# Daily Expenses Sharing Application

## Objective
Design and implement a backend for a daily-expenses sharing application. This application allows users to add expenses and split them based on three different methods: exact amounts, percentages, and equal splits. The application should manage user details, validate inputs, and generate downloadable balance sheets.

## Requirements

### User Management:
- Each user should have an email, name, and mobile number.

### Expense Management:
- Users can add expenses.
- Expenses can be split using three methods:
  1. **Equal**: Split equally among all participants.
  2. **Exact**: Specify the exact amount each participant owes.
  3. **Percentage**: Specify the percentage each participant owes based on the total amount.

### API Endpoints

1. **Create User**
   - **Method**: `POST`
   - **URL**: `/api/users`
   - **Request Body**:
     ```json
     {
       "name": "Deepak",
       "email": "Deepak@example.com",
       "mobile": "8726181062"
     }
     ```
   - **Response**: User object.

2. **Retrieve User Details**
   - **Method**: `GET`
   - **URL**: `/api/users/:userId`
   - **Headers**:
     ```text
     Authorization: Bearer <JWT Token>
     ```

3. **Add Expense (Equal Split)**
   - **Method**: `POST`
   - **URL**: `/api/expenses`
   - **Request Body**:
     ```json
     {
       "description": "Dinner",
       "totalAmount": 3000,
       "splitMethod": "equal",
       "participants": [
         { "user": "6715fc945ca3776106348d46", "amount": 1000 },
         { "user": "6715fa895ca3776106348d3f", "amount": 1000 },
         { "user": "6715fcab5ca3776106348d48", "amount": 1000 }
       ]
     }
     ```
   - **Response**: Expense object.

4. **Add Expense (Exact Split)**
   - **Method**: `POST`
   - **URL**: `/api/expenses`
   - **Request Body**:
     ```json
     {
       "description": "Shopping",
       "totalAmount": 4299,
       "splitMethod": "exact",
       "participants": [
         { "user": "6715fc945ca3776106348d46", "amount": 1500 },
         { "user": "6715fa895ca3776106348d3f", "amount": 799 },
         { "user": "6715fcab5ca3776106348d48", "amount": 2000 }
       ]
     }
     ```

5. **Add Expense (Percentage Split)**
   - **Method**: `POST`
   - **URL**: `/api/expenses`
   - **Request Body**:
     ```json
     {
       "description": "Party",
       "totalAmount": 1000,
       "splitMethod": "percentage",
       "participants": [
         { "user": "6715fc945ca3776106348d46", "percentage": 50 },
         { "user": "6715fa895ca3776106348d3f", "percentage": 25 },
         { "user": "6715fcab5ca3776106348d48", "percentage": 25 }
       ]
     }
     ```

6. **Retrieve All Expenses**
   - **Method**: `GET`
   - **URL**: `/api/expenses/all`
   - **Headers**:
     ```text
     Authorization: Bearer <JWT Token>
     ```

7. **Download Balance Sheet**
   - **Method**: `GET`
   - **URL**: `/api/expenses/download`
   - **Query Params**:
     ```text
     Autha=<value>
     ```
   - **Headers**:
     ```text
     Authorization: Bearer <JWT Token>
     ```

## Environment Configuration

### `.env` Configuration:
```bash
MONGO_URI=mongodb://localhost:27017/daily-expenses-sharing-app
PORT=5000
JWT_SECRET="kjdnsjkdns"
