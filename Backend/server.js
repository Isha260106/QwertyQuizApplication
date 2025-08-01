const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');
const userLoginRoutes=require('./routes/userLoginRoute')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);
app.use('/api/user',userLoginRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
