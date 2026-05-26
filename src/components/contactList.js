import * as pug from 'pug';
import getAll from '../controllers/databaseController.js';

const safeHttpsUrl = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' ? url : null;
  } catch { return null; }
};

export const getContactList = async (_, res) => {
  try {
    const raw = await getAll('contact');
    const contacts = raw.map(c => ({
      ...c,
      url: safeHttpsUrl(c.url),
      lottie: safeHttpsUrl(c.lottie),
      svg: safeHttpsUrl(c.svg),
    }));

    let template = pug.compileFile('views/components/item/contact_grid.pug');
    let html = template({ contacts });
    res.send(html);
  } catch (err) {
    console.error('Failed to load contacts:', err);
    res.status(500).send('');
  }
}