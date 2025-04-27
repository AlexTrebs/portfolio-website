import * as pug from 'pug';
import * as fs from 'node:fs';

// Sample projects data (simulate your NoSQL DB documents)
const projects = [
  {
    _id: "tictactoe",
    title: "TicTacToe^2",
    icon: "/assets/app1.jpg",
    remote: "http://localhost:3001",  // Not used in this example
    enable: true,
    markdown: fs.readFileSync('./shortcut.md').toString()
  },
  {
    _id: "project2",
    title: "Simple App",
    icon: "/assets/app2.jpg",
    remote: "/apps/app2.html",
    enable: true,
  },
  {
    _id: "project3",
    title: "Demo App",
    icon: "/assets/app3.jpg",
    remote: "/apps/app3.html",
    enable: true,
  }
];

export const getProjectList = (_, res) => {
  const enabledProjects = projects.filter(project => project.enable);
  let template = pug.compileFile('views/includes/sidebar_list.pug');

  let html = template({ projects: enabledProjects })
  res.send(html);
}