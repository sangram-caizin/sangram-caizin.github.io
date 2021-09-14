/**
 * @fileoverview added by tsickle
 * Generated from: lib/dialog/dialog.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * dialog.service
 */
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { OwlDialogConfig } from './dialog-config.class';
import { OwlDialogRef } from './dialog-ref.class';
import { OwlDialogContainerComponent } from './dialog-container.component';
import { extendObject } from '../utils';
import { defer, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
/** @type {?} */
export const OWL_DIALOG_DATA = new InjectionToken('OwlDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 *
 * @type {?}
 */
export const OWL_DIALOG_SCROLL_STRATEGY = new InjectionToken('owl-dialog-scroll-strategy');
/**
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    /** @type {?} */
    const fn = (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.block());
    return fn;
}
/**
 * \@docs-private
 * @type {?}
 */
export const OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * I
 * njection token that can be used to specify default dialog options.
 *
 * @type {?}
 */
export const OWL_DIALOG_DEFAULT_OPTIONS = new InjectionToken('owl-dialog-default-options');
export class OwlDialogService {
    /**
     * @param {?} overlay
     * @param {?} injector
     * @param {?} location
     * @param {?} scrollStrategy
     * @param {?} defaultOptions
     * @param {?} parentDialog
     * @param {?} overlayContainer
     */
    constructor(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
        this.overlay = overlay;
        this.injector = injector;
        this.location = location;
        this.defaultOptions = defaultOptions;
        this.parentDialog = parentDialog;
        this.overlayContainer = overlayContainer;
        this.ariaHiddenElements = new Map();
        this._openDialogsAtThisLevel = [];
        this._afterOpenAtThisLevel = new Subject();
        this._afterAllClosedAtThisLevel = new Subject();
        /**
         * Stream that emits when all open dialog have finished closing.
         * Will emit on subscribe if there are no open dialogs to begin with.
         */
        this.afterAllClosed = defer((/**
         * @return {?}
         */
        () => this._openDialogsAtThisLevel.length
            ? this._afterAllClosed
            : this._afterAllClosed.pipe(startWith(undefined))));
        this.scrollStrategy = scrollStrategy;
        if (!parentDialog && location) {
            location.subscribe((/**
             * @return {?}
             */
            () => this.closeAll()));
        }
    }
    /**
     * Keeps track of the currently-open dialogs.
     * @return {?}
     */
    get openDialogs() {
        return this.parentDialog
            ? this.parentDialog.openDialogs
            : this._openDialogsAtThisLevel;
    }
    /**
     * Stream that emits when a dialog has been opened.
     * @return {?}
     */
    get afterOpen() {
        return this.parentDialog
            ? this.parentDialog.afterOpen
            : this._afterOpenAtThisLevel;
    }
    /**
     * @return {?}
     */
    get _afterAllClosed() {
        /** @type {?} */
        const parent = this.parentDialog;
        return parent
            ? parent._afterAllClosed
            : this._afterAllClosedAtThisLevel;
    }
    /**
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    open(componentOrTemplateRef, config) {
        config = applyConfigDefaults(config, this.defaultOptions);
        if (config.id && this.getDialogById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        /** @type {?} */
        const overlayRef = this.createOverlay(config);
        /** @type {?} */
        const dialogContainer = this.attachDialogContainer(overlayRef, config);
        /** @type {?} */
        const dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this.openDialogs.length) {
            this.hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef
            .afterClosed()
            .subscribe((/**
         * @return {?}
         */
        () => this.removeOpenDialog(dialogRef)));
        this.afterOpen.next(dialogRef);
        return dialogRef;
    }
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    closeAll() {
        /** @type {?} */
        let i = this.openDialogs.length;
        while (i--) {
            this.openDialogs[i].close();
        }
    }
    /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    getDialogById(id) {
        return this.openDialogs.find((/**
         * @param {?} dialog
         * @return {?}
         */
        dialog => dialog.id === id));
    }
    /**
     * @private
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?} dialogContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        /** @type {?} */
        const dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe((/**
             * @return {?}
             */
            () => {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            }));
        }
        if (componentOrTemplateRef instanceof TemplateRef) {
        }
        else {
            /** @type {?} */
            const injector = this.createInjector(config, dialogRef, dialogContainer);
            /** @type {?} */
            const contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    }
    /**
     * @private
     * @template T
     * @param {?} config
     * @param {?} dialogRef
     * @param {?} dialogContainer
     * @return {?}
     */
    createInjector(config, dialogRef, dialogContainer) {
        /** @type {?} */
        const userInjector = config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;
        /** @type {?} */
        const injectionTokens = new WeakMap();
        injectionTokens.set(OwlDialogRef, dialogRef);
        injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
        injectionTokens.set(OWL_DIALOG_DATA, config.data);
        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    createOverlay(config) {
        /** @type {?} */
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    /**
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    attachDialogContainer(overlayRef, config) {
        /** @type {?} */
        const containerPortal = new ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
        /** @type {?} */
        const containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.setConfig(config);
        return containerRef.instance;
    }
    /**
     * @private
     * @param {?} dialogConfig
     * @return {?}
     */
    getOverlayConfig(dialogConfig) {
        /** @type {?} */
        const state = new OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: dialogConfig.scrollStrategy || this.scrollStrategy(),
            panelClass: dialogConfig.paneClass,
            hasBackdrop: dialogConfig.hasBackdrop,
            minWidth: dialogConfig.minWidth,
            minHeight: dialogConfig.minHeight,
            maxWidth: dialogConfig.maxWidth,
            maxHeight: dialogConfig.maxHeight
        });
        if (dialogConfig.backdropClass) {
            state.backdropClass = dialogConfig.backdropClass;
        }
        return state;
    }
    /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    removeOpenDialog(dialogRef) {
        /** @type {?} */
        const index = this._openDialogsAtThisLevel.indexOf(dialogRef);
        if (index > -1) {
            this.openDialogs.splice(index, 1);
            // If all the dialogs were closed, remove/restore the `aria-hidden`
            // to a the siblings and emit to the `afterAllClosed` stream.
            if (!this.openDialogs.length) {
                this.ariaHiddenElements.forEach((/**
                 * @param {?} previousValue
                 * @param {?} element
                 * @return {?}
                 */
                (previousValue, element) => {
                    if (previousValue) {
                        element.setAttribute('aria-hidden', previousValue);
                    }
                    else {
                        element.removeAttribute('aria-hidden');
                    }
                }));
                this.ariaHiddenElements.clear();
                this._afterAllClosed.next();
            }
        }
    }
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @private
     * @return {?}
     */
    hideNonDialogContentFromAssistiveTechnology() {
        /** @type {?} */
        const overlayContainer = this.overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            /** @type {?} */
            const siblings = overlayContainer.parentElement.children;
            for (let i = siblings.length - 1; i > -1; i--) {
                /** @type {?} */
                let sibling = siblings[i];
                if (sibling !== overlayContainer &&
                    sibling.nodeName !== 'SCRIPT' &&
                    sibling.nodeName !== 'STYLE' &&
                    !sibling.hasAttribute('aria-live')) {
                    this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    }
}
OwlDialogService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OwlDialogService.ctorParameters = () => [
    { type: Overlay },
    { type: Injector },
    { type: Location, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [OWL_DIALOG_SCROLL_STRATEGY,] }] },
    { type: OwlDialogConfig, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DIALOG_DEFAULT_OPTIONS,] }] },
    { type: OwlDialogService, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: OverlayContainer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.ariaHiddenElements;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype._openDialogsAtThisLevel;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype._afterOpenAtThisLevel;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype._afterAllClosedAtThisLevel;
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     * @type {?}
     */
    OwlDialogService.prototype.afterAllClosed;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.location;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.defaultOptions;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.parentDialog;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.overlayContainer;
}
/**
 * Applies default options to the dialog config.
 * @param {?=} config Config to be modified.
 * @param {?=} defaultOptions Default config setting
 * @return {?} The new configuration object.
 */
function applyConfigDefaults(config, defaultOptions) {
    return extendObject(new OwlDialogConfig(), config, defaultOptions);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUNILE9BQU8sRUFDUCxhQUFhLEVBQ2IsZ0JBQWdCLEVBR25CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNILGVBQWUsRUFFZixjQUFjLEVBQ2pCLE1BQU0scUJBQXFCLENBQUM7O0FBRTdCLE1BQU0sT0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQU0sZUFBZSxDQUFDOzs7Ozs7QUFLdkUsTUFBTSxPQUFPLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUUxRCw0QkFBNEIsQ0FBQzs7Ozs7QUFFL0IsTUFBTSxVQUFVLDJDQUEyQyxDQUN2RCxPQUFnQjs7VUFFVixFQUFFOzs7SUFBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENB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T0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRO29CQUM3QixPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU87b0JBQzVCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFDcEM7b0JBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FDdkIsT0FBTyxFQUNQLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQ3RDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQy9DO2FBQ0o7U0FDSjtJQUNMLENBQUM7OztZQTVRSixVQUFVOzs7O1lBMUNQLE9BQU87WUFiUCxRQUFRO1lBS0gsUUFBUSx1QkFnR1IsUUFBUTs0Q0FDUixNQUFNLFNBQUMsMEJBQTBCO1lBaEdqQyxlQUFlLHVCQWlHZixRQUFRLFlBQ1IsTUFBTSxTQUFDLDBCQUEwQjtZQUlaLGdCQUFnQix1QkFGckMsUUFBUSxZQUNSLFFBQVE7WUE1RmIsZ0JBQWdCOzs7Ozs7O0lBMENoQiw4Q0FBK0Q7Ozs7O0lBRS9ELG1EQUEwRDs7Ozs7SUFDMUQsaURBQWlFOzs7OztJQUNqRSxzREFBeUQ7Ozs7OztJQTRCekQsMENBS0U7Ozs7O0lBRUYsMENBQTZDOzs7OztJQUd6QyxtQ0FBd0I7Ozs7O0lBQ3hCLG9DQUEwQjs7Ozs7SUFDMUIsb0NBQXNDOzs7OztJQUV0QywwQ0FFdUM7Ozs7O0lBQ3ZDLHdDQUVzQzs7Ozs7SUFDdEMsNENBQTBDOzs7Ozs7OztBQStObEQsU0FBUyxtQkFBbUIsQ0FDeEIsTUFBd0IsRUFDeEIsY0FBZ0M7SUFFaEMsT0FBTyxZQUFZLENBQUMsSUFBSSxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGlhbG9nLnNlcnZpY2VcbiAqL1xuXG5pbXBvcnQge1xuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3RvcixcbiAgICBPcHRpb25hbCxcbiAgICBTa2lwU2VsZixcbiAgICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE93bERpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZy5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dSZWYgfSBmcm9tICcuL2RpYWxvZy1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBleHRlbmRPYmplY3QgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBkZWZlciwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlDb25maWcsXG4gICAgT3ZlcmxheUNvbnRhaW5lcixcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50UG9ydGFsLFxuICAgIENvbXBvbmVudFR5cGUsXG4gICAgUG9ydGFsSW5qZWN0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5cbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX0RBVEEgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignT3dsRGlhbG9nRGF0YScpO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgZGlhbG9nIGlzIG9wZW4uXG4gKiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPFxuICAgICgpID0+IFNjcm9sbFN0cmF0ZWd5XG4+KCdvd2wtZGlhbG9nLXNjcm9sbC1zdHJhdGVneScpO1xuXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWShcbiAgICBvdmVybGF5OiBPdmVybGF5XG4pOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgY29uc3QgZm4gPSAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKTtcbiAgICByZXR1cm4gZm47XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUllcbn07XG5cbi8qKiBJXG4gKiBuamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgZGVmYXVsdCBkaWFsb2cgb3B0aW9ucy5cbiAqICovXG5leHBvcnQgY29uc3QgT1dMX0RJQUxPR19ERUZBVUxUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48T3dsRGlhbG9nQ29uZmlnPihcbiAgICAnb3dsLWRpYWxvZy1kZWZhdWx0LW9wdGlvbnMnXG4pO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nU2VydmljZSB7XG4gICAgcHJpdmF0ZSBhcmlhSGlkZGVuRWxlbWVudHMgPSBuZXcgTWFwPEVsZW1lbnQsIHN0cmluZyB8IG51bGw+KCk7XG5cbiAgICBwcml2YXRlIF9vcGVuRGlhbG9nc0F0VGhpc0xldmVsOiBPd2xEaWFsb2dSZWY8YW55PltdID0gW107XG4gICAgcHJpdmF0ZSBfYWZ0ZXJPcGVuQXRUaGlzTGV2ZWwgPSBuZXcgU3ViamVjdDxPd2xEaWFsb2dSZWY8YW55Pj4oKTtcbiAgICBwcml2YXRlIF9hZnRlckFsbENsb3NlZEF0VGhpc0xldmVsID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9ncy4gKi9cbiAgICBnZXQgb3BlbkRpYWxvZ3MoKTogT3dsRGlhbG9nUmVmPGFueT5bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudERpYWxvZ1xuICAgICAgICAgICAgPyB0aGlzLnBhcmVudERpYWxvZy5vcGVuRGlhbG9nc1xuICAgICAgICAgICAgOiB0aGlzLl9vcGVuRGlhbG9nc0F0VGhpc0xldmVsO1xuICAgIH1cblxuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGEgZGlhbG9nIGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgICBnZXQgYWZ0ZXJPcGVuKCk6IFN1YmplY3Q8T3dsRGlhbG9nUmVmPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RGlhbG9nXG4gICAgICAgICAgICA/IHRoaXMucGFyZW50RGlhbG9nLmFmdGVyT3BlblxuICAgICAgICAgICAgOiB0aGlzLl9hZnRlck9wZW5BdFRoaXNMZXZlbDtcbiAgICB9XG5cbiAgICBnZXQgX2FmdGVyQWxsQ2xvc2VkKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50RGlhbG9nO1xuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICAgICAgICA/IHBhcmVudC5fYWZ0ZXJBbGxDbG9zZWRcbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGFsbCBvcGVuIGRpYWxvZyBoYXZlIGZpbmlzaGVkIGNsb3NpbmcuXG4gICAgICogV2lsbCBlbWl0IG9uIHN1YnNjcmliZSBpZiB0aGVyZSBhcmUgbm8gb3BlbiBkaWFsb2dzIHRvIGJlZ2luIHdpdGguXG4gICAgICovXG5cbiAgICBhZnRlckFsbENsb3NlZDogT2JzZXJ2YWJsZTx7fT4gPSBkZWZlcihcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICAgIHRoaXMuX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWwubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9hZnRlckFsbENsb3NlZFxuICAgICAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJBbGxDbG9zZWQucGlwZShzdGFydFdpdGgodW5kZWZpbmVkKSlcbiAgICApO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19ERUZBVUxUX09QVElPTlMpXG4gICAgICAgIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE93bERpYWxvZ0NvbmZpZyxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQFNraXBTZWxmKClcbiAgICAgICAgcHJpdmF0ZSBwYXJlbnREaWFsb2c6IE93bERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheUNvbnRhaW5lcjogT3ZlcmxheUNvbnRhaW5lclxuICAgICkge1xuICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XG4gICAgICAgIGlmICghcGFyZW50RGlhbG9nICYmIGxvY2F0aW9uKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZUFsbCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuPFQ+KFxuICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgICAgIGNvbmZpZz86IE93bERpYWxvZ0NvbmZpZ1xuICAgICk6IE93bERpYWxvZ1JlZjxhbnk+IHtcbiAgICAgICAgY29uZmlnID0gYXBwbHlDb25maWdEZWZhdWx0cyhjb25maWcsIHRoaXMuZGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChjb25maWcuaWQgJiYgdGhpcy5nZXREaWFsb2dCeUlkKGNvbmZpZy5pZCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBEaWFsb2cgd2l0aCBpZCBcIiR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5pZFxuICAgICAgICAgICAgICAgIH1cIiBleGlzdHMgYWxyZWFkeS4gVGhlIGRpYWxvZyBpZCBtdXN0IGJlIHVuaXF1ZS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShjb25maWcpO1xuICAgICAgICBjb25zdCBkaWFsb2dDb250YWluZXIgPSB0aGlzLmF0dGFjaERpYWxvZ0NvbnRhaW5lcihvdmVybGF5UmVmLCBjb25maWcpO1xuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmF0dGFjaERpYWxvZ0NvbnRlbnQ8VD4oXG4gICAgICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmLFxuICAgICAgICAgICAgZGlhbG9nQ29udGFpbmVyLFxuICAgICAgICAgICAgb3ZlcmxheVJlZixcbiAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU5vbkRpYWxvZ0NvbnRlbnRGcm9tQXNzaXN0aXZlVGVjaG5vbG9neSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuRGlhbG9ncy5wdXNoKGRpYWxvZ1JlZik7XG4gICAgICAgIGRpYWxvZ1JlZlxuICAgICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVPcGVuRGlhbG9nKGRpYWxvZ1JlZikpO1xuICAgICAgICB0aGlzLmFmdGVyT3Blbi5uZXh0KGRpYWxvZ1JlZik7XG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9ncy5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIGxldCBpID0gdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nc1tpXS5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW4gb3BlbiBkaWFsb2cgYnkgaXRzIGlkLlxuICAgICAqIEBwYXJhbSBpZCBJRCB0byB1c2Ugd2hlbiBsb29raW5nIHVwIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgcHVibGljIGdldERpYWxvZ0J5SWQoaWQ6IHN0cmluZyk6IE93bERpYWxvZ1JlZjxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbkRpYWxvZ3MuZmluZChkaWFsb2cgPT4gZGlhbG9nLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hEaWFsb2dDb250ZW50PFQ+KFxuICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgICAgIGRpYWxvZ0NvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgICAgICBjb25maWc6IE93bERpYWxvZ0NvbmZpZ1xuICAgICkge1xuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSBuZXcgT3dsRGlhbG9nUmVmPFQ+KFxuICAgICAgICAgICAgb3ZlcmxheVJlZixcbiAgICAgICAgICAgIGRpYWxvZ0NvbnRhaW5lcixcbiAgICAgICAgICAgIGNvbmZpZy5pZCxcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY29uZmlnLmhhc0JhY2tkcm9wKSB7XG4gICAgICAgICAgICBvdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZGlhbG9nUmVmLmRpc2FibGVDbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wb25lbnRPclRlbXBsYXRlUmVmIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3RvcjxUPihcbiAgICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgICAgZGlhbG9nUmVmLFxuICAgICAgICAgICAgICAgIGRpYWxvZ0NvbnRhaW5lclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBkaWFsb2dDb250YWluZXIuYXR0YWNoQ29tcG9uZW50UG9ydGFsKFxuICAgICAgICAgICAgICAgIG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgdW5kZWZpbmVkLCBpbmplY3RvcilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UgPSBjb250ZW50UmVmLmluc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlhbG9nUmVmXG4gICAgICAgICAgICAudXBkYXRlU2l6ZShjb25maWcud2lkdGgsIGNvbmZpZy5oZWlnaHQpXG4gICAgICAgICAgICAudXBkYXRlUG9zaXRpb24oY29uZmlnLnBvc2l0aW9uKTtcblxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSW5qZWN0b3I8VD4oXG4gICAgICAgIGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnLFxuICAgICAgICBkaWFsb2dSZWY6IE93bERpYWxvZ1JlZjxUPixcbiAgICAgICAgZGlhbG9nQ29udGFpbmVyOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnRcbiAgICApIHtcbiAgICAgICAgY29uc3QgdXNlckluamVjdG9yID1cbiAgICAgICAgICAgIGNvbmZpZyAmJlxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWYgJiZcbiAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmLmluamVjdG9yO1xuICAgICAgICBjb25zdCBpbmplY3Rpb25Ub2tlbnMgPSBuZXcgV2Vha01hcCgpO1xuXG4gICAgICAgIGluamVjdGlvblRva2Vucy5zZXQoT3dsRGlhbG9nUmVmLCBkaWFsb2dSZWYpO1xuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCwgZGlhbG9nQ29udGFpbmVyKTtcbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPV0xfRElBTE9HX0RBVEEsIGNvbmZpZy5kYXRhKTtcblxuICAgICAgICByZXR1cm4gbmV3IFBvcnRhbEluamVjdG9yKFxuICAgICAgICAgICAgdXNlckluamVjdG9yIHx8IHRoaXMuaW5qZWN0b3IsXG4gICAgICAgICAgICBpbmplY3Rpb25Ub2tlbnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoY29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IHRoaXMuZ2V0T3ZlcmxheUNvbmZpZyhjb25maWcpO1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaERpYWxvZ0NvbnRhaW5lcihcbiAgICAgICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWdcbiAgICApOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQge1xuICAgICAgICBjb25zdCBjb250YWluZXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKFxuICAgICAgICAgICAgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVmOiBDb21wb25lbnRSZWY8XG4gICAgICAgICAgICBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnRcbiAgICAgICAgPiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XG4gICAgICAgIGNvbnRhaW5lclJlZi5pbnN0YW5jZS5zZXRDb25maWcoY29uZmlnKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyUmVmLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZyhkaWFsb2dDb25maWc6IE93bERpYWxvZ0NvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6XG4gICAgICAgICAgICAgICAgZGlhbG9nQ29uZmlnLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6IGRpYWxvZ0NvbmZpZy5wYW5lQ2xhc3MsXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogZGlhbG9nQ29uZmlnLmhhc0JhY2tkcm9wLFxuICAgICAgICAgICAgbWluV2lkdGg6IGRpYWxvZ0NvbmZpZy5taW5XaWR0aCxcbiAgICAgICAgICAgIG1pbkhlaWdodDogZGlhbG9nQ29uZmlnLm1pbkhlaWdodCxcbiAgICAgICAgICAgIG1heFdpZHRoOiBkaWFsb2dDb25maWcubWF4V2lkdGgsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IGRpYWxvZ0NvbmZpZy5tYXhIZWlnaHRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzKSB7XG4gICAgICAgICAgICBzdGF0ZS5iYWNrZHJvcENsYXNzID0gZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVPcGVuRGlhbG9nKGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPGFueT4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9vcGVuRGlhbG9nc0F0VGhpc0xldmVsLmluZGV4T2YoZGlhbG9nUmVmKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9ncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgLy8gSWYgYWxsIHRoZSBkaWFsb2dzIHdlcmUgY2xvc2VkLCByZW1vdmUvcmVzdG9yZSB0aGUgYGFyaWEtaGlkZGVuYFxuICAgICAgICAgICAgLy8gdG8gYSB0aGUgc2libGluZ3MgYW5kIGVtaXQgdG8gdGhlIGBhZnRlckFsbENsb3NlZGAgc3RyZWFtLlxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLmZvckVhY2goKHByZXZpb3VzVmFsdWUsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHByZXZpb3VzVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJBbGxDbG9zZWQubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgYWxsIG9mIHRoZSBjb250ZW50IHRoYXQgaXNuJ3QgYW4gb3ZlcmxheSBmcm9tIGFzc2lzdGl2ZSB0ZWNobm9sb2d5LlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlkZU5vbkRpYWxvZ0NvbnRlbnRGcm9tQXNzaXN0aXZlVGVjaG5vbG9neSgpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbnRhaW5lciA9IHRoaXMub3ZlcmxheUNvbnRhaW5lci5nZXRDb250YWluZXJFbGVtZW50KCk7XG5cbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIG92ZXJsYXkgY29udGFpbmVyIGlzIGF0dGFjaGVkIHRvIHRoZSBET00uXG4gICAgICAgIGlmIChvdmVybGF5Q29udGFpbmVyLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gb3ZlcmxheUNvbnRhaW5lci5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc2libGluZ3MubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nICE9PSBvdmVybGF5Q29udGFpbmVyICYmXG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcubm9kZU5hbWUgIT09ICdTQ1JJUFQnICYmXG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcubm9kZU5hbWUgIT09ICdTVFlMRScgJiZcbiAgICAgICAgICAgICAgICAgICAgIXNpYmxpbmcuaGFzQXR0cmlidXRlKCdhcmlhLWxpdmUnKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFyaWFIaWRkZW5FbGVtZW50cy5zZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZy5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgc2libGluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQXBwbGllcyBkZWZhdWx0IG9wdGlvbnMgdG8gdGhlIGRpYWxvZyBjb25maWcuXG4gKiBAcGFyYW0gY29uZmlnIENvbmZpZyB0byBiZSBtb2RpZmllZC5cbiAqIEBwYXJhbSBkZWZhdWx0T3B0aW9ucyBEZWZhdWx0IGNvbmZpZyBzZXR0aW5nXG4gKiBAcmV0dXJucyBUaGUgbmV3IGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBhcHBseUNvbmZpZ0RlZmF1bHRzKFxuICAgIGNvbmZpZz86IE93bERpYWxvZ0NvbmZpZyxcbiAgICBkZWZhdWx0T3B0aW9ucz86IE93bERpYWxvZ0NvbmZpZ1xuKTogT3dsRGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4gZXh0ZW5kT2JqZWN0KG5ldyBPd2xEaWFsb2dDb25maWcoKSwgY29uZmlnLCBkZWZhdWx0T3B0aW9ucyk7XG59XG4iXX0=