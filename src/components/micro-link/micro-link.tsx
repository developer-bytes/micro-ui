import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { MessageCodes } from '../../constants';
import { MessageHelper } from '../../helpers';
import { AppLink } from './models';


@Component({
    tag: 'devb-micro-link',
    styleUrl: 'micro-link.scss',
    shadow: true
})
export class MicroLinkComponent {
    /**
     * Path of the page within the application, relative to application domain.
     */
    @Prop() path: string = '';
    /**
     * Application name configured in Route Config property.
     */
    @Prop() appName: string;
    /**
     * If Link is clicked from child application.
     */
    @Prop() isChild: boolean = true;

    /**
     * If link is external, it will try to navigate from parent.
     */
    @Prop() isExternal: boolean = false;

    /**
     * Event emitted when link is clicked. Value would be path.
     */
    @Event() linkClicked: EventEmitter<AppLink>;

    constructor() {
        this.linkClickedHandler = this.linkClickedHandler.bind(this);
    }

    render() {
        return (
            <Host onClick={this.linkClickedHandler}>
                <slot />
            </Host>
        );
    }

    private linkClickedHandler() {
        this.linkClicked.emit({ path: this.path, appName: this.appName });
        if (this.isChild) {
            MessageHelper.sendToParent(MessageCodes.CHILD_LINK_CLICKED, { path: this.path, appName: this.appName, isExternal: this.isExternal });
        } else {
            const mfeApp = document.querySelector('devb-micro-container');
            if (mfeApp) {
                (mfeApp as any).navigate(this.appName + this.path);
            }
        }
    }

}
