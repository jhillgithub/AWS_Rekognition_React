export function detectFace(selected_img, hue) {
  const HUE_URL = "http://"+hue.hueIP+"/api/"+hue.hueUser+"/lights/"+hue.hueLightId+"/state"

  var rekog_promise = axios.post('/rekog', {filename: selected_img});
  var hue_promise = rekog_promise.then(function(rekog_response) {
    // convert rekog_response to colors
    return axios.put(URL, {"on": !hue.hueOn});
  });
  return axios.all([rekog_promise, hue_promise]);
}
