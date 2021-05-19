import PostModel from './../models/post';
const getAllPost = async (req, res) => {
    let keyword = req.query.keyword;
    console.log(keyword)
    let listPOst;
    if (keyword) {
        keyword.trim()
        listPOst = await PostModel.find({
            $or: [
                { title: new RegExp(keyword) },
                { body: new RegExp(keyword) }
            ]
        });
    } else {
        listPOst = await PostModel.find()
    }
    return res.status(201).send(listPOst)
}
const createPost = async (req, res, next) => {
    let post = req.body;
    post.user = req.user.id
    let newPost = await PostModel.create(post);
    return res.status(201).send(newPost)
}
const editPost = async (req, res, next) => {
    let id = req.params.id;
    let postEdit = req.body;
    let postFind = await PostModel.findOneAndUpdate({ _id: id }, {
        title: postEdit.title,
        body: postEdit.body
    }, { new: true });
    if (postFind) {
        return res.status(200).json({ message: "Edit success", post: postFind })
    }
    return res.status(401).json({ message: "Bad request" })

}
const deletePost = async (req, res, next) => {
    let id = req.params.id;
    let result = await PostModel.findOneAndDelete({ _id: id });
    if (result) {
        return res.status(200).json({ message: "Delete success" })
    }
    return res.status(401).json({ message: "Bad request" })
}
const getPostPaging = async (req, res, next) => {
    let page = parseInt(req.params.page);
    let pageSize = +req.query.pageSize || 3;
    let keyword = req.query.keyword || "";
    let query;
    if (keyword) {
        query = PostModel.find({
            $or: [
                { title: new RegExp(keyword.trim()) },
                { body: new RegExp(keyword.trim()) }
            ]
        })
    } else {
        query = PostModel.find()
    }
    let posts = await query.skip((page - 1) * pageSize).limit(pageSize).exec();
    let totalRecord = await PostModel.count().exec();
    return res.status(200).send({
        total: totalRecord,
        page: page,
        pageSize: pageSize,
        items: posts
    });
}
module.exports = {
    getAllPost,
    createPost,
    editPost,
    deletePost,
    getPostPaging
}