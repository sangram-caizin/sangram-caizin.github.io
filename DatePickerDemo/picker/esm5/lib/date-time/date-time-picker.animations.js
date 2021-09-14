/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time-picker.animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker.animations
 */
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export var owlDateTimePickerAnimations = {
    transformPicker: trigger('transformPicker', [
        state('void', style({ opacity: 0, transform: 'scale(1, 0)' })),
        state('enter', style({ opacity: 1, transform: 'scale(1, 1)' })),
        transition('void => enter', group([
            query('@fadeInPicker', animateChild(), { optional: true }),
            animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        transition('enter => void', animate('100ms linear', style({ opacity: 0 })))
    ]),
    fadeInPicker: trigger('fadeInPicker', [
        state('enter', style({ opacity: 1 })),
        state('void', style({ opacity: 0 })),
        transition('void => enter', animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsT0FBTyxFQUNILE9BQU8sRUFBRSxZQUFZLEVBRXJCLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNWLE1BQU0scUJBQXFCLENBQUM7O0FBRTdCLE1BQU0sS0FBTywyQkFBMkIsR0FHcEM7SUFFQSxlQUFlLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUFFO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUM7UUFDN0QsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUM7WUFDOUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMxRCxPQUFPLENBQUMsd0NBQXdDLENBQUM7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUUsQ0FBQztJQUVGLFlBQVksRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNsQyxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQ3ZGLENBQUM7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zXG4gKi9cbmltcG9ydCB7XG4gICAgYW5pbWF0ZSwgYW5pbWF0ZUNoaWxkLFxuICAgIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgICBncm91cCxcbiAgICBxdWVyeSxcbiAgICBzdGF0ZSxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnM6IHtcbiAgICByZWFkb25seSB0cmFuc2Zvcm1QaWNrZXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbiAgICByZWFkb25seSBmYWRlSW5QaWNrZXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG5cbiAgICB0cmFuc2Zvcm1QaWNrZXI6IHRyaWdnZXIoJ3RyYW5zZm9ybVBpY2tlcicsIFtcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMSwgMCknfSkpLFxuICAgICAgICBzdGF0ZSgnZW50ZXInLCBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSwgMSknfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGVudGVyJywgZ3JvdXAoW1xuICAgICAgICAgICAgcXVlcnkoJ0BmYWRlSW5QaWNrZXInLCBhbmltYXRlQ2hpbGQoKSwgeyBvcHRpb25hbDogdHJ1ZSB9KSxcbiAgICAgICAgICAgIGFuaW1hdGUoJzQwMG1zIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpJylcbiAgICAgICAgXSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCdlbnRlciA9PiB2b2lkJywgYW5pbWF0ZSgnMTAwbXMgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDB9KSkpXG4gICAgXSksXG5cbiAgICBmYWRlSW5QaWNrZXI6IHRyaWdnZXIoJ2ZhZGVJblBpY2tlcicsIFtcbiAgICAgICAgc3RhdGUoJ2VudGVyJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe29wYWNpdHk6IDB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gZW50ZXInLCBhbmltYXRlKCc0MDBtcyAxMDBtcyBjdWJpYy1iZXppZXIoMC41NSwgMCwgMC41NSwgMC4yKScpKSxcbiAgICBdKVxufTtcbiJdfQ==