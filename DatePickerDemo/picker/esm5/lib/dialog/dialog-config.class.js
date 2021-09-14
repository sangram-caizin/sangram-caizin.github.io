/**
 * @fileoverview added by tsickle
 * Generated from: lib/dialog/dialog-config.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NoopScrollStrategy } from '@angular/cdk/overlay';
/** @type {?} */
var uniqueId = 0;
/**
 * Possible overrides for a dialog's position.
 * @record
 */
export function DialogPosition() { }
if (false) {
    /**
     * Override for the dialog's top position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.top;
    /**
     * Override for the dialog's bottom position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.bottom;
    /**
     * Override for the dialog's left position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.left;
    /**
     * Override for the dialog's right position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.right;
}
var OwlDialogConfig = /** @class */ (function () {
    function OwlDialogConfig() {
        /**
         * ID of the element that describes the dialog.
         */
        this.ariaDescribedBy = null;
        /**
         * Whether to focus the dialog when the dialog is opened
         */
        this.autoFocus = true;
        /**
         * Whether the dialog has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * Whether the user can use escape or clicking outside to close a modal.
         */
        this.disableClose = false;
        /**
         * The ARIA role of the dialog element.
         */
        this.role = 'dialog';
        /**
         * Custom class for the pane
         *
         */
        this.paneClass = '';
        /**
         * Mouse Event
         *
         */
        this.event = null;
        /**
         * Custom class for the backdrop
         *
         */
        this.backdropClass = '';
        /**
         * Whether the dialog should close when the user goes backwards/forwards in history.
         *
         */
        this.closeOnNavigation = true;
        /**
         * Width of the dialog.
         */
        this.width = '';
        /**
         * Height of the dialog.
         */
        this.height = '';
        /**
         * The max-width of the overlay panel.
         * If a number is provided, pixel units are assumed.
         *
         */
        this.maxWidth = '85vw';
        /**
         * The scroll strategy when the dialog is open
         * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
         *
         */
        this.scrollStrategy = new NoopScrollStrategy();
        this.id = "owl-dialog-" + uniqueId++;
    }
    return OwlDialogConfig;
}());
export { OwlDialogConfig };
if (false) {
    /**
     * ID of the element that describes the dialog.
     * @type {?}
     */
    OwlDialogConfig.prototype.ariaDescribedBy;
    /**
     * Whether to focus the dialog when the dialog is opened
     * @type {?}
     */
    OwlDialogConfig.prototype.autoFocus;
    /**
     * Whether the dialog has a backdrop.
     * @type {?}
     */
    OwlDialogConfig.prototype.hasBackdrop;
    /**
     * Custom style for the backdrop
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.backdropStyle;
    /**
     * Data being injected into the child component.
     * @type {?}
     */
    OwlDialogConfig.prototype.data;
    /**
     * Whether the user can use escape or clicking outside to close a modal.
     * @type {?}
     */
    OwlDialogConfig.prototype.disableClose;
    /**
     * ID for the modal. If omitted, a unique one will be generated.
     * @type {?}
     */
    OwlDialogConfig.prototype.id;
    /**
     * The ARIA role of the dialog element.
     * @type {?}
     */
    OwlDialogConfig.prototype.role;
    /**
     * Custom class for the pane
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.paneClass;
    /**
     * Mouse Event
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.event;
    /**
     * Custom class for the backdrop
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.backdropClass;
    /**
     * Whether the dialog should close when the user goes backwards/forwards in history.
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.closeOnNavigation;
    /**
     * Width of the dialog.
     * @type {?}
     */
    OwlDialogConfig.prototype.width;
    /**
     * Height of the dialog.
     * @type {?}
     */
    OwlDialogConfig.prototype.height;
    /**
     * The min-width of the overlay panel.
     * If a number is provided, pixel units are assumed.
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.minWidth;
    /**
     * The min-height of the overlay panel.
     * If a number is provided, pixel units are assumed.
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.minHeight;
    /**
     * The max-width of the overlay panel.
     * If a number is provided, pixel units are assumed.
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.maxWidth;
    /**
     * The max-height of the overlay panel.
     * If a number is provided, pixel units are assumed.
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.maxHeight;
    /**
     * Position overrides.
     * @type {?}
     */
    OwlDialogConfig.prototype.position;
    /**
     * The scroll strategy when the dialog is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     *
     * @type {?}
     */
    OwlDialogConfig.prototype.scrollStrategy;
    /** @type {?} */
    OwlDialogConfig.prototype.viewContainerRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy1jb25maWcuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSxPQUFPLEVBQUUsa0JBQWtCLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7O0lBRXRFLFFBQVEsR0FBRyxDQUFDOzs7OztBQUdoQixvQ0FZQzs7Ozs7O0lBVkcsNkJBQWE7Ozs7O0lBR2IsZ0NBQWdCOzs7OztJQUdoQiw4QkFBYzs7Ozs7SUFHZCwrQkFBZTs7QUFHbkI7SUFnR0k7Ozs7UUE1Rk8sb0JBQWUsR0FBbUIsSUFBSSxDQUFDOzs7O1FBS3ZDLGNBQVMsR0FBSSxJQUFJLENBQUM7Ozs7UUFHbEIsZ0JBQVcsR0FBSSxJQUFJLENBQUM7Ozs7UUFRcEIsU0FBSSxHQUFTLElBQUksQ0FBQzs7OztRQUdsQixpQkFBWSxHQUFJLEtBQUssQ0FBQzs7OztRQVV0QixTQUFJLEdBQThCLFFBQVEsQ0FBQzs7Ozs7UUFLM0MsY0FBUyxHQUF1QixFQUFFLENBQUM7Ozs7O1FBS25DLFVBQUssR0FBZ0IsSUFBSSxDQUFDOzs7OztRQUsxQixrQkFBYSxHQUF1QixFQUFFLENBQUM7Ozs7O1FBS3ZDLHNCQUFpQixHQUFhLElBQUksQ0FBQzs7OztRQUduQyxVQUFLLEdBQVksRUFBRSxDQUFDOzs7O1FBR3BCLFdBQU0sR0FBWSxFQUFFLENBQUM7Ozs7OztRQWtCckIsYUFBUSxHQUFxQixNQUFNLENBQUM7Ozs7OztRQWVwQyxtQkFBYyxHQUFvQixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFLOUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxnQkFBYyxRQUFRLEVBQUksQ0FBQztJQUN6QyxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBbkdELElBbUdDOzs7Ozs7O0lBL0ZHLDBDQUE4Qzs7Ozs7SUFLOUMsb0NBQXlCOzs7OztJQUd6QixzQ0FBMkI7Ozs7OztJQUszQix3Q0FBMkI7Ozs7O0lBRzNCLCtCQUF5Qjs7Ozs7SUFHekIsdUNBQTZCOzs7OztJQUs3Qiw2QkFBbUI7Ozs7O0lBS25CLCtCQUFrRDs7Ozs7O0lBS2xELG9DQUEwQzs7Ozs7O0lBSzFDLGdDQUFpQzs7Ozs7O0lBS2pDLHdDQUE4Qzs7Ozs7O0lBSzlDLDRDQUEwQzs7Ozs7SUFHMUMsZ0NBQTJCOzs7OztJQUczQixpQ0FBNEI7Ozs7Ozs7SUFNNUIsbUNBQWtDOzs7Ozs7O0lBTWxDLG9DQUFtQzs7Ozs7OztJQU1uQyxtQ0FBMkM7Ozs7Ozs7SUFNM0Msb0NBQW1DOzs7OztJQUduQyxtQ0FBaUM7Ozs7Ozs7SUFNakMseUNBQWtFOztJQUVsRSwyQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRpYWxvZy1jb25maWcuY2xhc3NcbiAqL1xuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9vcFNjcm9sbFN0cmF0ZWd5LCBTY3JvbGxTdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcblxubGV0IHVuaXF1ZUlkID0gMDtcblxuLyoqIFBvc3NpYmxlIG92ZXJyaWRlcyBmb3IgYSBkaWFsb2cncyBwb3NpdGlvbi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nUG9zaXRpb24ge1xuICAgIC8qKiBPdmVycmlkZSBmb3IgdGhlIGRpYWxvZydzIHRvcCBwb3NpdGlvbi4gKi9cbiAgICB0b3A/OiBzdHJpbmc7XG5cbiAgICAvKiogT3ZlcnJpZGUgZm9yIHRoZSBkaWFsb2cncyBib3R0b20gcG9zaXRpb24uICovXG4gICAgYm90dG9tPzogc3RyaW5nO1xuXG4gICAgLyoqIE92ZXJyaWRlIGZvciB0aGUgZGlhbG9nJ3MgbGVmdCBwb3NpdGlvbi4gKi9cbiAgICBsZWZ0Pzogc3RyaW5nO1xuXG4gICAgLyoqIE92ZXJyaWRlIGZvciB0aGUgZGlhbG9nJ3MgcmlnaHQgcG9zaXRpb24uICovXG4gICAgcmlnaHQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dDb25maWcge1xuICAgIC8qKlxuICAgICAqIElEIG9mIHRoZSBlbGVtZW50IHRoYXQgZGVzY3JpYmVzIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgcHVibGljIGFyaWFEZXNjcmliZWRCeT86IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBmb2N1cyB0aGUgZGlhbG9nIHdoZW4gdGhlIGRpYWxvZyBpcyBvcGVuZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXV0b0ZvY3VzPyA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZGlhbG9nIGhhcyBhIGJhY2tkcm9wLiAqL1xuICAgIHB1YmxpYyBoYXNCYWNrZHJvcD8gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIHN0eWxlIGZvciB0aGUgYmFja2Ryb3BcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBiYWNrZHJvcFN0eWxlPzogYW55O1xuXG4gICAgLyoqIERhdGEgYmVpbmcgaW5qZWN0ZWQgaW50byB0aGUgY2hpbGQgY29tcG9uZW50LiAqL1xuICAgIHB1YmxpYyBkYXRhPzogYW55ID0gbnVsbDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGNhbiB1c2UgZXNjYXBlIG9yIGNsaWNraW5nIG91dHNpZGUgdG8gY2xvc2UgYSBtb2RhbC4gKi9cbiAgICBwdWJsaWMgZGlzYWJsZUNsb3NlPyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSUQgZm9yIHRoZSBtb2RhbC4gSWYgb21pdHRlZCwgYSB1bmlxdWUgb25lIHdpbGwgYmUgZ2VuZXJhdGVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBpZD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBBUklBIHJvbGUgb2YgdGhlIGRpYWxvZyBlbGVtZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyByb2xlPzogJ2RpYWxvZycgfCAnYWxlcnRkaWFsb2cnID0gJ2RpYWxvZyc7XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwYW5lXG4gICAgICogKi9cbiAgICBwdWJsaWMgcGFuZUNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW10gPSAnJztcblxuICAgIC8qKlxuICAgICAqIE1vdXNlIEV2ZW50XG4gICAgICogKi9cbiAgICBwdWJsaWMgZXZlbnQ/OiBNb3VzZUV2ZW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIGJhY2tkcm9wXG4gICAgICogKi9cbiAgICBwdWJsaWMgYmFja2Ryb3BDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBkaWFsb2cgc2hvdWxkIGNsb3NlIHdoZW4gdGhlIHVzZXIgZ29lcyBiYWNrd2FyZHMvZm9yd2FyZHMgaW4gaGlzdG9yeS5cbiAgICAgKiAqL1xuICAgIHB1YmxpYyBjbG9zZU9uTmF2aWdhdGlvbj86IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdpZHRoIG9mIHRoZSBkaWFsb2cuICovXG4gICAgcHVibGljIHdpZHRoPzogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogSGVpZ2h0IG9mIHRoZSBkaWFsb2cuICovXG4gICAgcHVibGljIGhlaWdodD86IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1pbi13aWR0aCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXG4gICAgICogKi9cbiAgICBwdWJsaWMgbWluV2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWluLWhlaWdodCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXG4gICAgICogKi9cbiAgICBwdWJsaWMgbWluSGVpZ2h0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1heC13aWR0aCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXG4gICAgICogKi9cbiAgICBwdWJsaWMgbWF4V2lkdGg/OiBudW1iZXIgfCBzdHJpbmcgPSAnODV2dyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWF4LWhlaWdodCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXG4gICAgICogKi9cbiAgICBwdWJsaWMgbWF4SGVpZ2h0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gICAgLyoqIFBvc2l0aW9uIG92ZXJyaWRlcy4gKi9cbiAgICBwdWJsaWMgcG9zaXRpb24/OiBEaWFsb2dQb3NpdGlvbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzY3JvbGwgc3RyYXRlZ3kgd2hlbiB0aGUgZGlhbG9nIGlzIG9wZW5cbiAgICAgKiBMZWFybiBtb3JlIHRoaXMgZnJvbSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY2RrL292ZXJsYXkvb3ZlcnZpZXcjc2Nyb2xsLXN0cmF0ZWdpZXNcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBzY3JvbGxTdHJhdGVneT86IFNjcm9sbFN0cmF0ZWd5ID0gbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpO1xuXG4gICAgcHVibGljIHZpZXdDb250YWluZXJSZWY/OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaWQgPSBgb3dsLWRpYWxvZy0ke3VuaXF1ZUlkKyt9YDtcbiAgICB9XG59XG4iXX0=