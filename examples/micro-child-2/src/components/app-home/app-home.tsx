import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <p>
          Child 2 Home Page
        </p>

        <stencil-route-link url="/profile">
          <devb-micro-link appName='child-1' path='/profile'>
            <button>Profile page</button>
          </devb-micro-link>
        </stencil-route-link>

        <div>
        <devb-micro-link path='/profile' isExternal={true}>
            <button>Container App Profile page</button>
          </devb-micro-link>
        </div>
      </div>
    );
  }
}
