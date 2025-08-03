import * as pug from 'pug';
import getAll from '../controllers/databaseController.js';

export const getContactList = async (_, res) => {
  const contacts = await getAll('contact');

  let template = pug.compileFile('views/components/item/contact_grid.pug');
  
  let html = template({ contacts })
  res.send(html);
}