import Video from "../models/Video";


/*
console.log("start")
Video.find({}, (error, videos) => {
  return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/


export const home = async(req, res) => {
    console.log("I start");
    const videos = await Video.find({});
    console.log("I finish");
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
};


export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watching` })
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing` })
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
    const { title, description, hashtags } = req.body;
    const video = new Video({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        }
    });
    console.log(video);
    return res.redirect("/");
}