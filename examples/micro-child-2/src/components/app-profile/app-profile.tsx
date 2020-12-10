import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {

  render() {
    return (
      <div>Child 2 Profile Page</div>
    );
  }
}
