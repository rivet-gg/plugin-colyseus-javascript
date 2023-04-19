# Colyseus Rivet Plugin

<div align="center">
  <a href="https://github.com/colyseus/colyseus">
    <img src="https://github.com/colyseus/colyseus/blob/master/media/header.png?raw=true" />
  </a>
  <br>
  <br>
  <a href="https://npmjs.com/package/colyseus">
    <img src="https://img.shields.io/npm/dm/colyseus.svg?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAgETESWYxR33AAAAtElEQVQoz4WQMQrCQBRE38Z0QoTcwF4Qg1h4BO0sxGOk80iCtViksrIQRRBTewWxMI1mbELYjYu+4rPMDPtn12ChMT3gavb4US5Jym0tcBIta3oDHv4Gwmr7nC4QAxBrCdzM2q6XqUnm9m9r59h7Rc0n2pFv24k4ttGMUXW+sGELTJjSr7QDKuqLS6UKFChVWWuFkZw9Z2AAvAirKT+JTlppIRnd6XgaP4goefI2Shj++OnjB3tBmHYK8z9zAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAyLTAxVDE4OjE3OjM3KzAxOjAwGQQixQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMi0wMVQxODoxNzozNyswMTowMGhZmnkAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC">
  </a>
  <a href="https://discuss.colyseus.io" title="Discuss on Forum">
    <img src="https://img.shields.io/badge/discuss-on%20forum-brightgreen.svg?style=for-the-badge&colorB=0069b8&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAgETDROxCNUzAAABB0lEQVQoz4WRvyvEARjGP193CnWRH+dHQmGwKZtFGcSmxHAL400GN95ktIpV2dzlLzDJgsGgGNRdDAzoQueS/PgY3HXHyT3T+/Y87/s89UANBKXBdoZo5J6L4K1K5ZxHfnjnlQUf3bKvkgy57a0r9hS3cXfMO1kWJMza++tj3Ac7/LY343x1NA9cNmYMwnSS/SP8JVFuSJmr44iFqvtmpjhmhBCrOOazCesq6H4P3bPBjFoIBydOk2bUA17I080Es+wSZ51B4DIA2zgjSpYcEe44Js01G0XjRcCU+y4ZMrDeLmfc9EnVd5M/o0VMeu6nJZxWJivLmhyw1WHTvrr2b4+2OFqra+ALwouTMDcqmjMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDItMDFUMTg6MTM6MTkrMDE6MDAC9f6fAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAyLTAxVDE4OjEzOjE5KzAxOjAwc6hGIwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" alt="Discussion forum" />
  </a>
  <a href="https://discord.gg/RY8rRS7">
    <img src="https://img.shields.io/discord/525739117951320081.svg?style=for-the-badge&colorB=7581dc&logo=discord&logoColor=white">
  </a>
  <h3>
     Multiplayer SDK for JavaScript/TypeScript. <br /><a href="https://docs.colyseus.io/getting-started/javascript-client/">View documentation</a>
  <h3>
</div>


## Server Plugin

First install the [Colyseus Rivet plugin](https://github.com/rivet-gg/plugin-colyseus-server/tree/main) for your Colyseus server. (It's compatible with the old Colyseus Arena API.)

## Example Code

Examples of using the Colyseus JavaScript plugin with Rivet are available [here](https://github.com/rivet-gg/plugin-colyseus-examples).

## WIP Notice

This library is an MVP to run a scalable Colyseus game on top of Rivet.


**Room IDs**

We intend to integrate deeper room integration to better replicate the Arena-style room placement.

**Creating Lobbies**

Rivet does not allow you to create a lobby at the moment. You must use `joinOrCreate` or `joinById`.

**Room options on matchmaker**

The matchmaker only uses the room name and room ID to filter lobbies. Room options cannot be used to filter lobbies at the moment.

**Lobby reconnection**

Lobby reconnection is not supported yet.

## Removed auth support

Support for Colyseus social was [deprecated](https://docs.colyseus.io/colyseus/tools/colyseus-social/), so we removed it in this library. If you are looking for an alternative, check out [Rivet Identities](https://docs.rivet.gg/identity/introduction).

## Fork Versioning

This library will match the minor version (i.e. `MAJOR.MINOR.PATCH`) of the master branch.

## Running Test Client

The test server is used for manual testing for development. For more comprehensive examples, check out the [Colyseus examples repo](https://github.com/rivet-gg/plugin-colyseus-examples).

**Project setup**

1. Create a game on the [Rivet Developer Dashboard](https://hub.rivet.gg/developer/dashboard)
1. Install the [Rivet CLI](https://github.com/rivet-gg/cli)
1. Run `rivet init --recommend` to link your game

**Running example server**

1. Build the client: `yarn run build`
1. Serve the client: `yarn run serve-test`
1. Run the test server [here](https://github.com/rivet-gg/plugin-colyseus-server)

## Browser Support

<a href="https://www.browserstack.com/"><img src="media/browserstack-logo.png?raw=true" width="300" /></a>

## License

MIT

