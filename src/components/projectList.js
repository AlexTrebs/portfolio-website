import * as pug from 'pug';
import getAll from '../controllers/databaseController.js';

export const getProjectList = async (_, res) => {
  const projects = await getAll('projects');
  let template = pug.compileFile('views/components/sidebar_list.pug');
  
  let html = template({ projects: projects.filter(project => project.enable) })
  res.send(html);
}