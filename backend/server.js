const app = require('./config/express');
const mongoose = require('./config/mongoose');

const PORT = process.env.PORT || 3000;

// cmt for testing CI/CD, test tiep, fail hoai :((, dm final version
mongoose.start();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));