import { Component, h, Host, Method, Prop, State } from '@stencil/core';
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

    /**
     * Current URL state of micro container.
     */
    @State() private currentUrl: string;

    /**
     * scrollHeight of iframe
     */
    @State() private scrollheight: number = 200;

    private iframeElement: HTMLIFrameElement;

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
            // location.hash = `/${data.appName}${data.path}`;
            history.replaceState(undefined, undefined, `#/${data.appName}${data.path}`);
        });
        
    }

    @Method()
    public async navigate(appName: string, path: string = '') {
        const currentNavConfig = this.routeConfig.find(x => x.appName === appName);
        if (currentNavConfig) {
            this.currentUrl = currentNavConfig.url + path;
            history.replaceState(undefined, undefined, `#/${appName}/${path}`);
        }
    }
    
    render() {
        return (
            <Host style={{ display: 'block' }}>
                <iframe width='100%' height={`${this.scrollheight}px`} frameBorder='0' src={this.currentUrl} ref={(el) => { this.iframeElement = el; }} />
            </Host>
        );
    }


}