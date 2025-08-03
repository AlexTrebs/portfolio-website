import * as pug from 'pug';
import getAll from '../controllers/databaseController.js';

const formatUnixToDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp.seconds * 1000); // Convert seconds to milliseconds
  const day   = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year  = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getExperienceList = async (_, res) => {
  const rawExperiences = await getAll('experience');
  const experiences = rawExperiences
    .sort((a, b) => b.start_date - a.start_date)
    .map((exp) => ({
      ...exp,
      start_date: formatUnixToDate(exp.start_date),
      end_date: exp.end_date ? formatUnixToDate(exp.end_date) : 'Present'
    }))

    let template = pug.compileFile('views/components/item/timeline_items.pug');
  
  let html = template({ experiences })
  res.send(html);
}