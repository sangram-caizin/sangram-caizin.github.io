/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTime } from './date-time.class';
import { OwlDialogService } from '../dialog/dialog.service';
import { merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Injection token that determines the scroll handling while the dtPicker is open.
 * @type {?}
 */
export const OWL_DTPICKER_SCROLL_STRATEGY = new InjectionToken('owl-dtpicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
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
export const OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DTPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * @template T
 */
export class OwlDateTimeComponent extends OwlDateTime {
    /**
     * @param {?} overlay
     * @param {?} viewContainerRef
     * @param {?} dialogService
     * @param {?} ngZone
     * @param {?} changeDetector
     * @param {?} dateTimeAdapter
     * @param {?} defaultScrollStrategy
     * @param {?} dateTimeFormats
     * @param {?} document
     */
    constructor(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
        super(dateTimeAdapter, dateTimeFormats);
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dialogService = dialogService;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        this.document = document;
        /**
         * Custom class for the picker backdrop.
         */
        this.backdropClass = [];
        /**
         * Custom class for the picker overlay pane.
         */
        this.panelClass = [];
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        this._pickerType = 'both';
        /**
         * Whether the picker open as a dialog
         */
        this._pickerMode = 'popup';
        /**
         * Whether the calendar is open.
         */
        this._opened = false;
        /**
         * Callback when the picker is closed
         *
         */
        this.afterPickerClosed = new EventEmitter();
        /**
         * Callback when the picker is open
         *
         */
        this.afterPickerOpen = new EventEmitter();
        /**
         * Emits selected year in multi-year view
         * This doesn't imply a change on the selected date.
         *
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view
         * This doesn't imply a change on the selected date.
         *
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emit when the selected value has been confirmed
         *
         */
        this.confirmSelectedChange = new EventEmitter();
        /**
         * Emits when the date time picker is disabled.
         *
         */
        this.disabledChange = new EventEmitter();
        this.dtInputSub = Subscription.EMPTY;
        this.hidePickerStreamSub = Subscription.EMPTY;
        this.confirmSelectedStreamSub = Subscription.EMPTY;
        this.pickerOpenedStreamSub = Subscription.EMPTY;
        /**
         * The element that was focused before the date time picker was opened.
         */
        this.focusedElementBeforeOpen = null;
        this._selecteds = [];
        this.defaultScrollStrategy = defaultScrollStrategy;
    }
    /**
     * @return {?}
     */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        if (this._startAt) {
            return this._startAt;
        }
        if (this._dtInput) {
            if (this._dtInput.selectMode === 'single') {
                return this._dtInput.value || null;
            }
            else if (this._dtInput.selectMode === 'range' ||
                this._dtInput.selectMode === 'rangeFrom') {
                return this._dtInput.values[0] || null;
            }
            else if (this._dtInput.selectMode === 'rangeTo') {
                return this._dtInput.values[1] || null;
            }
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set startAt(date) {
        this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
    }
    /**
     * @return {?}
     */
    get pickerType() {
        return this._pickerType;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set pickerType(val) {
        if (val !== this._pickerType) {
            this._pickerType = val;
            if (this._dtInput) {
                this._dtInput.formatNativeInputValue();
            }
        }
    }
    /**
     * @return {?}
     */
    get pickerMode() {
        return this._pickerMode;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set pickerMode(mode) {
        if (mode === 'popup') {
            this._pickerMode = mode;
        }
        else {
            this._pickerMode = 'dialog';
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined && this._dtInput
            ? this._dtInput.disabled
            : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        value = coerceBooleanProperty(value);
        if (value !== this._disabled) {
            this._disabled = value;
            this.disabledChange.next(value);
        }
    }
    /**
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set opened(val) {
        val ? this.open() : this.close();
    }
    /**
     * @return {?}
     */
    get dtInput() {
        return this._dtInput;
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = value;
        this.changeDetector.markForCheck();
    }
    /**
     * @return {?}
     */
    get selecteds() {
        return this._selecteds;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set selecteds(values) {
        this._selecteds = values;
        this.changeDetector.markForCheck();
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDateTime() {
        return this._dtInput && this._dtInput.min;
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDateTime() {
        return this._dtInput && this._dtInput.max;
    }
    /**
     * @return {?}
     */
    get dateTimeFilter() {
        return this._dtInput && this._dtInput.dateTimeFilter;
    }
    /**
     * @return {?}
     */
    get selectMode() {
        return this._dtInput.selectMode;
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this._dtInput.isInSingleMode;
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return this._dtInput.isInRangeMode;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this.dtInputSub.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
        }
    }
    /**
     * @param {?} input
     * @return {?}
     */
    registerInput(input) {
        if (this._dtInput) {
            throw Error('A Owl DateTimePicker can only be associated with a single input.');
        }
        this._dtInput = input;
        this.dtInputSub = this._dtInput.valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (Array.isArray(value)) {
                this.selecteds = value;
            }
            else {
                this.selected = value;
            }
        }));
    }
    /**
     * @return {?}
     */
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._dtInput) {
            throw Error('Attempted to open an DateTimePicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        // reset the picker selected value
        if (this.isInSingleMode) {
            this.selected = this._dtInput.value;
        }
        else if (this.isInRangeMode) {
            this.selecteds = this._dtInput.values;
        }
        // when the picker is open , we make sure the picker's current selected time value
        // is the same as the _startAt time value.
        if (this.selected && this.pickerType !== 'calendar' && this._startAt) {
            this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt));
        }
        this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
        this.pickerContainer.picker = this;
        // Listen to picker container's hidePickerStream
        this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe((/**
         * @return {?}
         */
        () => {
            this.close();
        }));
        // Listen to picker container's confirmSelectedStream
        this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.confirmSelect(event);
        }));
    }
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    select(date) {
        if (Array.isArray(date)) {
            this.selecteds = [...date];
        }
        else {
            this.selected = date;
        }
        /**
         * Cases in which automatically confirm the select when date or dates are selected:
         * 1) picker mode is NOT 'dialog'
         * 2) picker type is 'calendar' and selectMode is 'single'.
         * 3) picker type is 'calendar' and selectMode is 'range' and
         *    the 'selecteds' has 'from'(selecteds[0]) and 'to'(selecteds[1]) values.
         * 4) selectMode is 'rangeFrom' and selecteds[0] has value.
         * 5) selectMode is 'rangeTo' and selecteds[1] has value.
         * */
        if (this.pickerMode !== 'dialog' &&
            this.pickerType === 'calendar' &&
            ((this.selectMode === 'single' && this.selected) ||
                (this.selectMode === 'rangeFrom' && this.selecteds[0]) ||
                (this.selectMode === 'rangeTo' && this.selecteds[1]) ||
                (this.selectMode === 'range' &&
                    this.selecteds[0] &&
                    this.selecteds[1]))) {
            this.confirmSelect();
        }
    }
    /**
     * Emits the selected year in multi-year view
     *
     * @param {?} normalizedYear
     * @return {?}
     */
    selectYear(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Emits selected month in year view
     *
     * @param {?} normalizedMonth
     * @return {?}
     */
    selectMonth(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Hide the picker
     * @return {?}
     */
    close() {
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.pickerContainerPortal &&
            this.pickerContainerPortal.isAttached) {
            this.pickerContainerPortal.detach();
        }
        if (this.hidePickerStreamSub) {
            this.hidePickerStreamSub.unsubscribe();
            this.hidePickerStreamSub = null;
        }
        if (this.confirmSelectedStreamSub) {
            this.confirmSelectedStreamSub.unsubscribe();
            this.confirmSelectedStreamSub = null;
        }
        if (this.pickerOpenedStreamSub) {
            this.pickerOpenedStreamSub.unsubscribe();
            this.pickerOpenedStreamSub = null;
        }
        if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
        }
        /** @type {?} */
        const completeClose = (/**
         * @return {?}
         */
        () => {
            if (this._opened) {
                this._opened = false;
                this.afterPickerClosed.emit(null);
                this.focusedElementBeforeOpen = null;
            }
        });
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    confirmSelect(event) {
        if (this.isInSingleMode) {
            /** @type {?} */
            const selected = this.selected || this.startAt || this.dateTimeAdapter.now();
            this.confirmSelectedChange.emit(selected);
        }
        else if (this.isInRangeMode) {
            this.confirmSelectedChange.emit(this.selecteds);
        }
        this.close();
        return;
    }
    /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    openAsDialog() {
        this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
            autoFocus: false,
            backdropClass: [
                'cdk-overlay-dark-backdrop',
                ...coerceArray(this.backdropClass)
            ],
            paneClass: ['owl-dt-dialog', ...coerceArray(this.panelClass)],
            viewContainerRef: this.viewContainerRef,
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe((/**
         * @return {?}
         */
        () => {
            this.afterPickerOpen.emit(null);
            this._opened = true;
        }));
        this.dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    openAsPopup() {
        if (!this.pickerContainerPortal) {
            this.pickerContainerPortal = new ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            /** @type {?} */
            const componentRef = this.popupRef.attach(this.pickerContainerPortal);
            this.pickerContainer = componentRef.instance;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.popupRef.updatePosition();
            }));
            // emit open stream
            this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.afterPickerOpen.emit(null);
                this._opened = true;
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    createPopup() {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: [
                'cdk-overlay-transparent-backdrop',
                ...coerceArray(this.backdropClass)
            ],
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: ['owl-dt-popup', ...coerceArray(this.panelClass)]
        });
        this.popupRef = this.overlay.create(overlayConfig);
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
            .keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.keyCode === ESCAPE ||
            (this._dtInput &&
                event.altKey &&
                event.keyCode === UP_ARROW))))).subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * Create the popup PositionStrategy.
     *
     * @private
     * @return {?}
     */
    createPopupPositionStrategy() {
        return this.overlay
            .position()
            .flexibleConnectedTo(this._dtInput.elementRef)
            .withTransformOriginOn('.owl-dt-container')
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -176
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -352
            }
        ]);
    }
}
OwlDateTimeComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time',
                exportAs: 'owlDateTime',
                template: "",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                styles: [""]
            }] }
];
/** @nocollapse */
OwlDateTimeComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: OwlDialogService },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [OWL_DTPICKER_SCROLL_STRATEGY,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
OwlDateTimeComponent.propDecorators = {
    backdropClass: [{ type: Input }],
    panelClass: [{ type: Input }],
    startAt: [{ type: Input }],
    pickerType: [{ type: Input }],
    pickerMode: [{ type: Input }],
    disabled: [{ type: Input }],
    opened: [{ type: Input }],
    scrollStrategy: [{ type: Input }],
    afterPickerClosed: [{ type: Output }],
    afterPickerOpen: [{ type: Output }],
    yearSelected: [{ type: Output }],
    monthSelected: [{ type: Output }]
};
if (false) {
    /**
     * Custom class for the picker backdrop.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.backdropClass;
    /**
     * Custom class for the picker overlay pane.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.panelClass;
    /**
     * The date to open the calendar to initially.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._startAt;
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._pickerType;
    /**
     * Whether the picker open as a dialog
     * @type {?}
     */
    OwlDateTimeComponent.prototype._pickerMode;
    /**
     * Whether the date time picker should be disabled.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._disabled;
    /**
     * Whether the calendar is open.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._opened;
    /**
     * The scroll strategy when the picker is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.scrollStrategy;
    /**
     * Callback when the picker is closed
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerClosed;
    /**
     * Callback when the picker is open
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerOpen;
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.yearSelected;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.monthSelected;
    /**
     * Emit when the selected value has been confirmed
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.confirmSelectedChange;
    /**
     * Emits when the date time picker is disabled.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainerPortal;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainer;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.popupRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dtInputSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.hidePickerStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.confirmSelectedStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerOpenedStreamSub;
    /**
     * The element that was focused before the date time picker was opened.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.focusedElementBeforeOpen;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._dtInput;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.defaultScrollStrategy;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogService;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeFormats;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUVILE9BQU8sRUFDUCxhQUFhLEVBSWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFdkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQ0gsV0FBVyxFQUlkLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FB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Ozs7O0lBb0M3QixxREFBb0Q7Ozs7O0lBR2hELHVDQUF3Qjs7Ozs7SUFDeEIsZ0RBQTBDOzs7OztJQUMxQyw2Q0FBdUM7Ozs7O0lBQ3ZDLHNDQUFzQjs7Ozs7SUFDdEIsOENBQTJDOzs7OztJQUMzQywrQ0FBeUQ7Ozs7O0lBRXpELCtDQUU2Qzs7Ozs7SUFDN0Msd0NBRXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIEJsb2NrU2Nyb2xsU3RyYXRlZ3ksXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29uZmlnLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgUG9zaXRpb25TdHJhdGVneSxcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBFU0NBUEUsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IGNvZXJjZUFycmF5LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7XG4gICAgT3dsRGF0ZVRpbWUsXG4gICAgUGlja2VyTW9kZSxcbiAgICBQaWNrZXJUeXBlLFxuICAgIFNlbGVjdE1vZGVcbn0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGlhbG9nUmVmIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGR0UGlja2VyIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcbiAgICAoKSA9PiBTY3JvbGxTdHJhdGVneVxuPignb3dsLWR0cGlja2VyLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWShcbiAgICBvdmVybGF5OiBPdmVybGF5XG4pOiAoKSA9PiBCbG9ja1Njcm9sbFN0cmF0ZWd5IHtcbiAgICBjb25zdCBmbiA9ICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xuICAgIHJldHVybiBmbjtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lJyxcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lQ29tcG9uZW50PFQ+IGV4dGVuZHMgT3dsRGF0ZVRpbWU8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKiogQ3VzdG9tIGNsYXNzIGZvciB0aGUgcGlja2VyIGJhY2tkcm9wLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGJhY2tkcm9wQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG5cbiAgICAvKiogQ3VzdG9tIGNsYXNzIGZvciB0aGUgcGlja2VyIG92ZXJsYXkgcGFuZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLyoqIFRoZSBkYXRlIHRvIG9wZW4gdGhlIGNhbGVuZGFyIHRvIGluaXRpYWxseS4gKi9cbiAgICBwcml2YXRlIF9zdGFydEF0OiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGFydEF0KCk6IFQgfCBudWxsIHtcbiAgICAgICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XG4gICAgICAgIC8vIHNlbGVjdGVkIHZhbHVlIGlzLlxuICAgICAgICBpZiAodGhpcy5fc3RhcnRBdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC52YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgICAgICB0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC52YWx1ZXNbMF0gfHwgbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC52YWx1ZXNbMV0gfHwgbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IHN0YXJ0QXQoZGF0ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc3RhcnRBdCA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoZGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHR5cGUgb2YgdGhlIGRhdGVUaW1lIHBpY2tlclxuICAgICAqICAgICAgJ2JvdGgnIC0tIHNob3cgYm90aCBjYWxlbmRhciBhbmQgdGltZXJcbiAgICAgKiAgICAgICdjYWxlbmRhcicgLS0gc2hvdyBvbmx5IGNhbGVuZGFyXG4gICAgICogICAgICAndGltZXInIC0tIHNob3cgb25seSB0aW1lclxuICAgICAqL1xuICAgIHByaXZhdGUgX3BpY2tlclR5cGU6IFBpY2tlclR5cGUgPSAnYm90aCc7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlclR5cGU7XG4gICAgfVxuXG4gICAgc2V0IHBpY2tlclR5cGUodmFsOiBQaWNrZXJUeXBlKSB7XG4gICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3BpY2tlclR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlclR5cGUgPSB2YWw7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2R0SW5wdXQuZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgcGlja2VyIG9wZW4gYXMgYSBkaWFsb2dcbiAgICAgKi9cbiAgICBfcGlja2VyTW9kZTogUGlja2VyTW9kZSA9ICdwb3B1cCc7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vZGU7XG4gICAgfVxuXG4gICAgc2V0IHBpY2tlck1vZGUobW9kZTogUGlja2VyTW9kZSkge1xuICAgICAgICBpZiAobW9kZSA9PT0gJ3BvcHVwJykge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9kZSA9IG1vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9waWNrZXJNb2RlID0gJ2RpYWxvZyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZSB0aW1lIHBpY2tlciBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuX2R0SW5wdXRcbiAgICAgICAgICAgID8gdGhpcy5fZHRJbnB1dC5kaXNhYmxlZFxuICAgICAgICAgICAgOiAhIXRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG4gICAgcHJpdmF0ZSBfb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xuICAgIH1cblxuICAgIHNldCBvcGVuZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHZhbCA/IHRoaXMub3BlbigpIDogdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzY3JvbGwgc3RyYXRlZ3kgd2hlbiB0aGUgcGlja2VyIGlzIG9wZW5cbiAgICAgKiBMZWFybiBtb3JlIHRoaXMgZnJvbSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY2RrL292ZXJsYXkvb3ZlcnZpZXcjc2Nyb2xsLXN0cmF0ZWdpZXNcbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNjcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHdoZW4gdGhlIHBpY2tlciBpcyBjbG9zZWRcbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGFmdGVyUGlja2VyQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlblxuICAgICAqICovXG4gICAgQE91dHB1dCgpXG4gICAgYWZ0ZXJQaWNrZXJPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBzZWxlY3RlZCB5ZWFyIGluIG11bHRpLXllYXIgdmlld1xuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG1vbnRoU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0IHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIGhhcyBiZWVuIGNvbmZpcm1lZFxuICAgICAqICovXG4gICAgcHVibGljIGNvbmZpcm1TZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdIHwgVD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHdoZW4gdGhlIGRhdGUgdGltZSBwaWNrZXIgaXMgZGlzYWJsZWQuXG4gICAgICogKi9cbiAgICBwdWJsaWMgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIHBpY2tlckNvbnRhaW5lclBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFxuICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPlxuICAgID47XG4gICAgcHJpdmF0ZSBwaWNrZXJDb250YWluZXI6IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+O1xuICAgIHByaXZhdGUgcG9wdXBSZWY6IE92ZXJsYXlSZWY7XG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE93bERpYWxvZ1JlZjxPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPj47XG4gICAgcHJpdmF0ZSBkdElucHV0U3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgaGlkZVBpY2tlclN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIGNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIHBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIC8qKiBUaGUgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgZGF0ZSB0aW1lIHBpY2tlciB3YXMgb3BlbmVkLiAqL1xuICAgIHByaXZhdGUgZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfZHRJbnB1dDogT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPjtcbiAgICBnZXQgZHRJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICAgIGdldCBzZWxlY3RlZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXM7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0Lm1pbjtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQubWF4O1xuICAgIH1cblxuICAgIGdldCBkYXRlVGltZUZpbHRlcigpOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0LmRhdGVUaW1lRmlsdGVyO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlO1xuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuaXNJblNpbmdsZU1vZGU7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LmlzSW5SYW5nZU1vZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IE93bERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQEluamVjdChPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZKSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k6IGFueSxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0cyxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChET0NVTUVOVClcbiAgICAgICAgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGRhdGVUaW1lQWRhcHRlciwgZGF0ZVRpbWVGb3JtYXRzKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0U2Nyb2xsU3RyYXRlZ3kgPSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmR0SW5wdXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnBvcHVwUmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlcklucHV0KGlucHV0OiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICAnQSBPd2wgRGF0ZVRpbWVQaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kdElucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuZHRJbnB1dFN1YiA9IHRoaXMuX2R0SW5wdXQudmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHZhbHVlOiBUW10gfCBUIHwgbnVsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkcyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vcGVuZWQgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICAnQXR0ZW1wdGVkIHRvIG9wZW4gYW4gRGF0ZVRpbWVQaWNrZXIgd2l0aCBubyBhc3NvY2lhdGVkIGlucHV0LidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCB0aGUgcGlja2VyIHNlbGVjdGVkIHZhbHVlXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5fZHRJbnB1dC52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gdGhpcy5fZHRJbnB1dC52YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlbiAsIHdlIG1ha2Ugc3VyZSB0aGUgcGlja2VyJ3MgY3VycmVudCBzZWxlY3RlZCB0aW1lIHZhbHVlXG4gICAgICAgIC8vIGlzIHRoZSBzYW1lIGFzIHRoZSBfc3RhcnRBdCB0aW1lIHZhbHVlLlxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiB0aGlzLnBpY2tlclR5cGUgIT09ICdjYWxlbmRhcicgJiYgdGhpcy5fc3RhcnRBdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMuX3N0YXJ0QXQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5fc3RhcnRBdCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLl9zdGFydEF0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgPyB0aGlzLm9wZW5Bc0RpYWxvZygpIDogdGhpcy5vcGVuQXNQb3B1cCgpO1xuXG4gICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlciA9IHRoaXM7XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBoaWRlUGlja2VyU3RyZWFtXG4gICAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmhpZGVQaWNrZXJTdHJlYW0uc3Vic2NyaWJlKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBMaXN0ZW4gdG8gcGlja2VyIGNvbnRhaW5lcidzIGNvbmZpcm1TZWxlY3RlZFN0cmVhbVxuICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmNvbmZpcm1TZWxlY3RlZFN0cmVhbS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0cyB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3QoZGF0ZTogVFtdIHwgVCk6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSBbLi4uZGF0ZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYXNlcyBpbiB3aGljaCBhdXRvbWF0aWNhbGx5IGNvbmZpcm0gdGhlIHNlbGVjdCB3aGVuIGRhdGUgb3IgZGF0ZXMgYXJlIHNlbGVjdGVkOlxuICAgICAgICAgKiAxKSBwaWNrZXIgbW9kZSBpcyBOT1QgJ2RpYWxvZydcbiAgICAgICAgICogMikgcGlja2VyIHR5cGUgaXMgJ2NhbGVuZGFyJyBhbmQgc2VsZWN0TW9kZSBpcyAnc2luZ2xlJy5cbiAgICAgICAgICogMykgcGlja2VyIHR5cGUgaXMgJ2NhbGVuZGFyJyBhbmQgc2VsZWN0TW9kZSBpcyAncmFuZ2UnIGFuZFxuICAgICAgICAgKiAgICB0aGUgJ3NlbGVjdGVkcycgaGFzICdmcm9tJyhzZWxlY3RlZHNbMF0pIGFuZCAndG8nKHNlbGVjdGVkc1sxXSkgdmFsdWVzLlxuICAgICAgICAgKiA0KSBzZWxlY3RNb2RlIGlzICdyYW5nZUZyb20nIGFuZCBzZWxlY3RlZHNbMF0gaGFzIHZhbHVlLlxuICAgICAgICAgKiA1KSBzZWxlY3RNb2RlIGlzICdyYW5nZVRvJyBhbmQgc2VsZWN0ZWRzWzFdIGhhcyB2YWx1ZS5cbiAgICAgICAgICogKi9cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5waWNrZXJNb2RlICE9PSAnZGlhbG9nJyAmJlxuICAgICAgICAgICAgdGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInICYmXG4gICAgICAgICAgICAoKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScgJiYgdGhpcy5zZWxlY3RlZCkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyAmJiB0aGlzLnNlbGVjdGVkc1swXSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycgJiYgdGhpcy5zZWxlY3RlZHNbMV0pIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkc1swXSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkc1sxXSkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBzZWxlY3RZZWFyKG5vcm1hbGl6ZWRZZWFyOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQobm9ybWFsaXplZFllYXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xuICAgICAqICovXG4gICAgcHVibGljIHNlbGVjdE1vbnRoKG5vcm1hbGl6ZWRNb250aDogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vbnRoU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkTW9udGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIHBpY2tlclxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vcGVuZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvcHVwUmVmICYmIHRoaXMucG9wdXBSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsICYmXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbC5pc0F0dGFjaGVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1YiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaWFsb2dSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZUNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wZW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJDbG9zZWQuZW1pdChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIEJlY2F1c2UgSUUgbW92ZXMgZm9jdXMgYXN5bmNocm9ub3VzbHksIHdlIGNhbid0IGNvdW50IG9uIGl0IGJlaW5nIHJlc3RvcmVkIGJlZm9yZSB3ZSd2ZVxuICAgICAgICAgICAgLy8gbWFya2VkIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZC4gSWYgdGhlIGV2ZW50IGZpcmVzIG91dCBvZiBzZXF1ZW5jZSBhbmQgdGhlIGVsZW1lbnQgdGhhdFxuICAgICAgICAgICAgLy8gd2UncmUgcmVmb2N1c2luZyBvcGVucyB0aGUgZGF0ZXBpY2tlciBvbiBmb2N1cywgdGhlIHVzZXIgY291bGQgYmUgc3R1Y2sgd2l0aCBub3QgYmVpbmdcbiAgICAgICAgICAgIC8vIGFibGUgdG8gY2xvc2UgdGhlIGNhbGVuZGFyIGF0IGFsbC4gV2Ugd29yayBhcm91bmQgaXQgYnkgbWFraW5nIHRoZSBsb2dpYywgdGhhdCBtYXJrc1xuICAgICAgICAgICAgLy8gdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLCBhc3luYyBhcyB3ZWxsLlxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoY29tcGxldGVDbG9zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZUNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maXJtIHRoZSBzZWxlY3RlZCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBjb25maXJtU2VsZWN0KGV2ZW50PzogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCB8fCB0aGlzLnN0YXJ0QXQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiB0aGUgcGlja2VyIGFzIGEgZGlhbG9nXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcGVuQXNEaWFsb2coKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2Nkay1vdmVybGF5LWRhcmstYmFja2Ryb3AnLFxuICAgICAgICAgICAgICAgICAgICAuLi5jb2VyY2VBcnJheSh0aGlzLmJhY2tkcm9wQ2xhc3MpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBwYW5lQ2xhc3M6IFsnb3dsLWR0LWRpYWxvZycsIC4uLmNvZXJjZUFycmF5KHRoaXMucGFuZWxDbGFzcyldLFxuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBzY3JvbGxTdHJhdGVneTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSB8fCB0aGlzLmRlZmF1bHRTY3JvbGxTdHJhdGVneSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyID0gdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2U7XG5cbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJPcGVuLmVtaXQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIHRoZSBwaWNrZXIgYXMgcG9wdXBcbiAgICAgKi9cbiAgICBwcml2YXRlIG9wZW5Bc1BvcHVwKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8XG4gICAgICAgICAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cbiAgICAgICAgICAgID4oT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucG9wdXBSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxcbiAgICAgICAgICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPlxuICAgICAgICAgICAgPiA9IHRoaXMucG9wdXBSZWYuYXR0YWNoKHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsKTtcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC5cbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBlbWl0IG9wZW4gc3RyZWFtXG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlck9wZW5lZFN0cmVhbVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJPcGVuLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVBvcHVwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogW1xuICAgICAgICAgICAgICAgICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICAgICAgLi4uY29lcmNlQXJyYXkodGhpcy5iYWNrZHJvcENsYXNzKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBbJ293bC1kdC1wb3B1cCcsIC4uLmNvZXJjZUFycmF5KHRoaXMucGFuZWxDbGFzcyldXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucG9wdXBSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaG1lbnRzKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmXG4gICAgICAgICAgICAgICAgLmtleWRvd25FdmVudHMoKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9kdElucHV0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIHBvcHVwIFBvc2l0aW9uU3RyYXRlZ3kuXG4gICAgICogKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVxuICAgICAgICAgICAgLnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuX2R0SW5wdXQuZWxlbWVudFJlZilcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5vd2wtZHQtY29udGFpbmVyJylcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhQdXNoKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZOiAtMTc2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZOiAtMzUyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSk7XG4gICAgfVxufVxuIl19