// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};
export var mediaConfig = {
  url: "http://qrs.vn:8282"
}
export var configURL = {
  host: "http://qrs.vn:8282",
  websocket: "ws://qrs.vn:8282"

  //  host: "http://192.168.11.106:3000",
  // websocket:"ws://192.168.11.106:3000"
}