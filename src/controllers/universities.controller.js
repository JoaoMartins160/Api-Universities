const Universities = require('../models/Universities');

const createNewuniversity = async (req, res) => {
    const {name, country, state_province, web_pages, domains} = req.body

    if (!name) {
        return res.status(400).json({ msg: 'O nome é obrigatorio!' });
    }
    if (!country) {
        return res.status(400).json({ msg: 'O país é obrigatorio!' });
    }
    if (!state_province) {
        return res.status(400).json({ msg: 'O Estado é obrigatorio!' });
    }

    try {
        const result = await Universities.create({
            name,
            country,
            state_province,
            web_pages,
            domains
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateUniversities = async (req, res) => {
    const {id, name, country, state_province, web_pages, domains} = req.body
    if (!id) {
        return res.status(400).json({ msg: 'O ID é necessario!' });
    }

    const universities = await Universities.findOne({ _id: id }).exec();
    if (!universities) {
        return res.status(204).json({ "message": `Não existe universidade com este ID ${id}.` });
    }
    if (name) universities.name = name;
    if (country) universities.country = country;
    if (state_province) universities.state_province = state_province;
    if (web_pages) universities.web_pages = web_pages;
    if (domains) universities.domains = domains;
   
    const result = await universities.save();
    res.json(result);
}

const deleteUniversities = async (req, res) => {
    const id = req.body
    if (!id) return res.status(400).json({ msg: 'O ID é necessario!' });

    const universities = await Universities.findOne({ _id: id }).exec();
    if (!universities) {
        return res.status(204).json({ "message": `Não existe universidade com este ID ${id}.` });
    }
    const result = await universities.deleteOne(); 
    res.json(result);
}

const getUniversities = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ msg: 'O ID é necessario!' });

    const universities = await Universities.findOne({ _id: id }).exec();
    if (!universities) {
        return res.status(204).json({ "message": `Não existe universidade com este ID ${id}.` });
    }
    res.json(universities);
}

module.exports = {
    createNewuniversity,
    updateUniversities,
    deleteUniversities,
    getUniversities
}
