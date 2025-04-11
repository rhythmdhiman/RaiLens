const Train = require('../models/train');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const trains = await Train.find({});
    res.render('trains/index', { trains })
}

module.exports.renderNewForm = (req, res) => {
    res.render('trains/new');
}

module.exports.createTrain = async (req, res, next) => {
    const train = new Train(req.body.train);
    train.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    train.author = req.user._id;
    await train.save();
    req.flash('success', 'Successfully made a new train!');
    res.redirect(`/trains/${train._id}`)
}

module.exports.showTrain = async (req, res,) => {
    const train = await Train.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!train) {
        req.flash('error', 'Cannot find that train!');
        return res.redirect('/trains');
    }
    res.render('trains/show', { train });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const train = await Train.findById(id)
    if (!train) {
        req.flash('error', 'Cannot find that train!');
        return res.redirect('/trains');
    }
    res.render('trains/edit', { train });
}

module.exports.updateTrain = async (req, res) => {
    const { id } = req.params;
    const train = await Train.findByIdAndUpdate(id, { ...req.body.train });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    train.images.push(...imgs);
    await train.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await train.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated train!');
    res.redirect(`/trains/${train._id}`)
}

module.exports.deleteTrain = async (req, res) => {
    const { id } = req.params;
    await Train.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted train')
    res.redirect('/trains');
}