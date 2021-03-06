import axios from 'axios';
import _ from 'lodash';

const emotionToColor = {
  'ANGRY': {
    "on": true,
    "bri": 162,
    "hue": 65252,
    "sat": 230
  },
  'CALM': {
      "on": true,
      "bri": 118,
      "hue": 44071,
      "sat": 104
  },
  'CONFUSED': {
    "on": true,
    "bri": 254,
    "hue": 5522,
    "sat": 254
  },
  'DISGUSTED': {
    "on": true,
    "bri": 47,
    "hue": 50204,
    "sat": 248
  },
  'HAPPY': {
    "on": true,
    "bri": 215,
    "hue": 13998,
    "sat": 227
  },
  'SAD': {
    "on": true,
    "bri": 160,
    "hue": 47097,
    "sat": 180
  },
  'SURPRISED': {
    "on": true,
    "bri": 254,
    "hue": 9089,
    "sat": 252
  },
  'UNKNOWN': {
    "on": true,
    "bri": 76,
    "hue": 41507,
    "sat": 77
  },
};

export function findMaxEmotion(emotions) {
  var maxConf = _.maxBy(emotions, 'Confidence');
  var maxEmotion = maxConf.Type;
  return maxEmotion;
}

export function convertEmotionToHueColor(emotion, counterEmotions) {
    switch (emotion) {
      case 'ANGRY':
        return counterEmotions ? emotionToColor['CALM'] : emotionToColor['ANGRY'];
        break;
      case 'CALM':
        return counterEmotions ? emotionToColor['HAPPY'] : emotionToColor['CALM'];
        break;
      case 'DISGUSTED':
        return counterEmotions ? emotionToColor['CONFUSED'] : emotionToColor['DISGUSTED'];
        break;
      case 'HAPPY':
        return counterEmotions ? emotionToColor['SAD'] : emotionToColor['HAPPY'];
        break;
      case 'SAD':
        return counterEmotions ? emotionToColor['HAPPY'] : emotionToColor['SAD'];
        break;
      case 'SURPRISED':
        return counterEmotions ? emotionToColor['DISGUSTED'] : emotionToColor['SURPRISED'];
        break;
      case 'CONFUSED':
        return counterEmotions ? emotionToColor['ANGRY'] : emotionToColor['CONFUSED'];
        break;
      default:
        return counterEmotions ? emotionToColor['SURPRISED'] : emotionToColor['UNKNOWN'];
    }
}

export function update_hue_color(hue, emotion, counterEmotions) {
  const HUE_URL = "http://"+hue.hueIP+"/api/"+hue.hueUser+"/lights/"+hue.hueLightID+"/state"
  var hueSettings = convertEmotionToHueColor(emotion, counterEmotions);
  if (hue.hueConnected) {
    axios.put(HUE_URL, hueSettings);
  }
  return hueSettings;
}

export function detectFace(selected_img, hue, counterEmotions) {
  const HUE_URL = "http://"+hue.hueIP+"/api/"+hue.hueUser+"/lights/"+hue.hueLightID+"/state"

  var rekog_promise = axios.post('/rekog', {filename: selected_img});
  var hue_promise = rekog_promise.then(function(rekog_response) {
    // convert rekog_response to colors
    var emotions = rekog_response.data.FaceDetails[0].Emotions;
    var maxEmotion = findMaxEmotion(emotions);
    var hueSettings = convertEmotionToHueColor(maxEmotion, counterEmotions);
    if (hue.hueConnected) {
      axios.put(HUE_URL, hueSettings);
    }
    return maxEmotion
  });
  return axios.all([rekog_promise, hue_promise]);
}
