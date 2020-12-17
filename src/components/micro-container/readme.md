# mfe-app



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description                                                                                                                                                                                                                       | Type            | Default |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| `routeConfig` | --        | Micro frontend routing configuration, used to identify applications and their urls. NOTE: Micro Application URLs must be on same domain, or you have to disable browser security to run in different domain on local environment. | `RouteConfig[]` | `[]`    |


## Events

| Event             | Description                                           | Type               |
| ----------------- | ----------------------------------------------------- | ------------------ |
| `messageReceived` | Event emitted when message is received by parent app. | `CustomEvent<any>` |
| `pageLoad`        |                                                       | `CustomEvent<any>` |


## Methods

### `messageToChildApp(data: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `navigate(appName: string, path?: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
