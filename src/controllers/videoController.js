import Video from "../models/Video";

export const home = async(req, res) => {
    console.log("I start");
    const videos = await Video.find({});
    console.log("I finish");
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }
    return res.render("watch", { pageTitle: video.title, video })
};

export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video })
};

export const postEdit = async(req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
    }

}