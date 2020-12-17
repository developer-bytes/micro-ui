import { Component, Event, EventEmitter, Method } from '@stencil/core';
import { MessageCodes } from '../../constants';
import { MessageHelper } from '../../helpers';

@Component({
    tag: 'devb-micro-child-event',
    shadow: true
})
export class MicroChildEventComponent {

    /**
     * Event emitted when message is received by child app.
     */
    @Event() messageReceived: EventEmitter<any>;

    constructor() {
        MessageHelper.receive(MessageCodes.MESSAGE_TO_CHILD, (data: any) => {
            console.log('devb: Message received to child', data);
            this.messageReceived.emit(data);
        });
    }

    render() {
        return '';
    }

    @Method() async navigatingToUrl(appName: string, path: string = '', isExternal: boolean = false) {
        console.log('devb: Navigating from child:', {path, appName, isExternal});
        MessageHelper.sendToParent(MessageCodes.CHILD_LINK_CLICKED, { path, appName, isExternal });
    }

    @Method() async messageToParent(data: any) {
        console.log('devb: Sending Message to parent:', data);
        MessageHelper.sendToParent(MessageCodes.MESSAGE_TO_PARENT, data);
    }
}
