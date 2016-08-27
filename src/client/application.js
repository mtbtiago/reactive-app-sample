import "./application.scss";

import * as services from "./services";

// ---------------------
// PLAYGROUND
services.server.on$("test")
  .map(d => d + " whoa")
  .subscribe(item => {
    console.log(`Got ${item} from server!`);
  });

services.server.status$.subscribe(status => console.log(status));

// alternative syntax
// services.server.status$.subscribe((status) => { console.log(status); });

// classic syntax alternative:
// services.server.status$.subscribe(function (status) {
//   console.log(status);
// });

// ---------------------
// Auth

// ---------------------
// Components

// ---------------------
// Bootstrap
services.socket.connect();
