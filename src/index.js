import app from './app.js';

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
