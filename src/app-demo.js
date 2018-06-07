import $ from 'jquery';
import Rx from 'rxjs/Rx';
import { printf, print, getGitHubUser } from './utils';

printf('RxJS Samples Running...');

//UNSUBSCRIBE - Forces an observable to complete. memory leaks, ongoing, etc.
//.of turns anything you pass into an observable - any data can be a stream.

const btn = $('#btn');
const input = $('#input');
const output = $('#output');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

//OBSERVABLES FROM EVENTS
//1 return data from stream
//2 errors
//3 on complete

// btnStream$.subscribe(
//     function(e){
//         printf(e.target.innerHTML);
//     }, function(err){
//         printf('error');
//     }, function(err){
//         printf('completed');
//     }
// );

// const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
// inputStream$.subscribe(
//     function(e){
//         print(e.currentTarget.value);
//     }, function(err){
//         printf('error');
//     }, function(err){
//         printf('completed');
//     }
// );


// const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');
// moveStream$.subscribe(
//     function(e){
//         output.html('<h1>X: ' + e.clientX + ' Y: ' + e.clientY + '</h1>');
//     }, function(err){
//         printf('error');
//     }, function(err){
//         printf('completed');
//     }
// );

//OBSERVABLES FROM ARRAYS
//create an observable sequence from these numbers

// const numbers = [33, 88, 44, 55, 99];
// const numbers$ = Rx.Observable.from(numbers);

// numbers$.subscribe(
//     v => printf(v),
//     err => printf(err),
//     complete => printf('complete')
// );

// const posts = [
//     {title: 'post1', body: 'this is the 1 body'},
//     {title: 'post2', body: 'this is the 2 body'},
//     {title: 'post3', body: 'this is the 3 body'}
// ];

// const posts$ = Rx.Observable.from(posts);

// posts$.subscribe(
//     post => $('#posts').append('<li><h3>'+ post.title + '</h3><p>' + post.body + '</p></li>'),
//     err => printf(err),
//     complete => printf('complete')
// );

// //we can use sets/maps - not just arrays

// //SET
// const set = new Set(['Hello', 5, {title: 'this is a title'}]);
// const set$ = Rx.Observable.from(set);

// set$.subscribe(
//     v => printf(v),
//     err => printf(err),
//     complete => printf('complete')
// );

// const mashup$ = Rx.Observable.of('string', 2, false, [1,4,5], new Set([1,2], [4,5]));
// mashup$.subscribe(x => printf(x));

// //MAP
// const map = new Map([[1,2], [3,4]]);
// const map$ = Rx.Observable.from(map);

// map$.subscribe(
//     v => printf(v),
//     err => printf(err),
//     complete => printf('complete')
// );

//OBSERVABLES FROM SCRATCH - don't normally do this but we can. RETRY can be used in error conditions
// const source$ = Rx.Observable.create(observer => {
//     printf('creating observable from scratch');
//     observer.next('hello world');

//     //observer.error(new Error('some error'));

//     observer.next('hello world 2');

//     setTimeout(() => {
//         observer.next('yet another value.');
//         observer.complete();
//     }, 5000);
// });

// //To make observables to start emitting values, you call subscribe

// source$
// .catch(err => Rx.Observable.of(err))
// .subscribe(x => {
//     printf(x);
// }, err => {
//     printf(err);
// }, complete => {
//     printf('complete')
// });

//OBSERVABLES FROM A PROMISE
//useful when working with javascript promise libraries.
//can convert to promise (from observable) and from promise (to observable)

// const myPromise = new Promise((resolve, reject) => {
//     printf('creating promise');
//     setTimeout(() => {
//         resolve('hello from promise');
//     }, 3000);
// });

// // myPromise.then(result => {
// //     printf(result);
// // });

// const mypromise$ = Rx.Observable.fromPromise(myPromise);

// mypromise$.subscribe(result => {
//     printf(result);
// });

// const inputSource$ = Rx.Observable.fromEvent($('#uName'), 'blur');

// inputSource$.subscribe(e => {
//     Rx.Observable.fromPromise(getGitHubUser(e.target.value))
//     .subscribe(x => printf(x.data))
// });

// Rx.Observable.fromPromise(getGitHubUser('scubadiver214'))
//     .subscribe(x => printf(x.data));

//INTERVAL, TIMER & RANGE
//Interval returns observable sequence, that returns a value after each period - good for testing and learning
// const sourceInterval$ = Rx.Observable.interval(100)
//       .take(5);

// sourceInterval$.subscribe(
//     x => printf(x, 'interval'),
//     err => printf(err), 
//     complete => printf('complete')
// );

// //Timer - start after 3 seconds and emit every 1 second
// const sourceTimer$ = Rx.Observable.timer(3000, 1000)
//     .take(5);

// sourceTimer$.subscribe(
//     x => printf(x, 'timer'), 
//     err => printf(err),
//     complete => printf('complete')
// );

// //Range
// const sourceRange$ = Rx.Observable.range(25, 50);

// sourceRange$.subscribe(
//     x => printf('range', x),
//     err => printf(err),
//     complete => printf('complete')
// );

//MERGE - runs together    
// Rx.Observable.of('Hello')
//     .merge(Rx.Observable.of('everyone'))
//     .subscribe(x => printf(x));

// Rx.Observable.interval(2000)
//     .merge(Rx.Observable.interval(500))
//     .take(25)
//     .subscribe(x => printf(x));

//HOT AND COLD
//COLD is when your observable creates the producer | creates the underlying data inside of it but only when there's a subscriber
// const cold$ = Rx.Observable.create(observable => 
//     observable.next(Math.random())
// );

// cold$.subscribe(a => printf('observable a', a));
// cold$.subscribe(b => printf('observable b', b));

// HOT is when your observable closes over the producer
// const coldForHot$ = Rx.Observable.create(observable =>
//     observable.next(Math.random())
// );

// const hot$ = coldForHot$.publish(); // only emit data once you call corresponding connect() method

// hot$.subscribe(a => printf('observable a', a));
// hot$.subscribe(b => printf('observable b', b));

// hot$.connect();

//MERGEMAP & SWITCHMAP - avoid nest subscribes (pyramid of doom)

//example - what you don't want to do
// Rx.Observable.of('Hello ')
//     .subscribe(v => 
//         Rx.Observable.of(v + 'everyone')
//             .subscribe(x => printf(x))
//     );

// //MERGEMAP
// Rx.Observable.of('Hello ')
//     .mergeMap(v => {
//         return Rx.Observable.of(v + 'Everyone');
//     })
//     .subscribe(x => printf(x));

//SWITCHMAP
//useful for when you need a value from one observable before you can subscribe to a second observable 
//On each emission the previous inner observable is cancelled and the new observable is subscribed.

// const inputSource2$ = Rx.Observable.fromEvent($('#uName'), 'blur')
//     .map(e => e.target.value)
//     .switchMap(v => {
//         return Rx.Observable.fromPromise(getGitHubUser(v))
//     });

//  inputSource2$.subscribe(x => printf('full name', x.data.name));

//DO operator - allows us to execute code without affecting the underlying observable.
//MAP - applies a function to each item that is emitted by the source observable. 
//returns an observable that emits the results of the function

// const observe$ = Rx.Observable.of('paul', 'steve');

// observe$
//     .do(name => printf(name))
//     .map(name => name.toUpperCase())
//     .do(name => printf(name))
//     .subscribe();

// const jsonString = '{"type": "dog", "name": "barney"}';
// const apiCall$ = Rx.Observable.of(jsonString);

// apiCall$
//     .map(json => JSON.parse(json))
//     .subscribe(x => {
//         printf(x.type);
//         printf(x.name);
//     });

//DEBOUNCE - delay and captures last event & THROTTLE
//useful in case a user is typing into an autocomplete form

// let mouseEvents$ = Rx.Observable.fromEvent(document, 'mousemove');

// mouseEvents$
//     .debounceTime(1000) 
//     .throttleTime(1000)
//     .subscribe(x => printf(x));

//SCAN - this is similar to reduce in lodash
// let clickScan$ = Rx.Observable.fromEvent(document, 'click');

// clickScan$
//     .map(e => parseInt(Math.random() * 10))
//     .do(score => printf('click scored ', score))
//     .scan((highscore, score) => highscore + score)
//     .subscribe(highscore => printf('high score ' + highscore));

//TAKE UNTIL - this is how you unsubscribe from an observable without actually calling it.
//FINALLY is triggered once the observable has been completed. THIS IS HOW YOU KNOW YOU.
//UNSUBSCRIBE in a timeout will force a complete - e.g. kill an interval after a setTimeout is called.

// const timer$ = Rx.Observable.timer(2000);
// const interval$ = Rx.Observable.interval(500);

// interval$
//     .takeUntil(timer$)
//     .finally(() => printf('complete'))
//     .subscribe(i => printf(i));

//TAKE WHILE
// const names$ = Rx.Observable.of('bob', 'sue', 'jill', 'skip');

// names$
//     .takeWhile(name => name !== 'jill')
//     .finally(() => printf('complete'))
//     .subscribe(name => printf(name))

//FORK JOIN - like q.allSettled - wait until both observables to "complete" and combine last 2 values
// const names1$ = Rx.Observable.of('bill', 'steve', 'rich');
// const names2$ = Rx.Observable.of('sally', 'jane', 'billy').delay(2000);

// const join$ = Rx.Observable.forkJoin(names1$, names2$);
// join$.subscribe(x => printf(x));

//SUBJECT - broadcast new values to subscribers without having to rely on source data changing.
// const sub$ = new Rx.Subject();
// const subA = sub$.subscribe(val => printf('subA: ', val))
// const subB = sub$.subscribe(val => printf('subB: ', val))

// sub$.next('hello');

// setTimeout(() => {
//     sub$.next('world');
// }, 1000);