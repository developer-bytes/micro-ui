import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @State() navItems: any[] = [
      { name: 'Child 1', appName: 'child-1', url: 'http://localhost:3001', active: true },
      { name: 'Child 2', appName:'child-2', url: 'http://localhost:3002' }
  ];

  render() {
    return (
      <div class="app-home">
        <div>
            {this.navItems.map(x => (
                <devb-micro-link appName={x.appName} isChild={false} onLinkClicked={this.linkClickedHandler}>
                  <button>{x.name}</button>
                </devb-micro-link>
            ))}
        </div>
        <div>
          <devb-micro-container routeConfig={this.navItems} />
        </div>

        <stencil-route-link url="/profile">
          <button>Main Profile page</button>
        </stencil-route-link>
      </div>
    );
  }

  private linkClickedHandler(event) {
    console.log('Link Clicked: ', event['detail']);
  }

}
