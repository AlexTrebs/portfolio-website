import * as pug from 'pug';

// Sample projects data (simulate your NoSQL DB documents)
const projects = [
  {
    _id: "tictactoe",
    title: "TicTacToe^2",
    icon: "https://raw.githubusercontent.com/AlexTrebs/shortcut/refs/heads/main/docs/images/small_icon.png",
    remote: "http://localhost:3001",  // Not used in this example
    enable: true,
    markdown: "https://raw.githubusercontent.com/AlexTrebs/shortcut/refs/heads/main/README.md"
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