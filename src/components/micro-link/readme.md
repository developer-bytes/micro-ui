# mfe-app-link



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                              | Type      | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------ | --------- | ----------- |
| `appName`    | `app-name`    | Application name configured in Route Config property.                    | `string`  | `undefined` |
| `isChild`    | `is-child`    | If Link is clicked from child application.                               | `boolean` | `true`      |
| `isExternal` | `is-external` | If link is external, it will try to navigate from parent.                | `boolean` | `false`     |
| `path`       | `path`        | Path of the page within the application, relative to application domain. | `string`  | `''`        |


## Events

| Event         | Description                                              | Type                   |
| ------------- | -------------------------------------------------------- | ---------------------- |
| `linkClicked` | Event emitted when link is clicked. Value would be path. | `CustomEvent<AppLink>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
