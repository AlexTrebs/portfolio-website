import * as pug from 'pug';
import * as fs from 'node:fs';
import * as marked from 'marked';

// Sample projects data (simulate your NoSQL DB documents)
const projects = [
  {
    _id: "tictactoe",
    title: "TicTacToe^2",
    icon: "/assets/app1.jpg",
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

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

export const getProject = async (req, res) => {
  const project = projects.find(p => p._id === req.params.id);
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
