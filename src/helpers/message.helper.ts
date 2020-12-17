

export class MessageHelper {
    public static origin: string = window.location.ancestorOrigins && window.location.ancestorOrigins.length ?
        window.location.ancestorOrigins[0] : window.location.origin;

    public static sendToParent(name: string, data: any) {
        let winRef = window as any;
        if (parent && parent.window) {
            winRef = parent.window;
        }
        const origin = window.location.hostname.indexOf('localhost') >= 0 ? '*' : this.origin;
        winRef.postMessage({
            name,
            data
        }, origin);
    }

    public static sendToChild(name: string, data: any, iframe: any) {
        if (iframe && iframe.contentWindow) {
            const origin = window.location.hostname.indexOf('localhost') >= 0 ? '*' : this.origin;
            iframe.contentWindow.postMessage({ name, data }, origin);
        }
    }

    public static receive(name: string, handler: (data: any) => void) {
        const winRef = window as any;

        if (winRef.addEventListener) {
            winRef.addEventListener('message', (msg: any) => {
                if (msg && msg.origin) {
                    this.origin = msg.origin;
                }
                if (msg && msg.data && msg.data.name === name) {
                    handler(msg.data.data);
                }
            }, false);
        } else {
            winRef.attachEvent('onmessage', (msg) => {
                if (msg && msg.origin) {
                    this.origin = msg.origin;
                }
                if (msg && msg.data && msg.data.name === name) {
                    handler(msg.data.data);
                }
            });
        }
    }
}
