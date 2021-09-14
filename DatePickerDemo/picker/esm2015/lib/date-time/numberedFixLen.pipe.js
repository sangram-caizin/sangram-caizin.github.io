/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/numberedFixLen.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * numberFixedLen.pipe
 */
import { Pipe } from '@angular/core';
export class NumberFixedLenPipe {
    /**
     * @param {?} num
     * @param {?} len
     * @return {?}
     */
    transform(num, len) {
        /** @type {?} */
        const number = Math.floor(num);
        /** @type {?} */
        const length = Math.floor(len);
        if (num === null || isNaN(number) || isNaN(length)) {
            return num;
        }
        /** @type {?} */
        let numString = number.toString();
        while (numString.length < length) {
            numString = '0' + numString;
        }
        return numString;
    }
}
NumberFixedLenPipe.decorators = [
    { type: Pipe, args: [{
                name: 'numberFixedLen'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL251bWJlcmVkRml4TGVuLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7SUFDM0IsU0FBUyxDQUFFLEdBQVcsRUFBRSxHQUFXOztjQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2NBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU5QixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRCxPQUFPLEdBQUcsQ0FBQztTQUNkOztZQUVHLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBRWpDLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDOUIsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOzs7WUFuQkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxnQkFBZ0I7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG51bWJlckZpeGVkTGVuLnBpcGVcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnbnVtYmVyRml4ZWRMZW4nXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlckZpeGVkTGVuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSggbnVtOiBudW1iZXIsIGxlbjogbnVtYmVyICk6IGFueSB7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IobnVtKTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5mbG9vcihsZW4pO1xuXG4gICAgICAgIGlmIChudW0gPT09IG51bGwgfHwgaXNOYU4obnVtYmVyKSB8fCBpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG51bVN0cmluZyA9IG51bWJlci50b1N0cmluZygpO1xuXG4gICAgICAgIHdoaWxlIChudW1TdHJpbmcubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBudW1TdHJpbmcgPSAnMCcgKyBudW1TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtU3RyaW5nO1xuICAgIH1cbn1cbiJdfQ==