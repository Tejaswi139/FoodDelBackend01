const express = require("express");
let app = express();
app.use(express.urlencoded({ extended: true }));  // Middleware to parse form data
let jobs = require("./modals/jobModal");
let methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.set("view engine", "ejs");

app.get("/jobs", async (req, res) => {
    let AllJobs = await jobs.find({});
    res.render("jobs.ejs", { AllJobs });
});

app.post("/jobs", async (req, res) => {
    let { title, company, location, status } = req.body;
    await jobs.create({
        title: title,
        company: company,
        location: location,
        status: status
    });
    res.redirect('/jobs');
});

app.get("/jobs/new", (req, res) => {
    res.render("form.ejs");
});

app.get("/jobs/:id/edit", async (req, res) => {
    let { id } = req.params;
    let reqJob = await jobs.findById(id);
    res.render("edit.ejs", { reqJob });
});

app.put("/jobs/:id", async (req, res) => {
    let { id } = req.params;
    let { title, company, location, status } = req.body;
    await jobs.findByIdAndUpdate(id, {
        title: title,
        company: company,
        location: location,
        status: status
    });
    res.redirect('/jobs');
});

app.delete("/jobs/:id", async (req, res) => {
    let { id } = req.params;
    await jobs.findByIdAndDelete(id);
    res.redirect("/jobs");
});

app.listen(3030, () => {
    console.log("Server started on port 3030");
});
