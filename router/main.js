module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index", {
      title: "MY HOMEPAGE",
      length: 5,
    });
  });
  app.get("/about", (req, res) => {
    res.render("about.html");
  });
};
