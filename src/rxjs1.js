import $ from "jquery";
import Rx from "rxjs/Rx";
import { printf, print } from "./utils";

console.log("RxJS Boiler Running...");

//UNSUBSCRIBE - Forces an observable to complete. memory leaks, ongoing, etc.
//OBSERVABLE FROM SCRATCH REQUIRES NEW KEYWORD

/*
//OBSERVABLES FROM EVENTS
    const btn = $('#btn');
    const input = $('#input');
    const output = $('#output');
    const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

    //1 return data from stream
    //2 errors
    //3 on complete
    btnStream$.subscribe(
        function(e){
            console.log(e.target.innerHTML);
        }, function(err){
            console.log('error');
        }, function(err){
            console.log('completed');
        }
    );

    const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
    inputStream$.subscribe(
        function(e){
            console.log(e.currentTarget.value);
            output.append(e.target.value);
        }, function(err){
            console.log('error');
        }, function(err){
            console.log('completed');
        }
    );

    const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');
    moveStream$.subscribe(
        function(e){
            output.html('<h1>X: ' + e.clientX + ' Y: ' + e.clientY + '</h1>');
        }, function(err){
            console.log('error');
        }, function(err){
            console.log('completed');
        }
    );
//OBSERVABLES FROM EVENTS

//OBSERVABLES FROM ARRAYS
    //create an observable sequence from these numbers
    const numbers = [33, 88, 44, 55, 99];
    const numbers$ = Rx.Observable.from(numbers);

    numbers$.subscribe(
        v => { console.log(v); },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

    //we can use sets/maps - not just arrays

    //ARRAY
    const posts = [
        {title: 'post1', body: 'this is the body'},
        {title: 'post2', body: 'this is the body'},
        {title: 'post3', body: 'this is the body'}
    ];

    const posts$ = Rx.Observable.from(posts);

    posts$.subscribe(
        post => { 
            console.log(post);
            $('#posts').append('<li><h3>'+ post.title + '</h3><p>' + post.body + '</p></li>');
        },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

    //SET
    const set = new Set(['Hello', 5, {title: 'this is a title'}]);
    const set$ = Rx.Observable.from(set);

    set$.subscribe(
        v => { 
            console.log(v);
        },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

    //MAP
    const map = new Map([[1,2], [3,4]]);
    const map$ = Rx.Observable.from(map);

    map$.subscribe(
        v => { 
            console.log(v);
        },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

//OBSERVABLES FROM ARRAYS

//OBSERVABLES FROM SCRATCH
    const source$ = new Rx.Observable(observer => {
        console.log('creating observable');
        observer.next('hello world');

        observer.error(new Error('some error'));

        setTimeout(() => {
            observer.next('yet another value.');
            observer.complete();
        }, 30000);
    });

    source$
    .catch(err => Rx.Observable.of(err))
    .subscribe(x => {
        console.log(x);
    }, err => {
        console.log(err);
    }, complete => {
        console.log('complete')
    });
//OBSERVABLES FROM SCRATCH

//OBSERVABLES FROM A PROMISE
    //Promise represents the result of an async operation

    const myPromise = new Promise((resolve, reject) => {
        console.log('creating promise');
        setTimeout(() => {
            resolve('hello from promise');
        }, 3000);
    });

    // myPromise.then(x => {
    //     console.log(x);
    // });
    
    // const sourceProimse$ = Rx.Observable.fromPromise(myPromise);

    // sourceProimse$.subscribe(x => {
    //     console.log(x);
    // });

    function getGitHubUser(userName){
        return $.ajax({
            url: 'https://api.github.com/users/' + userName,
            dataType: 'jsonp'
        }).promise();
    }

    // const inputSource$ = Rx.Observable.fromEvent($('#uName'), 'blur');

    // inputSource$.subscribe(e => {
    //     Rx.Observable.fromPromise(getGitHubUser(e.target.value))
    //     .subscribe(x => { 
    //         console.log(x);
    //     });
    // });

    // Rx.Observable.fromPromise(getGitHubUser('scubadiver214'))
    //     .subscribe(x => { 
    //         console.log(x);
    //     });
//OBSERVABLES FROM A PROMISE

//INTERVAL, TIMER & RANGE
    //Interval returns observable sequence, that returns a value after each period - good for testing and learning
    // const sourceInterval$ = Rx.Observable.interval(100)
    //       .take(5);

    //     sourceInterval$.subscribe(x => {
    //         console.log(x);
    //     }, err => { 
    //         console.log(err);
    //     }, complete => {
    //         console.log('complete');
    //     });

    //Timer
    // const sourceTimer$ = Rx.Observable.timer(5000, 1000)
    //     .take(5);

    //     sourceTimer$.subscribe(x => {
    //         console.log(x);
    //     }, err => { 
    //         console.log(err);
    //     }, complete => {
    //         console.log('complete');
    //     });

    //Range
    const sourceRange$ = Rx.Observable.range(25, 100);

        sourceRange$.subscribe(x => {
            //console.log(x);
        }, err => { 
            console.log(err);
        }, complete => {
            console.log('complete');
        });
//INTERVAL, TIMER & RANGE

//MAP AND PLUCK
    //map - applies a function to each item that is emitted by the source observable. 
    //returns an observable that emits the results of the function

    const sourceMap$ = Rx.Observable.interval(1000)
        .take(10)
        .map(v => v * 2);

    //sourceMap$.subscribe(v => console.log(v));

    const sourceMap2$ = Rx.Observable.from(['tom', 'saul', 'paul'])
        .map(x => x.toLocaleUpperCase())
        .map(v => 'I am ' + v);

    sourceMap2$.subscribe(v => console.log(v));

    Rx.Observable.fromPromise(getGitHubUser('scubadiver214'))
        .map(user => user.data.name)
        .subscribe(x => { 
            console.log(x);
        });

    //pluck - 
    const users = [
        {name: 'will', age: 34},
        {name: 'bob', age: 38},
        {name: 'jim', age: 48}
    ];

    const users$ = Rx.Observable.from(users)
        .pluck('name');

    users$.subscribe(x => console.log(x));
//MAP AND PLUCK

//MERGE AND CONCAT
    //Concat - runs right after another. 
    //Merge - runs together
    //.of turns anything you pass into an observable
    // Rx.Observable.of('Hello')
    //     .merge(Rx.Observable.of('everyone'))
    //     .subscribe(x => console.log(x));

    // Rx.Observable.interval(2000)
    //     .merge(Rx.Observable.interval(500))
    //     .take(25)
    //     .subscribe(x => console.log(x));

    // const source1$ = Rx.Observable.interval(2000).map(v => 'merge: ' + v);
    // const source2$ = Rx.Observable.interval(500).map(v => 'merge2: ' + v);

    // Rx.Observable.merge(source1$, source2$)
    //     .take(25)
    //     .subscribe(x => console.log(x));

    const source1$ = Rx.Observable.range(0, 5).map(v => 'merge: ' + v);
    const source2$ = Rx.Observable.range(6, 5).map(v => 'merge2: ' + v);

    Rx.Observable.concat(source1$, source2$)
        .take(25)
        .subscribe(x => console.log(x));
//MERGE AND CONCAT

//MERGEMAP & SWITCHMAP - avoid nest subscribes
    //example - what you don't want to do
    // Rx.Observable.of('Hello ')
    //     .subscribe(v => {
    //         Rx.Observable.of(v + 'everyone')
    //             .subscribe(x => console.log(x));
    //     });

    //use mergemap
    Rx.Observable.of('Hello ')
        .mergeMap(v => {
            return Rx.Observable.of(v + 'Everyone');
        })
        .subscribe(x => console.log(x));

    //SWITCHMAP
    const inputSource2$ = Rx.Observable.fromEvent($('#uName'), 'blur')
        .map(e => e.target.value)
        .switchMap(v => {
            return Rx.Observable.fromPromise(getGitHubUser(v))
        });

    inputSource2$.subscribe(x => console.log(x.data.name));
//MERGEMAP & SWITCHMAP 
*/

//COLD OBSERVABLE
const cold$ = Rx.Observable.create(observable => {
  observable.next(Math.random());
});

cold$.subscribe(a => console.log(`observable a: ${a}`));
cold$.subscribe(b => console.log(`observable b: ${b}`));
//COLD OBSERVABLE

//HOT OBSERVABLE
const x = Math.random();

const cold$ = Rx.Observable.create(observable => {
  observable.next(x);
});

cold$.subscribe(a => console.log(`observable a: ${a}`));
cold$.subscribe(b => console.log(`observable b: ${b}`));

// or

const cold$ = Rx.Observable.create(observable => {
  observable.next(Math.random());
});

const hot$ = cold$.publish(); // only emit data once you call corresponding connect() method

hot$.subscribe(a => console.log(`observable a: ${a}`));
hot$.subscribe(b => console.log(`observable b: ${b}`));

hot$.connect();
//HOT OBSERVABLE

import $ from "jquery";
import Rx from "rxjs/Rx";
import { of } from "rxjs/observable/of";
import { concatMap, delay, mergeMap } from "rxjs/operators";
import { printf, print, getGitHubUser, testPostData, clear, FakeWebSocket } from "./utils";

printf("RxJS Samples Running...");

//UNSUBSCRIBE - Forces an observable to complete. memory leaks, ongoing, etc.
//.of turns anything you pass into an observable - any data can be a stream.

const { Observable, Subject } = Rx;
const btn = $("#btn");
const input = $("#input");
const output = $("#output");
const btnClear = $("#btnClear");

Observable.fromEvent(btnClear, "click").subscribe(() => {
  clear();
});

// OBSERVABLES FROM EVENTS
// 1 return data from stream
// 2 errors
// 3 on complete

// const btnStream$ = Observable.fromEvent(btn, "click");
// btnStream$.subscribe(
//   e => {
//     printf(e.target.innerHTML);
//   },
//   err => {
//     printf("error");
//   },
//   err => {
//     printf("completed");
//   }
// );

// const inputStream$ = Observable.fromEvent(input, "keyup");
// inputStream$.subscribe(
//   e => {
//     print(e.currentTarget.value);
//   },
//   err => {
//     printf("error");
//   },
//   err => {
//     printf("completed");
//   }
// );

// const moveStream$ = Observable.fromEvent(input, "mousemove");
// moveStream$.subscribe(
//   e => {
//     output.html("<h1>X: " + e.clientX + " Y: " + e.clientY + "</h1>");
//   },
//   err => {
//     printf("error");
//   },
//   err => {
//     printf("completed");
//   }
// );

//OBSERVABLES FROM ARRAYS
//create an observable sequence from these numbers

// const posts = [
//   { title: "post1", body: "this is the 1 body" },
//   { title: "post2", body: "this is the 2 body" },
//   { title: "post3", body: "this is the 3 body" }
// ];

// const posts$ = Observable.from(posts);

// posts$.subscribe(
//   post =>
//     $("#posts").append(
//       "<li><h3>" + post.title + "</h3><p>" + post.body + "</p></li>"
//     ),
//   err => printf(err),
//   complete => printf("complete")
// );

//we can use sets/maps - not just arrays

//SET
// const mashup$ = Observable.of(
//   "string",
//   2,
//   false,
//   [1, 4, 5],
//   new Set([1, 2], [4, 5])
// );
// mashup$.subscribe(x => console.dir(x));

// OBSERVABLES FROM SCRATCH - don't normally do this but we can. RETRY can be used in error conditions
// const source$ = Observable.create(observer => {
//   observer.next("hello world");

//   // observer.error(new Error("some error"));

//   setTimeout(() => {
//     observer.next("yet another value.");
//   }, 2000);
//   setTimeout(() => {
//     observer.complete();
//   }, 4000);
// });

// // // To make observables to start emitting values, you call subscribe

// source$.subscribe(
//   x => {
//     printf(x);
//   },
//   err => {
//     printf(err);
//   },
//   complete => {
//     printf("complete");
//   }
// );

// OBSERVABLES FROM A PROMISE
// useful when working with javascript promise libraries.
// can convert to promise (from observable) and from promise (to observable)

// const myPromise = new Promise((resolve, reject) => {
//   printf("creating promise");
//   setTimeout(() => {
//     resolve("hello from promise");
//   }, 3000);
// });

// // myPromise.then(result => {
// //   printf(result);
// // });

// const mypromise$ = Observable.fromPromise(myPromise);

// mypromise$.subscribe(result => {
//   printf(result);
// });

// const inputSource$ = Observable.fromEvent($("#uName"), "blur");

// inputSource$.subscribe(e => {
//   Observable.fromPromise(getGitHubUser(e.target.value)).subscribe(x =>
//     printf(JSON.stringify(x.data, undefined, 2))
//   );
// });

// Observable.fromPromise(getGitHubUser("scubadiver214")).subscribe(x =>
//   printf(JSON.stringify(x.data, undefined, 2))
// );

//INTERVAL, TIMER & RANGE
// Interval returns observable sequence, that returns a value after each period - good for testing and learning

// const sourceInterval$ = Observable.interval(1000).take(5);

// sourceInterval$.subscribe(
//   x => printf(x, "interval"),
//   err => printf(err),
//   complete => printf("complete")
// );

//Timer - start after 3 seconds and emit every 1 second
// const sourceTimer$ = Observable.timer(1000, 1000).take(5);

// sourceTimer$.subscribe(
//   x => printf(x, "timer"),
//   err => printf(err),
//   complete => printf("complete")
// );

//MERGE - runs together
// Observable.of("Hello")
//   .merge(Observable.of("everyone"))
//   .subscribe(x => console.log(x));

// HOT / COLD Observables

// HOT is when your observable closes over the producer
// Notice we've moved the creation of the WebSocket - *outside* of the observable.

// const socket = new FakeWebSocket("ws://someurl");

// const source$ = new Observable(observer => {
//   socket.addEventListener("message", e => observer.next(e));
// });
// const myObservable$ = source$.subscribe(e => console.log("hot", e));

// setTimeout(() => {
//   myObservable$.unsubscribe();
// }, 4000);

// COLD is when your observable creates the producer | creates the underlying data inside of it but only when there's a subscriber
// anything that subscribes to `source` above, will get its own WebSocket instance, and when it unsubscribes, it will `close()` that socket.
// This means that our source is really only ever unicast, because the producer can only send to one observer
const coldObservable$ = new Observable(observer => {
  const socket = new FakeWebSocket("ws://someurl");
  socket.addEventListener("message", e => observer.next(e));
  return () => socket.close();
});
// const myObservable$ = coldObservable$.subscribe(e => console.log("cold", e));

// setTimeout(() => {
//   myObservable$.unsubscribe();
// }, 4000);

// make a COLD observable HOT
// since we're pumping all of the values through a Subject, which
// mutlicasts to all subscribers, we've made our source "hot".
// function makeHot(cold) {
//   const subject = new Subject();
//   cold.subscribe(subject);
//   return new Observable(observer => subject.subscribe(observer));
// }
// const hot = makeHot(coldObservable$);

// hot.subscribe(e => console.log("cold to hot", e));

// SUBJECT - broadcast new values to subscribers without having to rely on source data changing.
// const sub$ = new Subject();
// const subA = sub$.subscribe(val => console.log("subA: ", val));
// const subB = sub$.subscribe(val => console.log("subB: ", val));

// sub$.next("hello");

// setTimeout(() => {
//   sub$.next("world");
// }, 1000);

// CORRECT way to make observables HOT
// const hot = coldObservable$.share();
// let cold2Hot = hot.subscribe(e => console.log("cold to hot (proper)", e));

// setTimeout(() => {
//   cold2Hot.unsubscribe();
// }, 4000);

// the operator `share()` makes a hot, refCounted observable that can be retried on failure, or repeated on success.
// Because subjects cannot be reused once they’ve errored, completed or otherwise unsubscribed,
// the `share()` operator will recycle dead subjects to enable resubscription to the resulting observable.

// MERGEMAP & SWITCHMAP - avoid nest subscribes (pyramid of doom)
// example - what you don't want to do

// Observable.of("Hello ").subscribe(v =>
//   Observable.of(v + "everyone").subscribe(x => printf(x))
// );

// //MERGEMAP
// Observable.of("Hello ")
//   .mergeMap(v => {
//     return Observable.of(v + "Everyone");
//   })
//   .subscribe(x => printf(x));

//SWITCHMAP
//useful for when you need a value from one observable before you can subscribe to a second observable
//On each emission the previous inner observable is cancelled and the new observable is subscribed.

// const inputSource2$ = Observable.fromEvent($("#uName"), "blur")
//   .map(e => e.target.value)
//   .switchMap(v => {
//     return Observable.fromPromise(getGitHubUser(v));
//   });

// inputSource2$.subscribe(x => printf("full name", x.data.name));

// MERGE MAP vs CONCAT MAP
// const source$ = of(2000, 1000);
// const example = source$.pipe(
//   concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
// );

// // // concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
// const subscribe = example.subscribe(val =>
//   console.log(`With concatMap: ${val}`)
// );

// // // showing the difference between concatMap and mergeMap
// const mergeMapExample = source$
//   .pipe(
//     delay(5000),
//     mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
//   )
//   .subscribe(val => console.log(`With mergeMap: ${val}`));

// DO operator - allows us to execute code without affecting the underlying observable.
// MAP - applies a function to each item that is emitted by the source observable.
// returns an observable that emits the results of the function

// const observe$ = Observable.of("paul", "steve");

// observe$
//   .do(name => console.log(name))
//   .map(name => name.toUpperCase())
//   .do(name => console.log(name))
//   .subscribe();

// const jsonString = '{"type": "dog", "name": "barney"}';
// const apiCall$ = Observable.of(jsonString);

// apiCall$
//   .map(json => JSON.parse(json))
//   .subscribe(x => {
//     console.log(x.type);
//     console.log(x.name);
//   });

// PAIRWISE
// Tracking the scroll delta
// Let me know when the Observable emits, but also give me the previous value.
// Triggers on the second and subsequent triggerings of the input Observable.
// testPostData();
// Observable.fromEvent(document, "scroll")
//   .map(e => window.pageYOffset)
//   .pairwise()
//   .subscribe(pair => console.log(pair));

// DEBOUNCE - delay and captures last event
// THROTTLE - which allows events to go through after a certain period of time
// useful in case a user is typing into an autocomplete form

// let mouseEvents$ = Observable.fromEvent(document, "mousemove");

// mouseEvents$
//   .debounceTime(1000)
//   .throttleTime(1000)
//   .subscribe(x => console.log(x));

// AUDITTIME
// Just like debounceTime , auditTime will wait for 300ms and then continues.
// But it will always continue after 300ms and not reset its timer.
// This means the user will get suggestions while typing.

// Observable.fromEvent(input, "keyup")
//   .auditTime(300)
//   .pluck("target", "value")
//   .map(value => myAwesomeSearch(value))
//   .map(cities => cities.map(city => `<li>${city}</li>`).join(""))
//   .subscribe(html => (suggestions.innerHTML = html));

// SCAN - this is similar to reduce in lodash
// let clickScan$ = Observable.fromEvent(document, "click");

// clickScan$
//   .map(e => parseInt(Math.random() * 10))
//   .do(score => console.log("click scored ", score))
//   .scan((highscore, score) => highscore + score)
//   .subscribe(highscore => console.log("high score " + highscore));

//TAKE UNTIL - this is how you unsubscribe from an observable without actually calling it.
//FINALLY is triggered once the observable has been completed. THIS IS HOW YOU KNOW YOU.
//UNSUBSCRIBE in a timeout will force a complete - e.g. kill an interval after a setTimeout is called.

// const timer$ = Observable.timer(2000);
// const interval$ = Observable.interval(500);

// interval$
//   .takeUntil(timer$)
//   .finally(() => printf("complete"))
//   .subscribe(i => console.log(i));

//TAKE WHILE
// const names$ = Observable.of("bob", "sue", "jill", "Boris");

// names$
//   .takeWhile(name => name !== "jill")
//   .finally(() => console.log("complete"))
//   .subscribe(name => console.log(name));

// FORK JOIN - like q.allSettled - wait until both observables to "complete" and combine last 2 values
// allows us to take a list of Observables and execute them in parallel.
// Once every Observable in the list emits a value, the forkJoin will emit a single Observable
// value containing a list of all the resolved values from the Observables in the list.

const names1$ = Observable.of("bill", "steve", "rich");
const names2$ = Observable.of("sally", "jane", "billy").delay(2000);

const join$ = Observable.forkJoin(names1$, names2$);
join$.subscribe(x => console.log(x));
