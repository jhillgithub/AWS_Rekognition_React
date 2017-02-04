// var base_url = "https://maker.ifttt.com/trigger/rekog/with/key/";
var base_url = "localhost";
var url = base_url + process.env.IFTTT_API_KEY;

const emotionToColor = {
  'ANGRY': 'F44336',
  'CALM': '607D8B',
  'CONFUSED': 'FF9800',
  'DISGUSTED': '673AB7',
  'HAPPY': '4CAF50',
  'SAD': '2196F3',
  'SURPRISED': 'FFC107',
  'UNKNOWN': '616161',
};
