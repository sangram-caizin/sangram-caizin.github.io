/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/numberedFixLen.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * numberFixedLen.pipe
 */
import { Pipe } from '@angular/core';
var NumberFixedLenPipe = /** @class */ (function () {
    function NumberFixedLenPipe() {
    }
    /**
     * @param {?} num
     * @param {?} len
     * @return {?}
     */
    NumberFixedLenPipe.prototype.transform = /**
     * @param {?} num
     * @param {?} len
     * @return {?}
     */
    function (num, len) {
        /** @type {?} */
        var number = Math.floor(num);
        /** @type {?} */
        var length = Math.floor(len);
        if (num === null || isNaN(number) || isNaN(length)) {
            return num;
        }
        /** @type {?} */
        var numString = number.toString();
        while (numString.length < length) {
            numString = '0' + numString;
        }
        return numString;
    };
    NumberFixedLenPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'numberFixedLen'
                },] }
    ];
    return NumberFixedLenPipe;
}());
export { NumberFixedLenPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL251bWJlcmVkRml4TGVuLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBb0JBLENBQUM7Ozs7OztJQWhCRyxzQ0FBUzs7Ozs7SUFBVCxVQUFXLEdBQVcsRUFBRSxHQUFXOztZQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU5QixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRCxPQUFPLEdBQUcsQ0FBQztTQUNkOztZQUVHLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBRWpDLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDOUIsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOztnQkFuQkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxnQkFBZ0I7aUJBQ3pCOztJQWtCRCx5QkFBQztDQUFBLEFBcEJELElBb0JDO1NBakJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbnVtYmVyRml4ZWRMZW4ucGlwZVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdudW1iZXJGaXhlZExlbidcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyRml4ZWRMZW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKCBudW06IG51bWJlciwgbGVuOiBudW1iZXIgKTogYW55IHtcbiAgICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihudW0pO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLmZsb29yKGxlbik7XG5cbiAgICAgICAgaWYgKG51bSA9PT0gbnVsbCB8fCBpc05hTihudW1iZXIpIHx8IGlzTmFOKGxlbmd0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudW07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbnVtU3RyaW5nID0gbnVtYmVyLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgd2hpbGUgKG51bVN0cmluZy5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIG51bVN0cmluZyA9ICcwJyArIG51bVN0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudW1TdHJpbmc7XG4gICAgfVxufVxuIl19