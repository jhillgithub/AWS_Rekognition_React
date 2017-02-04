# Connecting to Philips Hue
Details on finding IP Address and Creating an Authorized User [here](https://developers.meethue.com/documentation/getting-started)

Developer website for philips Hue [here](https://developers.meethue.com)

The basic steps are:
1. Connect the Hue Bridge to the same wifi network as the react client.
2. Determine the IP address through the mobile app or from this [site](https://www.meethue.com/api/nupnp)
    * use this helper: http://\<bridge ip address\>/debug/clip.html
3. Find the light id that you want to connect to
    * http://\<bridge ip address\>/api/\<Authorized User\>/lights
4. Use PUT requests to turn on light and change colors:
    * http://\<bridge ip address\>/api/\<Authorized User\>/lights
    * {"on":true, "sat":254, "bri":254,"hue":10000}
      * Saturation and Brightness max at 254. hue ranges from 0 to 65535
