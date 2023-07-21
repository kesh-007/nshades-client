var unirest = require("unirest");

var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

req.headers({
  "authorization": "TEeXoeD2q62KfGqQTpkvdgJIiLuwqIW4UbelR7WdPUT6i0oIDmpHVKMNuhgN"
});

req.form({
  "variables_values": "5599",
  "route": "otp",
  "numbers": "9360534924",
});

req.end(function (res) {
  if (res.error) {
    console.error("Error occurred while sending SMS:", res.body);
    throw new Error(res.error);
  }

  console.log(res.body);
});
