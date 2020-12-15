import { Component, Event, EventEmitter } from '@stencil/core';
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
    @Event() message: EventEmitter<any>;

    constructor() {
        MessageHelper.receive(MessageCodes.MESSAGE_TO_CHILD, (data: any) => {
            this.message.emit(data);
        });
    }

    render() {
        return '';
    }
}
