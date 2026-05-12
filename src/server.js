const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const PORT = process.env.PORT;
console.log(`Server is starting on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

