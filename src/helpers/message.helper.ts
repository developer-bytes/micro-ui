
export class MessageHelper {
    public static origin: string = window.location.ancestorOrigins && window.location.ancestorOrigins.length ?
        window.location.ancestorOrigins[0] : undefined;

    public static sendToParent(name: string, data: any) {
        let winRef = window as any;
        if (parent && parent.window) {
            winRef = parent.window;
        }
        winRef.postMessage({
            name,
            data
        }, this.origin);
    }

    public static sendToChild(name: string, data: any, iframe: any) {
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(name, data);
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
