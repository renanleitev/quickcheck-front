# QuickCheck

Appointment scheduling application.

## Installation

Install dependencies:

```bash
npm i
```

To run the application:

```bash
npm start
```

Access `localhost:9090` in your browser to view the application.

## Changing environment variables

To run the backend at a different address, rename the `.env.example` file to `.env` and change the address value:

```env
VITE_BACKEND_URL="http://localhost:8080"
```

## Logging into the site (using mock data)

1. **Patient**:
   - Email: carlos.silva@gmail.com
   - Password: 123456

2. **Doctor**:
   - Email: dr.roberto.mendes@hospital.com
   - Password: 123456

3. **Hospital**:
   - Email: contato@hospitalportugues.com.br
   - Password: 123456

## Testing the project

To run tests:

```bash
npm run test
```

To get test coverage for tested files only:

```bash
npm run test:coverage
```

To get test coverage for all files:

```bash
npm run test:coverage:all
```

To find all test files, search in the Vs Code search bar:

```
describe
```

And click the three dots (...) to include files ending with:

```
*.test.js
```

Example:

![alt text](src/assets/image.png)
