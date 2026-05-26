import * as pug from 'pug';
import * as marked from 'marked';
import sanitizeHtml from 'sanitize-html';
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
  const project = await getDocument('projects', req.params.id);
  if (!project) {
    return res.status(404).send("Project not found");
  }

  if(stringIsAValidUrl(project.markdown)) {
    try {
      const response = await fetch(project.markdown);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      project.markdown = sanitizeHtml(await marked.parse(await response.text()), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'pre', 'code']),
        allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
      });
    } catch (error) {
      console.error(`Markdown not found at ${project.markdown}`);
      project.markdown = '';
    }
  }

  let template = pug.compileFile('views/page/project_container.pug');
  let html = template({ project: project })

  res.send(html);
}
