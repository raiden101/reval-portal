const { reval, usn_booklet, subject, student } = require('../../models');

// reval_subs: [sub_code, ...]

module.exports = (req, res) => {
  reval.updateMany(
    { usn: req.usn },
    { $set: { reval: false } }
  )
  .then(_ => {
    return Promise.all(req.body.reval_subs.map(code => {
      return reval.updateOne(
        { usn: req.usn, sub_code: code },
        { $set: { reval: true } }
      )
    }))
  })
  .then(_ => res.json('sucessfully registered for revaluation'))
  .catch(err => res.json('error while registering!!try again'))
}
