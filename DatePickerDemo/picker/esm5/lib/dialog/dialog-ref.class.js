/**
 * @fileoverview added by tsickle
 * Generated from: lib/dialog/dialog-ref.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * @template T
 */
var /**
 * @template T
 */
OwlDialogRef = /** @class */ (function () {
    function OwlDialogRef(overlayRef, container, id, location) {
        var _this = this;
        this.overlayRef = overlayRef;
        this.container = container;
        this.id = id;
        this._beforeClose$ = new Subject();
        this._afterOpen$ = new Subject();
        this._afterClosed$ = new Subject();
        /**
         * Subscription to changes in the user's location.
         */
        this.locationChanged = Subscription.EMPTY;
        /**
         * Whether the user is allowed to close the dialog.
         */
        this.disableClose = this.container.config.disableClose;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === 'enter'; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._afterOpen$.next();
            _this._afterOpen$.complete();
        }));
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === 'exit'; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.overlayRef.dispose();
            _this.locationChanged.unsubscribe();
            _this._afterClosed$.next(_this.result);
            _this._afterClosed$.complete();
            _this.componentInstance = (/** @type {?} */ (null));
        }));
        this.overlayRef.keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.keyCode === ESCAPE && !_this.disableClose; })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        if (location) {
            this.locationChanged = location.subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.container.config.closeOnNavigation) {
                    _this.close();
                }
            }));
        }
    }
    /**
     * @param {?=} dialogResult
     * @return {?}
     */
    OwlDialogRef.prototype.close = /**
     * @param {?=} dialogResult
     * @return {?}
     */
    function (dialogResult) {
        var _this = this;
        this.result = dialogResult;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'start'; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._beforeClose$.next(dialogResult);
            _this._beforeClose$.complete();
            _this.overlayRef.detachBackdrop();
        }));
        this.container.startExitAnimation();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    OwlDialogRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this.overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    OwlDialogRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this.overlayRef.keydownEvents();
    };
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    OwlDialogRef.prototype.updatePosition = /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    function (position) {
        /** @type {?} */
        var strategy = (/** @type {?} */ (this)).getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        (/** @type {?} */ (this)).overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    };
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    /**
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    OwlDialogRef.prototype.updateSize = /**
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    function (width, height) {
        if (width === void 0) { width = 'auto'; }
        if (height === void 0) { height = 'auto'; }
        (/** @type {?} */ (this)).getPositionStrategy().width(width).height(height);
        (/** @type {?} */ (this)).overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.isAnimating = /**
     * @return {?}
     */
    function () {
        return this.container.isAnimating;
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.afterOpen = /**
     * @return {?}
     */
    function () {
        return this._afterOpen$.asObservable();
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.beforeClose = /**
     * @return {?}
     */
    function () {
        return this._beforeClose$.asObservable();
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.afterClosed = /**
     * @return {?}
     */
    function () {
        return this._afterClosed$.asObservable();
    };
    /** Fetches the position strategy object from the overlay ref. */
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    OwlDialogRef.prototype.getPositionStrategy = /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
    };
    return OwlDialogRef;
}());
/**
 * @template T
 */
export { OwlDialogRef };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.result;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype._beforeClose$;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype._afterOpen$;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype._afterClosed$;
    /**
     * Subscription to changes in the user's location.
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.locationChanged;
    /**
     * The instance of component opened into modal
     *
     * @type {?}
     */
    OwlDialogRef.prototype.componentInstance;
    /**
     * Whether the user is allowed to close the dialog.
     * @type {?}
     */
    OwlDialogRef.prototype.disableClose;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.overlayRef;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.container;
    /** @type {?} */
    OwlDialogRef.prototype.id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy1yZWYuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHL0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQXFDLE1BQU0sTUFBTSxDQUFDO0FBQzVGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFOUM7Ozs7SUFxQkksc0JBQXFCLFVBQXNCLEVBQ3RCLFNBQXNDLEVBQzlCLEVBQVUsRUFDMUIsUUFBbUI7UUFIaEMsaUJBdUNDO1FBdkNvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQTZCO1FBQzlCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFuQi9CLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVuQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFFakMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBR25DLG9CQUFlLEdBQWtCLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7UUFRckQsaUJBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFPckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUI7YUFDL0IsSUFBSSxDQUNELE1BQU07Ozs7UUFBQyxVQUFFLEtBQXFCLElBQU0sT0FBQSxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBdkQsQ0FBdUQsRUFBQyxFQUM1RixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1Y7YUFDQSxTQUFTOzs7UUFBQztZQUNQLEtBQUksQ0FBQyxXQUFXLENBQUMs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Q0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFTSxrQ0FBVzs7O0lBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFTSxrQ0FBVzs7O0lBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxpRUFBaUU7Ozs7OztJQUN6RCwwQ0FBbUI7Ozs7O0lBQTNCO1FBQ0ksT0FBTyxtQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUEwQixDQUFDO0lBQ2xGLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFwSkQsSUFvSkM7Ozs7Ozs7Ozs7SUFsSkcsOEJBQW9COzs7OztJQUVwQixxQ0FBMkM7Ozs7O0lBRTNDLG1DQUF5Qzs7Ozs7SUFFekMscUNBQTJDOzs7Ozs7SUFHM0MsdUNBQTREOzs7Ozs7SUFLNUQseUNBQTRCOzs7OztJQUc1QixvQ0FBeUQ7Ozs7O0lBRTVDLGtDQUE4Qjs7Ozs7SUFDOUIsaUNBQThDOztJQUM5QywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRpYWxvZy1yZWYuY2xhc3NcbiAqL1xuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3ksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dQb3NpdGlvbiB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZy5jbGFzcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvbkxpa2UgYXMgSVN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nUmVmPFQ+IHtcblxuICAgIHByaXZhdGUgcmVzdWx0OiBhbnk7XG5cbiAgICBwcml2YXRlIF9iZWZvcmVDbG9zZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBwcml2YXRlIF9hZnRlck9wZW4kID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgcHJpdmF0ZSBfYWZ0ZXJDbG9zZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIGluIHRoZSB1c2VyJ3MgbG9jYXRpb24uICovXG4gICAgcHJpdmF0ZSBsb2NhdGlvbkNoYW5nZWQ6IElTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IG9wZW5lZCBpbnRvIG1vZGFsXG4gICAgICogKi9cbiAgICBwdWJsaWMgY29tcG9uZW50SW5zdGFuY2U6IFQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdXNlciBpcyBhbGxvd2VkIHRvIGNsb3NlIHRoZSBkaWFsb2cuICovXG4gICAgcHVibGljIGRpc2FibGVDbG9zZSA9IHRoaXMuY29udGFpbmVyLmNvbmZpZy5kaXNhYmxlQ2xvc2U7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgICAgICAgICAgICAgICBwcml2YXRlIGNvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgbG9jYXRpb24/OiBMb2NhdGlvbiApIHtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hbmltYXRpb25TdGF0ZUNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigoIGV2ZW50OiBBbmltYXRpb25FdmVudCApID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicpLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FmdGVyT3BlbiQubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FmdGVyT3BlbiQuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKCggZXZlbnQ6IEFuaW1hdGlvbkV2ZW50ICkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2V4aXQnKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb25DaGFuZ2VkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQkLm5leHQodGhpcy5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FmdGVyQ2xvc2VkJC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBudWxsITtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKClcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgIXRoaXMuZGlzYWJsZUNsb3NlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25DaGFuZ2VkID0gbG9jYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIuY29uZmlnLmNsb3NlT25OYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSggZGlhbG9nUmVzdWx0PzogYW55ICkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IGRpYWxvZ1Jlc3VsdDtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hbmltYXRpb25TdGF0ZUNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigoIGV2ZW50OiBBbmltYXRpb25FdmVudCApID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ3N0YXJ0JyksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UkLm5leHQoZGlhbG9nUmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZSQuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoQmFja2Ryb3AoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0YXJ0RXhpdEFuaW1hdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIG92ZXJsYXkncyBiYWNrZHJvcCBoYXMgYmVlbiBjbGlja2VkLlxuICAgICAqL1xuICAgIHB1YmxpYyBiYWNrZHJvcENsaWNrKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4ga2V5ZG93biBldmVudHMgYXJlIHRhcmdldGVkIG9uIHRoZSBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBrZXlkb3duRXZlbnRzKCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cncyBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gTmV3IGRpYWxvZyBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlUG9zaXRpb24oIHBvc2l0aW9uPzogRGlhbG9nUG9zaXRpb24gKTogdGhpcyB7XG4gICAgICAgIGxldCBzdHJhdGVneSA9IHRoaXMuZ2V0UG9zaXRpb25TdHJhdGVneSgpO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiAmJiAocG9zaXRpb24ubGVmdCB8fCBwb3NpdGlvbi5yaWdodCkpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPyBzdHJhdGVneS5sZWZ0KHBvc2l0aW9uLmxlZnQpIDogc3RyYXRlZ3kucmlnaHQocG9zaXRpb24ucmlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyYXRlZ3kuY2VudGVySG9yaXpvbnRhbGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gJiYgKHBvc2l0aW9uLnRvcCB8fCBwb3NpdGlvbi5ib3R0b20pKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3AgPyBzdHJhdGVneS50b3AocG9zaXRpb24udG9wKSA6IHN0cmF0ZWd5LmJvdHRvbShwb3NpdGlvbi5ib3R0b20pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyYXRlZ3kuY2VudGVyVmVydGljYWxseSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZGlhbG9nJ3Mgd2lkdGggYW5kIGhlaWdodC5cbiAgICAgKiBAcGFyYW0gd2lkdGggTmV3IHdpZHRoIG9mIHRoZSBkaWFsb2cuXG4gICAgICogQHBhcmFtIGhlaWdodCBOZXcgaGVpZ2h0IG9mIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgdXBkYXRlU2l6ZSggd2lkdGg6IHN0cmluZyA9ICdhdXRvJywgaGVpZ2h0OiBzdHJpbmcgPSAnYXV0bycgKTogdGhpcyB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb25TdHJhdGVneSgpLndpZHRoKHdpZHRoKS5oZWlnaHQoaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FuaW1hdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmlzQW5pbWF0aW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlck9wZW4oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyT3BlbiQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGJlZm9yZUNsb3NlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWZvcmVDbG9zZSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlckNsb3NlZCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqIEZldGNoZXMgdGhlIHBvc2l0aW9uIHN0cmF0ZWd5IG9iamVjdCBmcm9tIHRoZSBvdmVybGF5IHJlZi4gKi9cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uU3RyYXRlZ3koKTogR2xvYmFsUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5O1xuICAgIH1cbn1cbiJdfQ==