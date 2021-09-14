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
export class OwlDialogRef {
    /**
     * @param {?} overlayRef
     * @param {?} container
     * @param {?} id
     * @param {?=} location
     */
    constructor(overlayRef, container, id, location) {
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
        (event) => event.phaseName === 'done' && event.toState === 'enter')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._afterOpen$.next();
            this._afterOpen$.complete();
        }));
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'done' && event.toState === 'exit')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.overlayRef.dispose();
            this.locationChanged.unsubscribe();
            this._afterClosed$.next(this.result);
            this._afterClosed$.complete();
            this.componentInstance = (/** @type {?} */ (null));
        }));
        this.overlayRef.keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.keyCode === ESCAPE && !this.disableClose)))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
        if (location) {
            this.locationChanged = location.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.container.config.closeOnNavigation) {
                    this.close();
                }
            }));
        }
    }
    /**
     * @param {?=} dialogResult
     * @return {?}
     */
    close(dialogResult) {
        this.result = dialogResult;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'start')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._beforeClose$.next(dialogResult);
            this._beforeClose$.complete();
            this.overlayRef.detachBackdrop();
        }));
        this.container.startExitAnimation();
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this.overlayRef.backdropClick();
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this.overlayRef.keydownEvents();
    }
    /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    updatePosition(position) {
        /** @type {?} */
        let strategy = (/** @type {?} */ (this)).getPositionStrategy();
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
    }
    /**
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    updateSize(width = 'auto', height = 'auto') {
        (/** @type {?} */ (this)).getPositionStrategy().width(width).height(height);
        (/** @type {?} */ (this)).overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    isAnimating() {
        return this.container.isAnimating;
    }
    /**
     * @return {?}
     */
    afterOpen() {
        return this._afterOpen$.asObservable();
    }
    /**
     * @return {?}
     */
    beforeClose() {
        return this._beforeClose$.asObservable();
    }
    /**
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed$.asObservable();
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    getPositionStrategy() {
        return (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy1yZWYuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHL0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQXFDLE1BQU0sTUFBTSxDQUFDO0FBQzVGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFOUMsTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7SUFxQnJCLFlBQXFCLFVBQXNCLEVBQ3RCLFNBQXNDLEVBQzlCLEVBQVUsRUFDMUIsUUFBbUI7UUFIWCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQTZCO1FBQzlCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFuQi9CLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVuQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFFakMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBR25DLG9CQUFlLEdBQWtCLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7UUFRckQsaUJBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFPckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUI7YUFDL0IsSUFBSSxDQUNELE1BQU07Ozs7UUFBQyxDQUFFLEtBQXFCLEVBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFDLEVBQzVGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVjthQUNBLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFX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LENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBR08sbUJBQW1CO1FBQ3ZCLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBMEIsQ0FBQztJQUNsRixDQUFDO0NBQ0o7Ozs7OztJQWxKRyw4QkFBb0I7Ozs7O0lBRXBCLHFDQUEyQzs7Ozs7SUFFM0MsbUNBQXlDOzs7OztJQUV6QyxxQ0FBMkM7Ozs7OztJQUczQyx1Q0FBNEQ7Ozs7OztJQUs1RCx5Q0FBNEI7Ozs7O0lBRzVCLG9DQUF5RDs7Ozs7SUFFNUMsa0NBQThCOzs7OztJQUM5QixpQ0FBOEM7O0lBQzlDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGlhbG9nLXJlZi5jbGFzc1xuICovXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2xvYmFsUG9zaXRpb25TdHJhdGVneSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uTGlrZSBhcyBJU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dSZWY8VD4ge1xuXG4gICAgcHJpdmF0ZSByZXN1bHQ6IGFueTtcblxuICAgIHByaXZhdGUgX2JlZm9yZUNsb3NlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIHByaXZhdGUgX2FmdGVyT3BlbiQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBwcml2YXRlIF9hZnRlckNsb3NlZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIHVzZXIncyBsb2NhdGlvbi4gKi9cbiAgICBwcml2YXRlIGxvY2F0aW9uQ2hhbmdlZDogSVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgb3BlbmVkIGludG8gbW9kYWxcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBjb21wb25lbnRJbnN0YW5jZTogVDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGlzIGFsbG93ZWQgdG8gY2xvc2UgdGhlIGRpYWxvZy4gKi9cbiAgICBwdWJsaWMgZGlzYWJsZUNsb3NlID0gdGhpcy5jb250YWluZXIuY29uZmlnLmRpc2FibGVDbG9zZTtcblxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgY29udGFpbmVyOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICBsb2NhdGlvbj86IExvY2F0aW9uICkge1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKCggZXZlbnQ6IEFuaW1hdGlvbkV2ZW50ICkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJyksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJPcGVuJC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJPcGVuJC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKCBldmVudDogQW5pbWF0aW9uRXZlbnQgKSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnZXhpdCcpLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkNoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckNsb3NlZCQubmV4dCh0aGlzLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQkLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IG51bGwhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKVxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiAhdGhpcy5kaXNhYmxlQ2xvc2UpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkNoYW5nZWQgPSBsb2NhdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lci5jb25maWcuY2xvc2VPbk5hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCBkaWFsb2dSZXN1bHQ/OiBhbnkgKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gZGlhbG9nUmVzdWx0O1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKCggZXZlbnQ6IEFuaW1hdGlvbkV2ZW50ICkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnc3RhcnQnKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZSQubmV4dChkaWFsb2dSZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JlZm9yZUNsb3NlJC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuc3RhcnRFeGl0QW5pbWF0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgb3ZlcmxheSdzIGJhY2tkcm9wIGhhcyBiZWVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgcHVibGljIGJhY2tkcm9wQ2xpY2soKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiBrZXlkb3duIGV2ZW50cyBhcmUgdGFyZ2V0ZWQgb24gdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIGtleWRvd25FdmVudHMoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRpYWxvZydzIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBOZXcgZGlhbG9nIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQb3NpdGlvbiggcG9zaXRpb24/OiBEaWFsb2dQb3NpdGlvbiApOiB0aGlzIHtcbiAgICAgICAgbGV0IHN0cmF0ZWd5ID0gdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KCk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uICYmIChwb3NpdGlvbi5sZWZ0IHx8IHBvc2l0aW9uLnJpZ2h0KSkge1xuICAgICAgICAgICAgcG9zaXRpb24ubGVmdCA/IHN0cmF0ZWd5LmxlZnQocG9zaXRpb24ubGVmdCkgOiBzdHJhdGVneS5yaWdodChwb3NpdGlvbi5yaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJhdGVneS5jZW50ZXJIb3Jpem9udGFsbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiAmJiAocG9zaXRpb24udG9wIHx8IHBvc2l0aW9uLmJvdHRvbSkpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnRvcCA/IHN0cmF0ZWd5LnRvcChwb3NpdGlvbi50b3ApIDogc3RyYXRlZ3kuYm90dG9tKHBvc2l0aW9uLmJvdHRvbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJhdGVneS5jZW50ZXJWZXJ0aWNhbGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cncyB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgICAqIEBwYXJhbSB3aWR0aCBOZXcgd2lkdGggb2YgdGhlIGRpYWxvZy5cbiAgICAgKiBAcGFyYW0gaGVpZ2h0IE5ldyBoZWlnaHQgb2YgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICB1cGRhdGVTaXplKCB3aWR0aDogc3RyaW5nID0gJ2F1dG8nLCBoZWlnaHQ6IHN0cmluZyA9ICdhdXRvJyApOiB0aGlzIHtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KCkud2lkdGgod2lkdGgpLmhlaWdodChoZWlnaHQpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQW5pbWF0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuaXNBbmltYXRpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyT3BlbigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJPcGVuJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYmVmb3JlQ2xvc2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JlZm9yZUNsb3NlJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWZ0ZXJDbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyQ2xvc2VkJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKiogRmV0Y2hlcyB0aGUgcG9zaXRpb24gc3RyYXRlZ3kgb2JqZWN0IGZyb20gdGhlIG92ZXJsYXkgcmVmLiAqL1xuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25TdHJhdGVneSgpOiBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgfVxufVxuIl19