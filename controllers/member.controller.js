const db = require("../models/index");
const config = require("../config/auth.config");
const Member = db.member;

exports.postMember = (req, res) => {
    const member = new Member({
        Name: req.body.name,
        Games: 0,
        GamesWon: 0,
        GamesLost: 0,
        IhoudiWon: 0,
        IhoudiLost: 0,
        Score: 0
    });
  
    member.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      res.send({ message: "Member added successfully!" });
    });
};

exports.updateMember = (req, res, next) => {
    Member.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            Name: req.body.name
        }
    )
    .then(() =>{
        Member.findById(req.params.id).then(() =>{
            res.status(200).json({message: "Ok"})
        })
        .catch(err =>
            res.status(400).json({ message: "Bad Request", "code": 10001, "data": err.message })
        )}
    )
    .catch(err =>
        res.status(400).json({ message: "Bad Request", "code": 10001, "data": err.message })
    )
};

exports.updateMembers = (req, res, next) => {
  req.body.members.map((member) => {
    Member.findOneAndUpdate(
      {
        _id: member._id
      },
      {
        Name: member.Name,
        Games: member.Games,
        GamesWon: member.GamesWon,
        GamesLost: member.GamesLost,
        IhoudiWon: member.IhoudiWon,
        IhoudiLost: member.IhoudiLost,
        Score: member.Score
      }
    )
    .then(() =>{
      Member.findById(member._id).then(() =>{
        res.status(200).json({message: "Ok"})
      })
      .catch(err =>
        res.status(400).json({ message: "Bad Request", "code": 10001, "data": err.message })
      )}
    )
    .catch(err =>
      res.status(400).json({ message: "Bad Request", "code": 10001, "data": err.message })
    )
  });
};

exports.deleteMember = (req, res, next) => {
  Member.deleteOne({
        _id: req.params.id
  }).then(() => res.status(200).json())
    .catch(err => {
      res.status(400).json({ message: "Bad Request", "code": 10001, "data": err.message });
    });
};

exports.getMembers = (req, res) => {
  Member.find()
  .then((result) =>
    res.status(200).json({message: "Ok", data: {
      members: result
    }})
  )
  .catch(err =>
    res.status(400).json({ message: "Bad Request", "code": 10001, "data": err.message })
  )
};