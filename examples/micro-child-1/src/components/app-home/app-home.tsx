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
          Child 1 Home Page
        </p>

        <stencil-route-link url="/profile">
          <devb-micro-link appName='child-1' path='/profile'>
            <button>Profile page</button>
          </devb-micro-link>
        </stencil-route-link>
      </div>
    );
  }
}
