import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import Photo from "../models/Photo";

const photosRouter = express.Router();

photosRouter.get('/', async (req: RequestWithUser, res, next) => {
    try {
        const filter: Record<string, unknown> = {};

        if (req.query.user) {
            filter.user = req.query.user;
        }

        const photos = await Photo.find(filter).populate('user', 'displayName');
        return res.send(photos);
    } catch (error) {
        next(error);
    }
});

photosRouter.post('/', auth, imagesUpload.single("image"), async (req: RequestWithUser, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not authenticated' });
        }

        const photo = await Photo.create({
            user: req.user._id,
            title: req.body.title,
            image: req.file?.filename,
        });
        return res.send(photo);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

photosRouter.delete('/:id', auth, async (req:RequestWithUser, res, next) => {
    try {
        const photo = await Photo.findOne({_id: req.params.id});

        if (!photo) {
            return res.status(404).send({error: 'Not found'});
        }

        if (photo.user.toString() === req.user?._id.toString() || req.user?.role === 'admin') {
            await photo.deleteOne({_id: req.params.id});
        } else {
            return res.status(403).send({error: 'Unauthorized'});
        }

        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
});

export default photosRouter;