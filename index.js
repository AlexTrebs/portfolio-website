import express from 'express';
import { getProject } from './src/components/projectContainer.js';
import { getProjectList } from './src/components/projectList.js';
import './src/routes/home.js';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static assets from the "public" folder
app.use(express.static('assets'));
app.use(compression());

// Endpoint: Return HTML for the sidebar buttons
app.get("/load/projects-list", getProjectList);

// Endpoint: Load microfrontend snippet for a given project
app.get("/load/:id", getProject);

// Serve the main static HTML page
app.get('/', (_, res) => {
  res.render('index');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
