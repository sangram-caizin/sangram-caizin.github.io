/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/object.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * object.utils
 */
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param {?} dest The object which will have properties copied to it.
 * @param {...?} sources The source objects from which properties will be copied.
 * @return {?}
 */
export function extendObject(dest, ...sources) {
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (const source of sources) {
        if (source != null) {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9vYmplY3QudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVlBLE1BQU0sVUFBVSxZQUFZLENBQUMsSUFBUyxFQUFFLEdBQUcsT0FBYztJQUNyRCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDZCxNQUFNLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDMUIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2hCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO2dCQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzNCO2FBQ0o7U0FDSjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogb2JqZWN0LnV0aWxzXG4gKi9cblxuXG4vKipcbiAqIEV4dGVuZHMgYW4gb2JqZWN0IHdpdGggdGhlICplbnVtZXJhYmxlKiBhbmQgKm93biogcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyxcbiAqIHNpbWlsYXIgdG8gT2JqZWN0LmFzc2lnbi5cbiAqXG4gKiBAcGFyYW0gZGVzdCBUaGUgb2JqZWN0IHdoaWNoIHdpbGwgaGF2ZSBwcm9wZXJ0aWVzIGNvcGllZCB0byBpdC5cbiAqIEBwYXJhbSBzb3VyY2VzIFRoZSBzb3VyY2Ugb2JqZWN0cyBmcm9tIHdoaWNoIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmRPYmplY3QoZGVzdDogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKGRlc3QgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG59XG4iXX0=