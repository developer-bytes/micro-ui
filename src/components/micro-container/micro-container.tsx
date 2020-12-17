import { Component, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { MessageCodes } from '../../constants';
import { MessageHelper } from '../../helpers';
import { RouteConfig } from './models/route-config.model';

@Component({
    tag: 'devb-micro-container',
    styleUrl: 'micro-container.scss',
    shadow: true
})
export class MicroContainerComponent {
    
    /**
     * Micro frontend routing configuration, used to identify applications and their urls.
     * NOTE: Micro Application URLs must be on same domain, or you have to disable browser security to run in different domain on local environment.
     */
    @Prop() routeConfig: RouteConfig[] = [];

    @Event() pageLoad: EventEmitter; 

    /**
     * Event emitted when message is received by parent app.
     */
    @Event() messageReceived: EventEmitter<any>;

    /**
     * Current URL state of micro container.
     */
    @State() private currentUrl: string;

    /**
     * scrollHeight of iframe
     */
    @State() private scrollheight: number = 200;

    private iframeElement: HTMLIFrameElement;

    constructor() {
        this.iframeLoadHandler = this.iframeLoadHandler.bind(this);

        MessageHelper.receive(MessageCodes.MESSAGE_TO_PARENT, (data: any) => {
            console.log('devb: Message received to parent', data);
            this.messageReceived.emit(data);
        });
    }

    componentWillLoad() {
        // Url configs
        const appPath = location.hash.replace(/\#\/|\#/g, '');
        const pathArr = appPath.split('/');
        const currentAppName = pathArr.shift();
        const appUrl = pathArr.length ? '/' + pathArr.join('/') : '';
        
        const currentNavConfig = this.routeConfig.find(x => x.appName === currentAppName);
        if (currentNavConfig) {
            this.currentUrl = currentNavConfig.url + appUrl;
        }
        if (!this.currentUrl) {
            const activeNavConfig = this.routeConfig.find(x => x.active);
            this.currentUrl = activeNavConfig.url + appUrl;
            window.location.hash = `/${activeNavConfig.appName}/${appUrl}`;
        }

        // Setting height of iframe based on content.
        setInterval(() => {
            const iframeBody = this.iframeElement?.contentWindow?.document?.body;
            if (this.scrollheight !== iframeBody?.scrollHeight) {
                this.scrollheight = iframeBody?.scrollHeight;
            }
        }, 500);

        MessageHelper.receive(MessageCodes.CHILD_LINK_CLICKED, (data: any) => {
            if (data.isExternal) {
                if (data.appName) {
                    window.location.hash = `#/${data.appName}${data.path}`;
                    window.location.reload();
                } else {
                    window.location.href = data.path;
                }
            } else {
                history.replaceState(undefined, undefined, `#/${data.appName}${data.path}`);
            }
        });
        
    }

    @Method()
    public async navigate(appName: string, path: string = '') {
        console.log('devb: Navigating to:', {appName, path});
        const currentNavConfig = this.routeConfig.find(x => x.appName === appName);
        if (currentNavConfig) {
            this.currentUrl = currentNavConfig.url + path;
            history.replaceState(undefined, undefined, `#/${appName}/${path}`);
        } else {
            console.warn('devb: Configuration Missing: AppName specified is missing in routeConfig.');
        }
    }

    @Method()
    public async messageToChildApp(data: any) {
        console.log('devb: Sending message to child app:', data);
        MessageHelper.sendToChild(MessageCodes.MESSAGE_TO_CHILD, data, this.iframeElement);
    }
    
    render() {
        return (
            <Host style={{ display: 'block' }}>
                <iframe width='100%' height={`${this.scrollheight}px`} frameBorder='0' src={this.currentUrl} onLoad={this.iframeLoadHandler}
                ref={(el) => { this.iframeElement = el; }} />
            </Host>
        );
    }

    private iframeLoadHandler() {
        console.log('devb: Micro App loaded with URL:', this.currentUrl);
        this.pageLoad.emit({ url: this.currentUrl });
    }

}