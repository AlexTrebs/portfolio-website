import * as pug from 'pug';
import * as marked from 'marked';
import { getDocument } from '../controllers/databaseController.js';

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

export const getProject = async (req, res) => {
  const project = await getDocument('projects', 'shortcut');
  if (!project) {
    return res.status(404).send("Project not found");
  }

  if(stringIsAValidUrl(project.markdown)) {
    try {
      const response = await fetch(project.markdown);
      project.markdown = marked.parse(await response.text());
      console.log(project.markdown);
    } catch (error) {
      console.error("Markdown not found at ${project.markdown}");
    }
  }

  let template = pug.compileFile('views/includes/project_container.pug');
  let html = template({ project: project })

  res.send(html);
}
