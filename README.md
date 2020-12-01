
# DevBytes Micro UI Component Library

Simple micro-frontend web component solution created using StencilJS, can be used to merge multiple applications into single huge application.

Currently its using iframes internally to open any micro app.

# Framework Requirements

Its a simple web component library build using StencilJS. So can be used with any frontend framework like Angular, ReactJS, Vue, even with HTML pages.

# Getting Started

To install in amy application, simple run following npm install command:

```bash
npm i @devbytes/micro-ui
```

## Integration

For Integration in any framework please refer StencilJS Documentation:

*https://stenciljs.com/docs/overview*



## Usage

Add the container component where you want to include your micro applications.

`<devb-micro-container />`

### Providing Route Configuration:

Using following script to include route configuration in your app -

`
<script>
    const container = document.querySelector('devb-micro-container');
    container.routeConfig = [
      { name: 'Child 1', appName: 'child-1', url: 'http://localhost:3335', active: true },  // Change Values as per your application needs
      { name: 'Child 2', appName:'child-2', url: 'http://localhost:3336' }
  ];
</script>
`

### Navigation from Child App:

For any links/buttions performing routing navigation in your app, please enclose them in `micro-link` tag:

`
<!-- Note that the below componet just used to reflect URL of inner app to the main app. Internal navigation needs to be performed via the button itself. -->
<devb-micro-link app-name='child-1' path='/profile'>
    <button>Profile page</button>
</devb-micro-link>
`

### Navigation from Main App:

This is useful if you want to move from one app to another using buttons/menu items in your main app.

`
<!-- The following link will perform navigation too. -->
<devb-micro-link app-name='child-1' path='/profile' is-child='false'>
    <button>Profile page</button>
</devb-micro-link>
`

