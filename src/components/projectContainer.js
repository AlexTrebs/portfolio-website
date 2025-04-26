import axios from "axios";
import * as cheerio from "cheerio";
import * as pug from 'pug';

// Sample projects data (simulate your NoSQL DB documents)
const projects = [
  {
    _id: "tictactoe",
    title: "TicTacToe^2",
    image: "/assets/app1.jpg",
    remote: "http://localhost:3001",  // Not used in this example
    enable: true,
    description: "A simple game from childhood I developed so that I didn\'t have to carry around paper anymore!",
    demo: "/demos/app1.mp4",
    gif: "/assets/app1_demo.gif"
  },
  {
    _id: "project2",
    title: "Simple App",
    image: "/assets/app2.jpg",
    remote: "/apps/app2.html",
    enable: true,
    description: "A simple app for daily tasks."
  },
  {
    _id: "project3",
    title: "Demo App",
    image: "/assets/app3.jpg",
    remote: "/apps/app3.html",
    enable: true,
    demo: "/demos/app3.mp4"
  }
];

export const getProject = async (req, res) => {
  const project = projects.find(p => p._id === req.params.id);
  if (!project) {
    return res.status(404).send("Project not found");
  }

  let template = pug.compileFile('views/includes/project_container.pug');

  let html = template({ project: project })

  res.send(html);
}
