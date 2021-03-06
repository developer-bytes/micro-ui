/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RouteConfig } from "./components/micro-container/models/route-config.model";
import { AppLink } from "./components/micro-link/models";
export namespace Components {
    interface DevbMicroChildEvent {
        "messageToParent": (data: any) => Promise<void>;
        "navigatingToUrl": (appName: string, path?: string, isExternal?: boolean) => Promise<void>;
    }
    interface DevbMicroContainer {
        "messageToChildApp": (data: any) => Promise<void>;
        "navigate": (appName: string, path?: string) => Promise<void>;
        /**
          * Micro frontend routing configuration, used to identify applications and their urls. NOTE: Micro Application URLs must be on same domain, or you have to disable browser security to run in different domain on local environment.
         */
        "routeConfig": RouteConfig[];
    }
    interface DevbMicroLink {
        /**
          * Application name configured in Route Config property.
         */
        "appName": string;
        /**
          * If Link is clicked from child application.
         */
        "isChild": boolean;
        /**
          * If link is external, it will try to navigate from parent.
         */
        "isExternal": boolean;
        /**
          * Path of the page within the application, relative to application domain.
         */
        "path": string;
    }
}
declare global {
    interface HTMLDevbMicroChildEventElement extends Components.DevbMicroChildEvent, HTMLStencilElement {
    }
    var HTMLDevbMicroChildEventElement: {
        prototype: HTMLDevbMicroChildEventElement;
        new (): HTMLDevbMicroChildEventElement;
    };
    interface HTMLDevbMicroContainerElement extends Components.DevbMicroContainer, HTMLStencilElement {
    }
    var HTMLDevbMicroContainerElement: {
        prototype: HTMLDevbMicroContainerElement;
        new (): HTMLDevbMicroContainerElement;
    };
    interface HTMLDevbMicroLinkElement extends Components.DevbMicroLink, HTMLStencilElement {
    }
    var HTMLDevbMicroLinkElement: {
        prototype: HTMLDevbMicroLinkElement;
        new (): HTMLDevbMicroLinkElement;
    };
    interface HTMLElementTagNameMap {
        "devb-micro-child-event": HTMLDevbMicroChildEventElement;
        "devb-micro-container": HTMLDevbMicroContainerElement;
        "devb-micro-link": HTMLDevbMicroLinkElement;
    }
}
declare namespace LocalJSX {
    interface DevbMicroChildEvent {
        /**
          * Event emitted when message is received by child app.
         */
        "onMessageReceived"?: (event: CustomEvent<any>) => void;
    }
    interface DevbMicroContainer {
        /**
          * Event emitted when message is received by parent app.
         */
        "onMessageReceived"?: (event: CustomEvent<any>) => void;
        "onPageLoad"?: (event: CustomEvent<any>) => void;
        /**
          * Micro frontend routing configuration, used to identify applications and their urls. NOTE: Micro Application URLs must be on same domain, or you have to disable browser security to run in different domain on local environment.
         */
        "routeConfig"?: RouteConfig[];
    }
    interface DevbMicroLink {
        /**
          * Application name configured in Route Config property.
         */
        "appName"?: string;
        /**
          * If Link is clicked from child application.
         */
        "isChild"?: boolean;
        /**
          * If link is external, it will try to navigate from parent.
         */
        "isExternal"?: boolean;
        /**
          * Event emitted when link is clicked. Value would be path.
         */
        "onLinkClicked"?: (event: CustomEvent<AppLink>) => void;
        /**
          * Path of the page within the application, relative to application domain.
         */
        "path"?: string;
    }
    interface IntrinsicElements {
        "devb-micro-child-event": DevbMicroChildEvent;
        "devb-micro-container": DevbMicroContainer;
        "devb-micro-link": DevbMicroLink;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "devb-micro-child-event": LocalJSX.DevbMicroChildEvent & JSXBase.HTMLAttributes<HTMLDevbMicroChildEventElement>;
            "devb-micro-container": LocalJSX.DevbMicroContainer & JSXBase.HTMLAttributes<HTMLDevbMicroContainerElement>;
            "devb-micro-link": LocalJSX.DevbMicroLink & JSXBase.HTMLAttributes<HTMLDevbMicroLinkElement>;
        }
    }
}
