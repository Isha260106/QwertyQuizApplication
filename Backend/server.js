const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes=require('./routes/userRoute');
const adminRoute=require('./routes/adminRoute')
// const adminLoginRoute=require('./routes/adminLoginRoute');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoute)
// app.use('/api/admin',adminLoginRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
