var mongoose = require('mongoose');
var deasync  = require('deasync');

var videoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  youtubeID: {
    type: String,
  },
  published: {
    type: Date
  },
  channelTitle: {
    type: "String"
  },
  channelId: {
    type: "String"
  },
  channelName: {
    type: "String"
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  thumbnail: {
    type: String
  }
});

videoSchema.pre('save', function(next) {
  var self = this;
  Counters.getNextIndex('videos', true, function(data) {
    self.id = data.index;
    next();
  });
});

var Video = mongoose.model('Video', videoSchema);

module.exports = Video;