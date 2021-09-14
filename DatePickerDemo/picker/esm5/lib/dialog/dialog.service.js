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
export var OWL_DIALOG_DATA = new InjectionToken('OwlDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 *
 * @type {?}
 */
export var OWL_DIALOG_SCROLL_STRATEGY = new InjectionToken('owl-dialog-scroll-strategy');
/**
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    /** @type {?} */
    var fn = (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.block(); });
    return fn;
}
/**
 * \@docs-private
 * @type {?}
 */
export var OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
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
export var OWL_DIALOG_DEFAULT_OPTIONS = new InjectionToken('owl-dialog-default-options');
var OwlDialogService = /** @class */ (function () {
    function OwlDialogService(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
        var _this = this;
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
        function () {
            return _this._openDialogsAtThisLevel.length
                ? _this._afterAllClosed
                : _this._afterAllClosed.pipe(startWith(undefined));
        }));
        this.scrollStrategy = scrollStrategy;
        if (!parentDialog && location) {
            location.subscribe((/**
             * @return {?}
             */
            function () { return _this.closeAll(); }));
        }
    }
    Object.defineProperty(OwlDialogService.prototype, "openDialogs", {
        /** Keeps track of the currently-open dialogs. */
        get: /**
         * Keeps track of the currently-open dialogs.
         * @return {?}
         */
        function () {
            return this.parentDialog
                ? this.parentDialog.openDialogs
                : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogService.prototype, "afterOpen", {
        /** Stream that emits when a dialog has been opened. */
        get: /**
         * Stream that emits when a dialog has been opened.
         * @return {?}
         */
        function () {
            return this.parentDialog
                ? this.parentDialog.afterOpen
                : this._afterOpenAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogService.prototype, "_afterAllClosed", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var parent = this.parentDialog;
            return parent
                ? parent._afterAllClosed
                : this._afterAllClosedAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    OwlDialogService.prototype.open = /**
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    function (componentOrTemplateRef, config) {
        var _this = this;
        config = applyConfigDefaults(config, this.defaultOptions);
        if (config.id && this.getDialogById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        /** @type {?} */
        var overlayRef = this.createOverlay(config);
        /** @type {?} */
        var dialogContainer = this.attachDialogContainer(overlayRef, config);
        /** @type {?} */
        var dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this.openDialogs.length) {
            this.hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef
            .afterClosed()
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.removeOpenDialog(dialogRef); }));
        this.afterOpen.next(dialogRef);
        return dialogRef;
    };
    /**
     * Closes all of the currently-open dialogs.
     */
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    OwlDialogService.prototype.closeAll = /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.openDialogs.length;
        while (i--) {
            this.openDialogs[i].close();
        }
    };
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    OwlDialogService.prototype.getDialogById = /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    function (id) {
        return this.openDialogs.find((/**
         * @param {?} dialog
         * @return {?}
         */
        function (dialog) { return dialog.id === id; }));
    };
    /**
     * @private
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?} dialogContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    OwlDialogService.prototype.attachDialogContent = /**
     * @private
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?} dialogContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        /** @type {?} */
        var dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe((/**
             * @return {?}
             */
            function () {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            }));
        }
        if (componentOrTemplateRef instanceof TemplateRef) {
        }
        else {
            /** @type {?} */
            var injector = this.createInjector(config, dialogRef, dialogContainer);
            /** @type {?} */
            var contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * @private
     * @template T
     * @param {?} config
     * @param {?} dialogRef
     * @param {?} dialogContainer
     * @return {?}
     */
    OwlDialogService.prototype.createInjector = /**
     * @private
     * @template T
     * @param {?} config
     * @param {?} dialogRef
     * @param {?} dialogContainer
     * @return {?}
     */
    function (config, dialogRef, dialogContainer) {
        /** @type {?} */
        var userInjector = config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;
        /** @type {?} */
        var injectionTokens = new WeakMap();
        injectionTokens.set(OwlDialogRef, dialogRef);
        injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
        injectionTokens.set(OWL_DIALOG_DATA, config.data);
        return new PortalInjector(userInjector || this.injector, injectionTokens);
    };
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    OwlDialogService.prototype.createOverlay = /**
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    };
    /**
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    OwlDialogService.prototype.attachDialogContainer = /**
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (overlayRef, config) {
        /** @type {?} */
        var containerPortal = new ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
        /** @type {?} */
        var containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.setConfig(config);
        return containerRef.instance;
    };
    /**
     * @private
     * @param {?} dialogConfig
     * @return {?}
     */
    OwlDialogService.prototype.getOverlayConfig = /**
     * @private
     * @param {?} dialogConfig
     * @return {?}
     */
    function (dialogConfig) {
        /** @type {?} */
        var state = new OverlayConfig({
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
    };
    /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    OwlDialogService.prototype.removeOpenDialog = /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        /** @type {?} */
        var index = this._openDialogsAtThisLevel.indexOf(dialogRef);
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
                function (previousValue, element) {
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
    };
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     */
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @private
     * @return {?}
     */
    OwlDialogService.prototype.hideNonDialogContentFromAssistiveTechnology = /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayContainer = this.overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            /** @type {?} */
            var siblings = overlayContainer.parentElement.children;
            for (var i = siblings.length - 1; i > -1; i--) {
                /** @type {?} */
                var sibling = siblings[i];
                if (sibling !== overlayContainer &&
                    sibling.nodeName !== 'SCRIPT' &&
                    sibling.nodeName !== 'STYLE' &&
                    !sibling.hasAttribute('aria-live')) {
                    this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    };
    OwlDialogService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OwlDialogService.ctorParameters = function () { return [
        { type: Overlay },
        { type: Injector },
        { type: Location, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Inject, args: [OWL_DIALOG_SCROLL_STRATEGY,] }] },
        { type: OwlDialogConfig, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DIALOG_DEFAULT_OPTIONS,] }] },
        { type: OwlDialogService, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: OverlayContainer }
    ]; };
    return OwlDialogService;
}());
export { OwlDialogService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUNILE9BQU8sRUFDUCxhQUFhLEVBQ2IsZ0JBQWdCLEVBR25CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNILGVBQWUsRUFFZixjQUFjLEVBQ2pCLE1BQU0scUJBQXFCLENBQUM7O0FBRTdCLE1BQU0sS0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQU0sZUFBZSxDQUFDOzs7Ozs7QUFLdkUsTUFBTSxLQUFPLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUUxRCw0QkFBNEIsQ0FBQzs7Ozs7QUFFL0IsTUFBTSxVQUFVLDJDQUEyQyxDQUN2RCxPQUFnQjs7UUFFVixFQUFFOzs7SUFBRyxjQUFNLE9BQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFoQyxD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dEMsMENBRXVDOzs7OztJQUN2Qyx3Q0FFc0M7Ozs7O0lBQ3RDLDRDQUEwQzs7Ozs7Ozs7QUErTmxELFNBQVMsbUJBQW1CLENBQ3hCLE1BQXdCLEVBQ3hCLGNBQWdDO0lBRWhDLE9BQU8sWUFBWSxDQUFDLElBQUksZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRpYWxvZy5zZXJ2aWNlXG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGFibGUsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5qZWN0b3IsXG4gICAgT3B0aW9uYWwsXG4gICAgU2tpcFNlbGYsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb25maWcgfSBmcm9tICcuL2RpYWxvZy1jb25maWcuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGlhbG9nUmVmIH0gZnJvbSAnLi9kaWFsb2ctcmVmLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgZXh0ZW5kT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZGVmZXIsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29uZmlnLFxuICAgIE92ZXJsYXlDb250YWluZXIsXG4gICAgT3ZlcmxheVJlZixcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudFBvcnRhbCxcbiAgICBDb21wb25lbnRUeXBlLFxuICAgIFBvcnRhbEluamVjdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuXG5leHBvcnQgY29uc3QgT1dMX0RJQUxPR19EQVRBID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ093bERpYWxvZ0RhdGEnKTtcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGRpYWxvZyBpcyBvcGVuLlxuICogKi9cbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcbiAgICAoKSA9PiBTY3JvbGxTdHJhdGVneVxuPignb3dsLWRpYWxvZy1zY3JvbGwtc3RyYXRlZ3knKTtcblxuZXhwb3J0IGZ1bmN0aW9uIE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlkoXG4gICAgb3ZlcmxheTogT3ZlcmxheVxuKTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIGNvbnN0IGZuID0gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XG4gICAgcmV0dXJuIGZuO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZXG59O1xuXG4vKiogSVxuICogbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGRlZmF1bHQgZGlhbG9nIG9wdGlvbnMuXG4gKiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfREVGQVVMVF9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPE93bERpYWxvZ0NvbmZpZz4oXG4gICAgJ293bC1kaWFsb2ctZGVmYXVsdC1vcHRpb25zJ1xuKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ1NlcnZpY2Uge1xuICAgIHByaXZhdGUgYXJpYUhpZGRlbkVsZW1lbnRzID0gbmV3IE1hcDxFbGVtZW50LCBzdHJpbmcgfCBudWxsPigpO1xuXG4gICAgcHJpdmF0ZSBfb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDogT3dsRGlhbG9nUmVmPGFueT5bXSA9IFtdO1xuICAgIHByaXZhdGUgX2FmdGVyT3BlbkF0VGhpc0xldmVsID0gbmV3IFN1YmplY3Q8T3dsRGlhbG9nUmVmPGFueT4+KCk7XG4gICAgcHJpdmF0ZSBfYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3MuICovXG4gICAgZ2V0IG9wZW5EaWFsb2dzKCk6IE93bERpYWxvZ1JlZjxhbnk+W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaWFsb2dcbiAgICAgICAgICAgID8gdGhpcy5wYXJlbnREaWFsb2cub3BlbkRpYWxvZ3NcbiAgICAgICAgICAgIDogdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDtcbiAgICB9XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIGRpYWxvZyBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgZ2V0IGFmdGVyT3BlbigpOiBTdWJqZWN0PE93bERpYWxvZ1JlZjxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudERpYWxvZ1xuICAgICAgICAgICAgPyB0aGlzLnBhcmVudERpYWxvZy5hZnRlck9wZW5cbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJPcGVuQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgZ2V0IF9hZnRlckFsbENsb3NlZCgpOiBhbnkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudERpYWxvZztcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgICAgICAgPyBwYXJlbnQuX2FmdGVyQWxsQ2xvc2VkXG4gICAgICAgICAgICA6IHRoaXMuX2FmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbGwgb3BlbiBkaWFsb2cgaGF2ZSBmaW5pc2hlZCBjbG9zaW5nLlxuICAgICAqIFdpbGwgZW1pdCBvbiBzdWJzY3JpYmUgaWYgdGhlcmUgYXJlIG5vIG9wZW4gZGlhbG9ncyB0byBiZWdpbiB3aXRoLlxuICAgICAqL1xuXG4gICAgYWZ0ZXJBbGxDbG9zZWQ6IE9ic2VydmFibGU8e30+ID0gZGVmZXIoXG4gICAgICAgICgpID0+XG4gICAgICAgICAgICB0aGlzLl9vcGVuRGlhbG9nc0F0VGhpc0xldmVsLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gdGhpcy5fYWZ0ZXJBbGxDbG9zZWRcbiAgICAgICAgICAgICAgICA6IHRoaXMuX2FmdGVyQWxsQ2xvc2VkLnBpcGUoc3RhcnRXaXRoKHVuZGVmaW5lZCkpXG4gICAgKTtcblxuICAgIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICBASW5qZWN0KE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9ESUFMT0dfREVGQVVMVF9PUFRJT05TKVxuICAgICAgICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBPd2xEaWFsb2dDb25maWcsXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBTa2lwU2VsZigpXG4gICAgICAgIHByaXZhdGUgcGFyZW50RGlhbG9nOiBPd2xEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG92ZXJsYXlDb250YWluZXI6IE92ZXJsYXlDb250YWluZXJcbiAgICApIHtcbiAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSA9IHNjcm9sbFN0cmF0ZWd5O1xuICAgICAgICBpZiAoIXBhcmVudERpYWxvZyAmJiBsb2NhdGlvbikge1xuICAgICAgICAgICAgbG9jYXRpb24uc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VBbGwoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbjxUPihcbiAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgICAgICBjb25maWc/OiBPd2xEaWFsb2dDb25maWdcbiAgICApOiBPd2xEaWFsb2dSZWY8YW55PiB7XG4gICAgICAgIGNvbmZpZyA9IGFwcGx5Q29uZmlnRGVmYXVsdHMoY29uZmlnLCB0aGlzLmRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICBpZiAoY29uZmlnLmlkICYmIHRoaXMuZ2V0RGlhbG9nQnlJZChjb25maWcuaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgRGlhbG9nIHdpdGggaWQgXCIke1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuaWRcbiAgICAgICAgICAgICAgICB9XCIgZXhpc3RzIGFscmVhZHkuIFRoZSBkaWFsb2cgaWQgbXVzdCBiZSB1bmlxdWUuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoY29uZmlnKTtcbiAgICAgICAgY29uc3QgZGlhbG9nQ29udGFpbmVyID0gdGhpcy5hdHRhY2hEaWFsb2dDb250YWluZXIob3ZlcmxheVJlZiwgY29uZmlnKTtcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5hdHRhY2hEaWFsb2dDb250ZW50PFQ+KFxuICAgICAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZixcbiAgICAgICAgICAgIGRpYWxvZ0NvbnRhaW5lcixcbiAgICAgICAgICAgIG92ZXJsYXlSZWYsXG4gICAgICAgICAgICBjb25maWdcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMub3BlbkRpYWxvZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVOb25EaWFsb2dDb250ZW50RnJvbUFzc2lzdGl2ZVRlY2hub2xvZ3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlbkRpYWxvZ3MucHVzaChkaWFsb2dSZWYpO1xuICAgICAgICBkaWFsb2dSZWZcbiAgICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVtb3ZlT3BlbkRpYWxvZyhkaWFsb2dSZWYpKTtcbiAgICAgICAgdGhpcy5hZnRlck9wZW4ubmV4dChkaWFsb2dSZWYpO1xuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyBhbGwgb2YgdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3MuXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlQWxsKCk6IHZvaWQge1xuICAgICAgICBsZXQgaSA9IHRoaXMub3BlbkRpYWxvZ3MubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkRpYWxvZ3NbaV0uY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGFuIG9wZW4gZGlhbG9nIGJ5IGl0cyBpZC5cbiAgICAgKiBAcGFyYW0gaWQgSUQgdG8gdXNlIHdoZW4gbG9va2luZyB1cCB0aGUgZGlhbG9nLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXREaWFsb2dCeUlkKGlkOiBzdHJpbmcpOiBPd2xEaWFsb2dSZWY8YW55PiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5EaWFsb2dzLmZpbmQoZGlhbG9nID0+IGRpYWxvZy5pZCA9PT0gaWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoRGlhbG9nQ29udGVudDxUPihcbiAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgICAgICBkaWFsb2dDb250YWluZXI6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWdcbiAgICApIHtcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gbmV3IE93bERpYWxvZ1JlZjxUPihcbiAgICAgICAgICAgIG92ZXJsYXlSZWYsXG4gICAgICAgICAgICBkaWFsb2dDb250YWluZXIsXG4gICAgICAgICAgICBjb25maWcuaWQsXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5oYXNCYWNrZHJvcCkge1xuICAgICAgICAgICAgb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcG9uZW50T3JUZW1wbGF0ZVJlZiBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3I8VD4oXG4gICAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICAgIGRpYWxvZ1JlZixcbiAgICAgICAgICAgICAgICBkaWFsb2dDb250YWluZXJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50UmVmID0gZGlhbG9nQ29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbChcbiAgICAgICAgICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIHVuZGVmaW5lZCwgaW5qZWN0b3IpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlID0gY29udGVudFJlZi5pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpYWxvZ1JlZlxuICAgICAgICAgICAgLnVwZGF0ZVNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KVxuICAgICAgICAgICAgLnVwZGF0ZVBvc2l0aW9uKGNvbmZpZy5wb3NpdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUluamVjdG9yPFQ+KFxuICAgICAgICBjb25maWc6IE93bERpYWxvZ0NvbmZpZyxcbiAgICAgICAgZGlhbG9nUmVmOiBPd2xEaWFsb2dSZWY8VD4sXG4gICAgICAgIGRpYWxvZ0NvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50XG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHVzZXJJbmplY3RvciA9XG4gICAgICAgICAgICBjb25maWcgJiZcbiAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmICYmXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZi5pbmplY3RvcjtcbiAgICAgICAgY29uc3QgaW5qZWN0aW9uVG9rZW5zID0gbmV3IFdlYWtNYXAoKTtcblxuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE93bERpYWxvZ1JlZiwgZGlhbG9nUmVmKTtcbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsIGRpYWxvZ0NvbnRhaW5lcik7XG4gICAgICAgIGluamVjdGlvblRva2Vucy5zZXQoT1dMX0RJQUxPR19EQVRBLCBjb25maWcuZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQb3J0YWxJbmplY3RvcihcbiAgICAgICAgICAgIHVzZXJJbmplY3RvciB8fCB0aGlzLmluamVjdG9yLFxuICAgICAgICAgICAgaW5qZWN0aW9uVG9rZW5zXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSB0aGlzLmdldE92ZXJsYXlDb25maWcoY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hEaWFsb2dDb250YWluZXIoXG4gICAgICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgICAgIGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnXG4gICAgKTogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChcbiAgICAgICAgICAgIE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPFxuICAgICAgICAgICAgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50XG4gICAgICAgID4gPSBvdmVybGF5UmVmLmF0dGFjaChjb250YWluZXJQb3J0YWwpO1xuICAgICAgICBjb250YWluZXJSZWYuaW5zdGFuY2Uuc2V0Q29uZmlnKGNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoZGlhbG9nQ29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiBPdmVybGF5Q29uZmlnIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKSxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OlxuICAgICAgICAgICAgICAgIGRpYWxvZ0NvbmZpZy5zY3JvbGxTdHJhdGVneSB8fCB0aGlzLnNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBkaWFsb2dDb25maWcucGFuZUNsYXNzLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGRpYWxvZ0NvbmZpZy5oYXNCYWNrZHJvcCxcbiAgICAgICAgICAgIG1pbldpZHRoOiBkaWFsb2dDb25maWcubWluV2lkdGgsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IGRpYWxvZ0NvbmZpZy5taW5IZWlnaHQsXG4gICAgICAgICAgICBtYXhXaWR0aDogZGlhbG9nQ29uZmlnLm1heFdpZHRoLFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiBkaWFsb2dDb25maWcubWF4SGVpZ2h0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcykge1xuICAgICAgICAgICAgc3RhdGUuYmFja2Ryb3BDbGFzcyA9IGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlT3BlbkRpYWxvZyhkaWFsb2dSZWY6IE93bERpYWxvZ1JlZjxhbnk+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbC5pbmRleE9mKGRpYWxvZ1JlZik7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkRpYWxvZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIC8vIElmIGFsbCB0aGUgZGlhbG9ncyB3ZXJlIGNsb3NlZCwgcmVtb3ZlL3Jlc3RvcmUgdGhlIGBhcmlhLWhpZGRlbmBcbiAgICAgICAgICAgIC8vIHRvIGEgdGhlIHNpYmxpbmdzIGFuZCBlbWl0IHRvIHRoZSBgYWZ0ZXJBbGxDbG9zZWRgIHN0cmVhbS5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFyaWFIaWRkZW5FbGVtZW50cy5mb3JFYWNoKChwcmV2aW91c1ZhbHVlLCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBwcmV2aW91c1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFyaWFIaWRkZW5FbGVtZW50cy5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FmdGVyQWxsQ2xvc2VkLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIGFsbCBvZiB0aGUgY29udGVudCB0aGF0IGlzbid0IGFuIG92ZXJsYXkgZnJvbSBhc3Npc3RpdmUgdGVjaG5vbG9neS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZGVOb25EaWFsb2dDb250ZW50RnJvbUFzc2lzdGl2ZVRlY2hub2xvZ3koKSB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb250YWluZXIgPSB0aGlzLm92ZXJsYXlDb250YWluZXIuZ2V0Q29udGFpbmVyRWxlbWVudCgpO1xuXG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBvdmVybGF5IGNvbnRhaW5lciBpcyBhdHRhY2hlZCB0byB0aGUgRE9NLlxuICAgICAgICBpZiAob3ZlcmxheUNvbnRhaW5lci5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBzaWJsaW5ncyA9IG92ZXJsYXlDb250YWluZXIucGFyZW50RWxlbWVudC5jaGlsZHJlbjtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNpYmxpbmdzLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmcgPSBzaWJsaW5nc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgc2libGluZyAhPT0gb3ZlcmxheUNvbnRhaW5lciAmJlxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU0NSSVBUJyAmJlxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU1RZTEUnICYmXG4gICAgICAgICAgICAgICAgICAgICFzaWJsaW5nLmhhc0F0dHJpYnV0ZSgnYXJpYS1saXZlJylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFwcGxpZXMgZGVmYXVsdCBvcHRpb25zIHRvIHRoZSBkaWFsb2cgY29uZmlnLlxuICogQHBhcmFtIGNvbmZpZyBDb25maWcgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcGFyYW0gZGVmYXVsdE9wdGlvbnMgRGVmYXVsdCBjb25maWcgc2V0dGluZ1xuICogQHJldHVybnMgVGhlIG5ldyBjb25maWd1cmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYXBwbHlDb25maWdEZWZhdWx0cyhcbiAgICBjb25maWc/OiBPd2xEaWFsb2dDb25maWcsXG4gICAgZGVmYXVsdE9wdGlvbnM/OiBPd2xEaWFsb2dDb25maWdcbik6IE93bERpYWxvZ0NvbmZpZyB7XG4gICAgcmV0dXJuIGV4dGVuZE9iamVjdChuZXcgT3dsRGlhbG9nQ29uZmlnKCksIGNvbmZpZywgZGVmYXVsdE9wdGlvbnMpO1xufVxuIl19