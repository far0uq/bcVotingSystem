const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

app.use('/auth', authRoutes);


connectDB();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

