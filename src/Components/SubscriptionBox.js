var VideoTile = require('./VideoTile')
var SubscriptionBox = React.createClass({
  getInitialState: function() {
    return {
      videos: []
    };
  },

  vidClick: function(index) {
    $.post('/api/watched', {youtubeID: this.refs['item' + index].props.id}, function () {
      var self = this;
      this.setState({videos: this.state.videos.filter(item => item.youtubeID !== self.refs['item' + index].props.id)});
    }.bind(this));
  },

  authorClick: function(index) {
    console.log('Author: ' + this.refs['item' + index]);
  },

  componentDidMount: function() {
    this.serverRequest = $.get('/api/videos', function (videos) {
      this.setState({
        videos
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div className="subscriptionBox">
        {this.state.videos.map(function(item, i) {
          return (
            <VideoTile
              vidClick={this.vidClick.bind(this, i)}
              authorClick={this.authorClick.bind(this, i)}
              key={i}
              title={item.title.slice(0, 40) + "..."}
              thumb={item.thumbnail}
              channelName={item.channelName}
              info={item.info}
              id={item.youtubeID}
              ref={'item' + i} 
            />
          );
        }, this)}
      </div>
    )
  }
});

module.exports = SubscriptionBox;
